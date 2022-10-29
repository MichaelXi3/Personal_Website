<template>
  <div class="create-post">
      <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>
      <Loading v-show="loading"/>
      <div class="container">
          <div :class="{ invisible: !error }" class="err-message">
              <p><span>Error:</span>{{ this.errorMsg }}</p>
          </div>
          <div class="blog-info">
              <input type="text" placeholder="Enter title here" v-model="blogTitle">
              <div class="upload-file">
                  <label for="blog-photo"> Upload Cover Photo </label>
                  <!-- Once user uploads photo, there will be changes detected, which triggers function -->
                  <!-- 'refs' is a binding b/w user uploaded file and script method, in script portion, we can refer to this file by refs -->
                  <input @change="fileChange" type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" />
                  <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview Photo</button>
                  <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
              </div>
          </div>
          <div class="blogTags">
            <div class="addTags">
                <input type="text" placeholder="Enter a tag name" v-model="tagEnter">
                <button @click="addTag">Add a tag</button>
                <ul class="tags">
                    <div class="tag" v-for="tag in tagNames" :key="tag">{{tag}}</div>
                </ul>
            </div>
            <div class="removeTags">
                <input type="text" placeholder="Tag name to remove" v-model="tagRemove">
                <button @click="deleteTag">Remove a tag</button>
            </div>
          </div>
          <div>
              <!-- <vue-editor :editorOptions="editorSettings" useCustomImageHandler @image-added="imageHandler" v-model="blogHTML" /> -->
              <v-md-editor v-model="text" height="600px"></v-md-editor>
          </div>
          <div class="blog-actions">
              <button @click="uploadBlog">Publish Post</button>
              <!--  <router-link class="router-button" :to="{ name: 'BlogPreview' }">See Preview</router-link> -->
          </div>
      </div>
  </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import firebase from "firebase/app";
// Firebase Storage stores files such as images, videos, and audio as well as other user-generated content.
import "firebase/storage";
// Firebase Database is for the storage of text info, we use it to store our newly uploaded posts
import db from "../firebase/firebaseInit";

import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
    name: "CreatePost",
    data() {
        return {
            file: null,
            error: null,
            loading: null,
            errorMsg: null,
            text: '',
            tagEnter: null,
            tagRemove: null,
            currentBlogId: null,
        };
    },
    computed: {
        profileId() {
            return this.$store.state.profileId;
        },
        blogCoverPhotoName() {
            return this.$store.state.blogPhotoName;
        },
        tagNames() {
            return this.$store.state.blogTags;
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit("updateBlogTitle", payload);
            }
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML;
            },
            set(payload) {
                this.$store.commit("newBlogPost", payload);
            }
        },
    },
    methods: {
        // This method add tag to firestore tag array - local
        addTag() {
            if (!this.tagEnter)
                return;
            this.$store.commit("addBlogTags", this.tagEnter);
            this.tagEnter = '';
        },
        // This method delete tag from firestore tag array - local
        deleteTag() {
            if (!this.tagRemove)
                return;
            this.$store.commit("deleteBlogTags", this.tagRemove);
            this.tagRemove = '';
        },
        // This func is invoked after user uploads cover photo, we sync the photo name and url to firestore
        fileChange() {
            this.file = this.$refs.blogPhoto.files[0];
            console.log(this.file);
            const fileName = this.file.name;
            // Sync the picture name and picture url to firestore
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        },
        // Open the photo preview of post cover photo
        openPreview() {
            this.$store.commit("openPhotoPreview");
        },
        // Store the user uploaded photo to firebase storage and return back a downloadURL for the photo preview at vue-editor
        imageHandler(file, Editor, cursorLocation, resetUploader) {
            this.loading = true;
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
            docRef.put(file).on("state_changed", (snapshot) => {
                console.log(snapshot);
            }, (err) => {
                console.log(err);
            }, async () => {
                const downloadURL = await docRef.getDownloadURL();
                // console.log(downloadURL);
                Editor.insertEmbed(cursorLocation, "image", downloadURL);
                this.loading = false;
                resetUploader();
            })
        },
        uploadBlog() {
            // Check post validation
            if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
                // If the coverPhoto file is uploaded or URL is not NULL
                if (this.$store.state.blogPhotoFileURL) {
                    this.loading = true;
                    // Upload post cover photo to Firestore Storage
                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
                    docRef.put(this.file).on("state_changed", (snapshot) => {
                        console.log(snapshot);
                    }, (err) => {
                        console.log(err);
                        this.loading = false;
                    }, async () => {
                        const downloadURL = await docRef.getDownloadURL();
                        const timestamp = await Date.now();
                        const dateBase = await db.collection("blogPosts").doc();
                        // Create new document for new blog
                        await dateBase.set({
                            blogID: dateBase.id,
                            blogHTML: this.text,
                            blogCoverPhoto: downloadURL,
                            blogCoverPhotoName: this.blogCoverPhotoName,
                            blogTitle: this.blogTitle,
                            profileId: this.profileId,
                            tagNames: this.tagNames,
                            date: timestamp,
                        });
        
                        // After press the button of publish, user will be redirected to that viewPost page to see how is't looks like
                        await this.$store.dispatch("getPost");
                        this.currentBlogId = dateBase.id;
                        console.log("Current Blog ID is: " + this.currentBlogId);

                        // Add new Tags to DB - many to many relationship
                        
                        for await (const element of this.tagNames) {
                            // Add tags as a collection that subordinates to the blog doc
                            // Add tags to Tags root collection as well
                            const blogId = this.currentBlogId;
                            const tagId = element; 
                            console.log("blogId: " + blogId + " ; tagID: " + tagId);
                            
                            const blogsRef = db.doc(`blogPosts/${blogId}/Tags/${tagId}`);
                            const tagsRef = db.doc(`blogTags/${tagId}/Blogs/${blogId}`);

                            const batch = db.batch();
                            batch.set(blogsRef, {});
                            batch.set(tagsRef, {});

                            // Set-up field value for blogTags to let it not empty
                            const tagsDoc = db.doc(`blogTags/${tagId}`);
                            batch.set(tagsDoc, { name: tagId});
                            await batch.commit();
                        }
                        
                        this.loading = false;
                        this.$router.push({ name: "ViewBlog", params: {blogid: dateBase.id}});
                    });
                    return;
                } else {
                    this.error = true;
                    this.errorMsg = " Please ensure you uploaded a post cover photo!";
                    setTimeout(() => {
                        this.error = false;
                    }, 5000);
                    return;
                }
            } else {
                this.error = true;
                this.errorMsg = " Please ensure Post Title & Post Content has been filled!";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
                return;
            }
        },
    },
    components: {
        BlogCoverPreview,
        Loading
    },
}
</script>

<style lang="scss">
.create-post {
    position:relative;
    height: 100%;

    button {
        margin-top: 0;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: .5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
        .blogTags {
            margin: 0px 0px 15px 0px;
            .tags {
                display: flex;
                flex-direction: row;
                margin: 0px 0px 6px 0px;

                .tag {
                    margin: 0px 5px;
                }
            }
        }
    }

    // Error Styling
    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: white;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: .5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 300px;
        }

        input {
            transition: .5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;

            input {
                display: none; // Remove the default 'upload' button
            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    .editor {
        max-height: 600px;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        margin-top: 32px;

        button {
            margin-right: 16px;
        }
    }
}
</style>