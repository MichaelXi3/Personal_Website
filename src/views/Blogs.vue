<template>
    <div class="blog-card-wrap">
        <div class="title">
            <h1>Bloggie</h1>
        </div>
        <div class="container">
            <div class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>

            <div class="Tags">
                <button @click="showAllBlogs"> All </button>
                <button @click="filterPosts(tag)" v-for="tag in getAllTags" :key="tag"> {{tag}} </button>
            </div>

            <div class="blog-cards">
                <BlogCard :class="{ invisible: !allBlogs }" :post="post" :key="index1" v-for="(post, index1) in allBlogPosts" />
            </div>
            <div class="blog-cards">
                <BlogCard :class="{ invisible: allBlogs }" :post="post" :key="index" v-for="(post, index) in blogPostByTag" />
            </div>
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard";

export default {
    name: 'blogs',
    components: { BlogCard },
    data() {
        return {
            allBlogs: null,
            // curBlogPosts: [],
        };
    },
    computed: {
        // Get all blogPosts
        allBlogPosts() {
            return this.$store.getters.allBlogPosts;
        },
        // Get and set blogPostByTag
        blogPostByTag: {
            get() {
                return this.$store.getters.allBlogPostsByTag;
            },
            set(payload) {
                this.$store.commit("setBlogPostByTag", payload)
            }
        },
        // Get data from Vuex store
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards;
        },
        // Set mutations to Vuex store 
        editPost: {
            get() {
                return this.$store.state.editPost
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload);
            }
        },
        // Get all available Tags
        getAllTags() {
            return this.$store.state.allBlogTags;
        }
    },
    // After leave the page "Updates", we don't want the edit icons to be showed
    methods: {
        async filterPosts(tag) {
            console.log("Filtering: " + tag);
            this.allBlogs = false;
            // Get blogs by Tag
            this.$store.dispatch("getBlogsByTag", tag);
        },
        showAllBlogs() {
            this.allBlogs = true;
        },
    },
    mounted() {
        this.allBlogs = true;
    },
    beforeDestroy() {
        this.$store.commit("toggleEditPost", false);
    }
};
</script>

<style lang="scss" scoped>
// Tags Region
.Tags {
    margin: 5% 10%;
    @media (min-width: 500px) {
        margin: 4% 5%;
    }
    @media (min-width: 900px) {
        margin: 2% 2.5%;
    }
}

// Button of Tags
button {
    font-weight: 500;
    font-size: small;
    max-height: fit-content;
    max-width: fit-content;
    background-color:#303030;
    margin-top: 8px;
    margin-right: 1%;

    @media (min-width: 500px) {
        font-weight: 500;
        font-size: medium;
        max-height: 40px;
        max-width: fit-content;
        background-color:#303030;
        margin-top: 10px;
        margin-right: 1%;
    }

    &:hover {
        background-color: #525252;
    }
}

// Conditional Styling
.invisible {
    // opacity: 0 !important;
    display: none !important;
}

// Toggle edit
.toggle-edit {
    display: flex;
    align-items: center;
    position: right;
    top: -70px;
    justify-content: right;
    margin-right: 10%;
    right: 0;
    
    @media (min-width: 500px) {
        display: flex;
        align-items: center;
        position: right;
        top: -70px;
        justify-content: right;
        margin-right: 3%;
        right: 0;
    }
}
span {
    margin-right: 16px;
    color:#0E0B16;
    font-weight: bold;
}

input[type="checkbox"] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

input[type="checkbox"]:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #303030;
    transform: scale(1.1);
    transition: 750ms ease all;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

input:checked[type="checkbox"]:before {
    background: #fff;
    left: 52px;
}

// Blog cards
.blog-card-wrap {
    background-color: #E7DFDD;
    padding-top: 50px;
}

.title {
    color: #0E0B16;
    margin-bottom: 30px;
    margin-top: 0;
}

.blog-cards {
    position: relative;
}
</style>