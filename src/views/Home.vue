<template>
  <div class="home">
    <!-- Welcome Display: AppDev Logo -->
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost v-if="user" :post="welcomeScreenLogin" />

    <!-- BlogPosts Display: AppDev Apps Intro -->
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />

    <!-- BlogCards Display: AppDev lastest Updates Show at Here -->
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View our recent updates</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>

    <!-- If currently not user, display this portion to recommend for Registration -->
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Register Now to see our latest updates!</h2>
        <router-link class="router-button" :to="{ name: 'Login' }">
          Register for AppDev Updates <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost';
import BlogCard from '../components/BlogCard';
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Greeting From WFU AppDev! 🎩",
        blogPost: "Think bold and be creative.",
        welcomeScreen: true,
        photo: "DevLogo",
      },
      welcomeScreenLogin: {
        title: "Let's start this journey, together. ",
        blogPost: "",
        welcomeScreen: true,
        photo: "DevLogo",
      },
      sampleBlogPost: [
        {
          title: "WFU Eatery",
          blogHTML: "Your one-stop on-campus dining helper 🥘",
          blogCoverPhoto: "Eatery",
        },
        {
          title: "Deacon Emojis",
          blogHTML: "Lovely Deamon Deacon stickers for chats! ",
          blogCoverPhoto: "DeaconEmojis",
        },
      ],
    };
  },
  computed: {
    // Getter: to get the blogPost info from FireStore
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },

    sampleBlogCards() {
      return this.$store.state.sampleBlogCards
    },
    // Get Boolean from FireStore that indicates whether there is a user logged in
    user() {
      return this.$store.state.user;
    },
    userName() {
      return this.$store.state.profileUsername;
    },
  }
};
</script>

<style lang="scss" scoped>

.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    padding: 100px 25px;
    justify-content: center;
    align-items: center;
    @media (min-width: 800px){
      padding: 125px 25px;
      flex-direction: row;
    }
    
    .router-button {
      display: flex;
      font-size: 30px;
      text-align: center;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>