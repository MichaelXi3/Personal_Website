<template>
    <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
            <h2>{{ this.currentBlog[0].blogTitle }}</h2>
            <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString('en-us', {dataStyle:"long"})}}</h4>
            <!-- <img class="imgCover" :src="this.currentBlog[0].blogCoverPhoto" alt="" /> -->
            <ul class="tags">
                <div class="tagHead">Blog Tags: </div>
                <div class="tag" v-for="tag in tagNames" :key="tag">{{tag}} </div>
            </ul>

            <v-md-editor class="post-content ql-editor" v-model="this.content" mode="preview"></v-md-editor>
            <!-- <div class="post-content ql-editor" v-html="markdownToHtml"></div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewBlog",
    data() {
        return {
            currentBlog: null,
            content: null,
            tagNames: null,
        }
    },
    computed: {
        markdownToHtml() {
            return this.content;
        }
    },
    // Vue calls the mounted() hook when your component is added to the DOM. 
    // It is most often used to send an HTTP request to fetch data that the component will then render.
    async mounted() {
        // When directing to specific post page, we get a blogID passed from $route.params
        // With this blogID, we can pull out corresponding post object from Firestore blogPost object array
        this.currentBlog = await this.$store.state.blogPost.filter((post) => {
            return post.blogID === this.$route.params.blogid;
        });

        this.content = this.currentBlog[0].blogHTML;
        this.tagNames = this.currentBlog[0].blogTags;
        console.log(this.tagNames);
    },
};
</script>

<style lang="scss">
.post-view {
    min-height: 570px;
    max-height: 100%;
    background-image: url('https://img.freepik.com/free-vector/stylish-hexagonal-line-pattern-background_1017-19742.jpg?w=2000');

    .container {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        margin: 0 3%;

        @media (min-width: 1200px) {
            margin: 0 10%;
        }

        .tags {
            display: flex;
            flex-direction: row;
            font-weight: 400;
            font-size: 16px;
            margin-bottom: 12px;
            margin-left: 15%;
            margin-right: 15%;

            .tagHead{
                margin-right: 5px;
            }

            .tag {
                margin-right: 5px;
            }
        }

        .imgCover {
            max-width: 600px;
            max-height: 600px;
            // align-items: center;
            margin-left: 15%;
            margin-right: 15%;
        }

        h2 {
            font-size: 36px;
            margin-top: 32px;
            margin-left: 15%;
            margin-right: 15%;
        }

        h4 {
            font-weight: 400;
            font-size: 16px;
            margin-bottom: 12px;
            margin-left: 15%;
            margin-right: 15%;
            margin-top: 10px;
        }

        .post-content {
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
            min-width: max-content;
            padding: 0 6%;

            @media (min-width: 1200px) {
                padding: 0 13%;
            }
        }
    }
}
</style>