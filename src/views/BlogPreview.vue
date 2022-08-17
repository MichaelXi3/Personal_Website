<template>
<div class="post-view">
    <div class="container quillWrapper">
        <h2>{{ this.blogTitle }}</h2>
        <!-- <img :src="blogCoverPhoto" alt="" /> -->
        <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
</div>
</template>

<script>
export default {
    name: "PostPreview",
    computed: {
        blogTitle() {
            return this.$store.state.blogTitle;
        },
        blogHTML() {
            return this.$store.state.blogHTML;
        },
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        },
    }
}
</script>

<style lang="scss">
.post-view {
    max-height: 100%;
    background-image: url('https://img.freepik.com/free-vector/stylish-hexagonal-line-pattern-background_1017-19742.jpg?w=2000');

    .container {
        display: flex;
        flex-direction: column;
        margin-left: 24%;
        margin-right: 24%;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .imgCover {
            max-width: 600px;
            max-height: 600px;
            align-items: center;
        }

        h2 {
            font-size: 36px;
            margin-top: 32px;
            margin-left: 32px;
        }

        h4 {
            font-weight: 400;
            font-size: 14px;
            margin-bottom: 12px;
            margin-left: 32px;
            margin-top: 10px;
        }

        .post-content {
            margin: 32px;
        }
    }
}
</style>