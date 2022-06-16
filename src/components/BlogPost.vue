<template>
  <div class="blog-wrapper no-user">
      <div class="blog-content">
          <div> 
              <h2 v-if="post.welcomeScreen || post.welcomeScreenLogin">{{ post.title }}</h2>
              <h2 v-else>{{ post.blogTitle }}</h2>

              <p style="font-size: large;" v-if="post.welcomeScreen || post.welcomeScreenLogin">{{ post.blogPost }}</p>
              <p v-else class="content-preview" v-html="post.blogHTML"></p>

              <!-- <router-link v-if="!user" class="link link-light" :to="{ name: 'Login' }"> Login/Register <Arrow class="arrow arrow-light" /></router-link> -->
              
              <h4 v-if="post.welcomeScreen || post.welcomeScreenLogin"></h4>
              <router-link class="link" v-else :to="{ name: 'ViewBlog', params: {blogid: this.post.blogID} }"> View the Post <Arrow class="arrow" /></router-link>
          </div>
      </div>
      <div class="blog-photo">
        <img v-if="post.welcomeScreen || post.welcomeScreenLogin" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
        <img v-else :src="post.blogCoverPhoto" alt="" />
      </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
export default {
    name: "blogPost",
    props: ["post"], // BlogPost is looking for keyword 'post' to call it
    components: {
        Arrow,
    },
    computed: {
    // Get Boolean from FireStore that indicates whether there is a user logged in
    user() {
      return this.$store.state.user;
    },
  }
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    @media(min-width: 700px) {
        min-height: 875px;
        max-height: 875px;
        flex-direction: row;
    }

    .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media(min-width: 700px) {
        order: 1;
    }
    @media(min-width: 800px) {
        flex: 3;
    }

    div {
        max-width: 375px;
        padding: 72px 24px;
        @media(min-width: 700px) {
            padding: 0 24px;
        }  

        h2 {
            font-size: 35px;
            font-weight: 500;
            text-transform: capitalize;
            margin-bottom: 24px;
            @media(min-width: 700px) {
                font-size: 40px;
            }              
        }

        p {
            font-size: 16px;
            font-weight: 300;
            line-height: 1.7;
        }

        .content-preview {
            font-size: 16px;
            max-height: 24px;
            width: 250px; // Need to be revisited
            white-space: nowrap;
            overflow:hidden;
            text-overflow: ellipsis;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: 32px;
            padding-bottom: 4px;
            border-bottom: 1px solid transparent;
            transition: .5s ease-in all;

            &:hover {
                border-bottom-color: #303030;
            }
        }

        .link-light {
            &:hover {
                border-bottom-color: #ffff;
            }            
        }
    }
    }

    .blog-photo {
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        @media(min-width: 700px) {
            order: 2;
        }

        @media(min-width: 800px) {
            flex: 4;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }  

    &:nth-child(even) {
        .blog-content {
            order: 2;
        }
        .blog-photo {
            order: 1;
        }
    }
}

.no-user:first-child {
    .blog-content {
        // background-color: #303030;
        background-image: url("https://wallpapers-hub.art/wallpaper-images/13333.jpg");
        color: #fff;
    }
}
</style>