import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import Vue2Editor from "vue2-editor";

// Import Firebase
import firebase from "firebase/app";
import "firebase/auth";

// Import Editor
import VMdEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

import VueMarkdown from 'vue-markdown';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});


// Vue.use(Vue2Editor);
Vue.config.productionTip = false;

let app;
// Solve the async b/w firebase and app
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

Vue.use(VMdEditor);
Vue.use(VMdPreview);
Vue.use(VMdPreviewHtml);
Vue.component('vue-markdown', VueMarkdown);