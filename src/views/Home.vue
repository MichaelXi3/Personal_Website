<template>
  <div class="home">
    <!-- HomePage Top Display -->
    <div class="main">
      <div class="headText">
        <h1>Welcome to my world.</h1>
        <h2>With Love and Creation 🪐</h2>
      </div>
      <div class="headPic">
        <img src="../assets/headIcon.png" alt="">
      </div>
    </div>

    <!-- HomePage Second Display -->
    <div class="main2">
      <div class="headPic2">
        <img src="../assets/main2.png" alt="">
      </div>
      <div class="headText2">
        <div class="heading2">
          <h3>☁️ My skillsets</h3>
        </div>
        <div class="skills">
          <img src="https://www.svgrepo.com/show/303388/java-4-logo.svg" alt="">
          <img src="https://www.growingsearch.com/blog/wp-content/uploads/2019/02/Javascript-shield.png" alt="">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" alt="">
          <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/HTML5_logo_black.svg/1200px-HTML5_logo_black.svg.png" alt="">
          <img src="https://symbols.getvecta.com/stencil_25/75_sass.57898c574e.png" alt="">
          <img src="https://iconvulture.com/wp-content/uploads/2017/12/linux-logo.png" alt="">
          <img src="https://www.svgrepo.com/show/331509/npm.svg" alt="">
        </div>
      </div>
    </div>

    <!-- BlogCards Display: AppDev lastest Updates Show at Here -->
    <div class="blog-card-wrap">
      <div class="container">
        <h3>✏️ Check out my Blogs</h3>
          <div class="blog-cards">
            <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
          </div>
      </div>
    </div>

    <!-- If currently not user, display this portion to recommend for Registration -->
    <div v-if="!user" class="updates">
      <div class="registerPic">
        <img src="../assets/Register2.png" alt="">
      </div>
      <div class="container1">
        <div class="registerText">
          <h2>Register to follow! ❤️</h2>
          <router-link class="router-button" :to="{ name: 'Login' }"> Register </router-link>
        </div>
      </div>
      <div class="registerPic">
        <img src="../assets/Register.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard';

export default {
  name: "Home",
  components: { BlogCard },
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

.main {
  background-color: #0E0B16;
  display: flex;
  flex-direction: column;

  @media(min-width: 700px) {
      min-height: 875px;
      max-height: 875px;
      flex-direction: row;
  }

  .headText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    order: 0;
    flex: 1;
    padding: 0 70px 0 100px;

    h1 {
      font-size: 82px;
      color: #E7DFDD;
      transition: .5s ease-in all;

      &:hover {
          color: #46e1fc;
      }
    }
    h2 {
      font-size: 31px;
      color: #E7DFDD;
      padding-top: 16px;
      transition: .5s ease-in all;

      &:hover {
          color: #6e46fc;
      }
    }
  }

  .headPic {
    flex: 1;
    order: 1;
    
    @media(min-width: 700px) {
      flex: 2;
    }
    
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }

}

.main2 {
  background-color: #E7DFDD;
  display: flex;
  flex-direction: column;
  margin-top: 0;

  @media(min-width: 700px) {
      min-height: 550px;
      max-height: 550px;
      flex-direction: row;
  }

  .headText2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    order: 2;
    flex: 2;
    padding: 0 70px 0 100px;

    .heading2 {
      padding-bottom: 20px;
      h3 {
        font-size: 45px;
        color: #0E0B16;
        padding-top: 16px;
        transition: .5s ease-in all;
        &:hover {
            transform: scale(1.01);
        }
      }
    }

    .skills {
      display: grid;
      gap: 30px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 700px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (min-width: 1400px) {
        grid-template-columns: repeat(5, 1fr);
      }
      img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          max-width: 170px;
          max-height: 170px;
      }
    }
  }

  .headPic2 {
    flex: 1;
    order: 1;
    
    @media(min-width: 700px) {
      flex: 1;
    }
    
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }

}

.blog-card-wrap {
  background-color: #DCC7AA;

  h3 {
    font-size: 40px;
    color: #0E0B16;
    margin-bottom: 45px;
    padding-left: 35px;
  }
}

.updates {
  background-color: #0E0B16;
  display: flex;
  flex-direction: column;
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
      font-weight: bolder;
      text-align: center;
      text-decoration: none;
      text-transform: none;
      background-color: #E7DFDD;
      color: #0E0B16;

      &:hover {
        transform: scale(1.01);
      }

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 { 
      max-width: 450px;
      width: 100%;
      text-align: center;

      @media (min-width: 800px) {
        font-size: 40px;
        color: #E7DFDD;
        margin-bottom: 45px;
        padding-left: 35px;
      }
    }
  }

  @media (min-width: 800px){
    flex-direction: row;
  }
  .container1 {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    padding: 100px 25px;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 800px){
      padding: 125px 25px;
      //flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 30px;
      font-weight: bolder;
      text-align: center;
      text-decoration: none;
      text-transform: none;
      margin: 90px 125px 50px;
      background-color: #E7DFDD;
      color: #0E0B16;
      max-width: fit-content;

      &:hover {
        transform: scale(1.03);
      }

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 { 
      max-width: 470px;
      width: 100%;
      text-align: center;
      color: #E7DFDD;
      font-size: 32px;

      @media (min-width: 800px) {
        font-size: 40px;
        color: #E7DFDD;
        margin-bottom: 45px;
        padding-left: 35px;
      }
    }
  }

  .registerPic {
    max-height: 500px;
    max-width: 500px;
    flex: 1;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }
}
</style>