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
    postLoaded: null,

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
  },
  mutations: {
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
  },
  actions: {
    async getCurrentuser({ commit }, user) {
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

    // Populate the posts from Firebase database to Firestore
    async getPost({ state }) {
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
          };
          state.blogPost.push(data);
        }
      });
      state.postLoaded = true;
    },

    // Delete Post Action
    async deletePost({ commit }, payload) {
      // Delete from the backend db
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      // Commit the delete change to frontend
      commit("filterBlogPost", payload);
    },

    // Updating Post
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    }
  },
  modules: {
  }
})
