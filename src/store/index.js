import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Eatery_2.0_Updates",
        blogCoverPhoto: "stock-1",
        blogDate: "May 20, 2022",
      },
      {
        blogTitle: "DeaconEmojis_2.0_Updates",
        blogCoverPhoto: "stock-2",
        blogDate: "May 21, 2022",
      },
      {
        blogTitle: "WFU AppDev Information Session",
        blogCoverPhoto: "stock-3",
        blogDate: "May 22, 2022",
      },
      {
        blogTitle: "WFU AppDev Intro",
        blogCoverPhoto: "stock-4",
        blogDate: "May 25, 2022",
      },
    ],
    blogPost:[],
    blogPostByTag:[],
    postLoaded: null,
    blogTags:[],
    allBlogTags: [],   // All recored blogTags names
    blogHTML: "Write your updates here...",
    blogTitle: "",
    blogPhotoName: "", // BlogCoverPhotoName
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,    // Boolean: whether the editPost button is displayed or not

    user: null,        // Boolean: whether the user logged in or not
    profileAdmin: null,// Boolean: whether the user is Admin
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPost.filter((post) => post.blogID === "AyWWBio64p23tdnP55as" || post.blogID === "IyjjcBUaRTr8MsUKMKeD" || post.blogID === "OVduB2FBysWNmDuAH5Gc");
    },
    blogPostsCards(state) {
      return state.blogPost.slice(0, 4);
    },
    allBlogPosts(state) {
      return state.blogPost;
    },
    allBlogPostsByTag(state) {
      return state.blogPostByTag;
    }
  },
  mutations: {
    // Update blog tags
    updateBlogTags(state, payload) {
      state.blogTags = payload;
      console.log("Happy");
      console.log(state.blogTags);
    },
    // Add blog tags
    addBlogTags(state, payload) {
      // BlogTags array does not exist or is empty
      if (state.blogTags === undefined || state.blogTags.length == 0) {
        state.blogTags.push(payload);
      }
      else if (!state.blogTags.includes(payload)) {
        state.blogTags.push(payload);
      }
    },
    // Delete blog tags
    deleteBlogTags(state, payload) {
      const index = state.blogTags.indexOf(payload);
      if (index > -1) {
        state.blogTags.splice(index, 1);
      }
      console.log(state.blogTags);
    },
    // Create new blog post, invoke by changing blogHTML
    newBlogPost(state, payload) {
      state.blogHTML = payload;
      // console.log(state.blogHTML);
    },
    // Change BlogTitle
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    // Update the photoName of user's uploaded photo
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    // Update the photoURL of user's uploaded photo
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    // Updates Page 'Toggle Edit Post' button
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    // Set blogPostByTag
    setBlogPostByTag(state, payload) {
      state.blogPostByTag = payload;
    },
    // For updating frontend after deletion
    filterBlogPost(state, payload) {
        state.blogPost = state.blogPost.filter((post) => 
        post.blogID !== payload
      );
    },
    // For setting status of blogPost after edit post
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
      state.blogTags = payload.blogTags;
    },
    // Open & close the photo preview during 'create post'
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    // Update the state of user login
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileLastName = doc.data().lastName;
      state.profileFirstName = doc.data().firstName;
      state.profileUsername = doc.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials = 
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log("Admin Status: ", state.profileAdmin);
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    changeBlogListByTag(state, payload) {
      state.blogPostTag = payload;
    }
  },
  actions: {
    async getCurrentuser({ commit }, user ) {
      // Set curUser info after log-in
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults); // Commit to specific mutation with certain payload
      commit("setProfileInitials");
      console.log("From Firestore: " + this.state.profileEmail + " + " + this.state.profileInitials);
      // Obtain the admin status info of curUser
      const token = await user.getIdTokenResult();
      var admin = false;
      if (token.claims.email === 'xiy20@wfu.edu' || token.claims.email === 'michael_yukunxi@163.com') { admin = true; }
      // const admin = await token.claims.admin; // Boolean
      commit('setProfileAdmin', admin);
    },

    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUsername,
      });
      commit("setProfileInitials"); // Reset user's Initials based on new First and Last name
    },

    // Get blogs with certain tag
    async getBlogsByTag({ state }, tag ) {
      // This returns an array of doc that doc.id = blogIds based on Tag
      const blogIdsByTag = await db.collection(`blogTags/${tag}/Blogs`).get(); 
      // Get corresponding blogPost document
      const blogDocs = await Promise.all(
        blogIdsByTag.docs.map(doc => db.doc(`blogPosts/${doc.id}`).get())
      );
      
      // Make sure the tmp blogList by Tag is initially empty
      if (!state.blogPostByTag.length == 0) {
        state.blogPostByTag = [];
      }
      blogDocs.forEach(doc => {
        // Object: new post
        const data = {
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogTags: doc.data().tagNames,
        };
        state.blogPostByTag.push(data);
      });
      console.log("Blogs with " + tag + " include 👇")
      console.log(state.blogPostByTag);
    },

    // Populate the posts from Firebase database to Firestore
    async getPost({ state }) {
      // Get all blogs
      const dataBase = await db.collection("blogPosts").orderBy('date', 'desc');
      const dbResults = await dataBase.get(); // This returns an array
      dbResults.forEach(doc => {
        // newly added doc does not already exist in blogPost array
        if (!state.blogPost.some(post => post.blogID === doc.id)) {
          // Object: new post
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            blogTags: doc.data().tagNames,
          };
          state.blogPost.push(data);
        }
      });
      // Get all tags
      const dataBaseTag = await db.collection("blogTags");
      const dbTagResults = await dataBaseTag.get(); 
      dbTagResults.forEach(doc => {
        // newly added doc does not already exist in tags array
        if (this.state.allBlogTags.length === 0 || !this.state.allBlogTags.includes(doc.id)) {
          this.state.allBlogTags.push(doc.id);
        }
      });
      console.log(this.state.allBlogTags);
      state.postLoaded = true;
    },

    // Delete Post Action
    async deletePost({ commit }, payload) {
      // Delete the blog document from the backend db
      const blogID = payload;
      const getPost = await db.collection("blogPosts").doc(blogID);
      // const blogDocTagCollectionRef = await db.collection("blogPosts").doc(blogID).collection('Tag');
      const batch = db.batch();

      // ❗️Todo: Delete the tag collection within Blog doc()
      // blogDocTagCollectionRef.get().then(function(querySnapshot) {
      //   querySnapshot.forEach(function(doc) {
      //     doc.ref.delete();
      //   });
      // });

      // ❗️Todo: Delete the blogID in corresponding tag collections

      batch.delete(getPost, {});
      await batch.commit();

      // Commit the delete change to frontend
      commit("filterBlogPost", payload);
    },

    // Updating Post
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
  },
  modules: {
  }
})
