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
    editPost: false,
    user: null, // Boolean: whether we get user logged in or not
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    // Updates Page 'Toggle Edit Post' button
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
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
    async getCurrentuser({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults); // commit to specific mutation with certain payload
      commit("setProfileInitials");
      console.log(dbResults);
      console.log("From Firestore: " + this.state.profileEmail + " + " + this.state.profileInitials);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUsername,
      });
      commit("setProfileInitials"); // Reset user's Initials based on new First and Last name
    }
  },
  modules: {
  }
})
