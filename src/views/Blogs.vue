<template>
    <div class="blog-card-wrap">
        <div class="title">
            <h1>Bloggie</h1>
        </div>
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>
            <BlogCard :post="post" v-for="(post, index) in allBlogPosts" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard";

export default {
    name: 'blogs',
    components: { BlogCard },
    computed: {
        // Get all blogPosts
        allBlogPosts() {
            return this.$store.getters.allBlogPosts;
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
    },
    // After leave the page "Updates", we don't want the edit icons to be showed
    beforeDestroy() {
        this.$store.commit("toggleEditPost", false);
    }
};
</script>

<style lang="scss" scoped>
// Blog cards
.blog-card-wrap {
    background-color: #0E0B16;
    padding-top: 50px;
}

.title {
    margin-bottom: 90px;
    margin-top: 0;
}

.blog-cards {
    position: relative;

    .toggle-edit {
        display: flex;
        align-items: center;
        position: absolute;
        top: -70px;
        right: 0;
        z-index: 99;
    }

    span {
        margin-right: 16px;
        color: #E7DFDD;
        font-weight: bolder;
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
}
</style>