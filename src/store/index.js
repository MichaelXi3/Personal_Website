import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    }
  },
  actions: {
  },
  modules: {
  }
})
