<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost v-if="user" :post="welcomeScreenLogin" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View our recent updates</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Register Now to see our latest updates!</h2>
        <router-link class="router-button" to="#">
          Register for WFU_AppDev Updates <Arrow class="arrow arrow-light" />
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
        title: "Hello From WFU AppDev! 🎩",
        blogPost: "Seeking the interaction between technology and humanity.",
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
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards
    },
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