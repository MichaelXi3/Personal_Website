<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="navigation"/>
      <router-view />
      <Footer v-if="navigation"/>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      // Boolean that determines whether we display the navigation bar
      navigation: null, 
    };
  },
  // Similar to 'onLoad'
  created() { 
    // For every change in AuthState, we need to update the 'user' status
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      // If User is logged in, we run "getCurrentUser" method in Firestore
      if(user) {
        console.log("There is a User logged in.");
        this.$store.dispatch("getCurrentuser", user);
      }
    })
    // Check the display status of navigation router
    this.checkRoute();
    // Get all posts from Firebase database
    this.$store.dispatch("getPost");
  },
  mounted() {},
  methods: {
    // Methods that check whether we want the display of navigation bar
    checkRoute() {
      console.log("Checked the necessity of displaying navigation bar.");
      if (this.$route.name === "Login" || 
          this.$route.name === "Register" || 
          this.$route.name === "ForgotPassword"
      ) {
        this.navigation = false;
        return;
      } 
      this.navigation = true;
    },
  },
  watch: {
    // For every change of route, we want to re-check whether we want to display the navigation bar
    $route() {
      this.checkRoute();
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48,48,48,0.7);
  }
}
.button-ghost {
  color:#000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

@media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    padding: 0 35px;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

</style>
