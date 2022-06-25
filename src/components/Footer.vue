<template>
  <footer>
      <div class="container">
          <div class="left">
              <div class="col-1">
                <router-link class="header" :to="{ name: 'Home'}">Michael</router-link>
                <ul>
                    <li>
                        <a href="https://www.youtube.com/channel/UCSy_Srhad_U21ju_zCUbILg"><YouTube class="svg-icon"/></a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/michaelxiii3/"><instagram class="svg-icon"/></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/yukun-xi/"><Linkedin class="svg-icon"/></a>
                    </li>
                </ul>
              </div>
              <div class="col-2">
                <ul>
                    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs' }">Blog</router-link>
                    <router-link class="link" :to="{ name: 'Project'}">Project</router-link>
                    <router-link v-if="admin" class="link" :to="{ name: 'CreatePost'}">Create Post</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
                </ul>
              </div>
          </div>
          <div class="right">
              <p>You can’t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.</p>
          </div>
      </div>
  </footer>
</template>

<script>
import YouTube from "../assets/Icons/youtube-brands.svg";
import instagram from "../assets/Icons/instagram-brands.svg";
import Linkedin from "../assets/Icons/linkedin-brands.svg";

export default {
    name: "footer-vue",
    components: {
        YouTube,
        instagram,
        Linkedin,
    },
    computed: {
        user() {
            return this.$store.state.user; // Boolean of user login or not
        },
        admin() {
            return this.$store.state.profileAdmin; // Boolean of whether user is admin
        },
    },
}
</script>

<style lang="scss" scoped>
footer {
    margin-top: auto;
    padding: 100px 25px;
    background-color: #0E0B16;
    z-index: 99;

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;

        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0px;
        }

        > div {
            display: flex;
            flex: 1;
        }

        .left {
            gap: 32px;
            color:#fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 70px;
            @media (min-width: 800px) {
                flex-direction: row;
                align-items: initial;
                gap: 0;
            }
            
            .header {
                font-size: 24px;
                color: #fff;
                text-decoration: none;
                font-weight: 600;
            }

            ul {
                gap: 16px;
                list-style: none;
                display: flex;
            }
            
            .col-1,
            .col-2 {
                gap: 32px;
                display: flex;
                flex: 1;
                @media (min-width: 800px) {
                    gap: 0;
                }
            }

            .col-1 {
                flex-direction: column;
                h2 {
                    text-align: center;
                    @media (min-width: 800px) {
                        text-align: initial;
                    }
                }
                ul {
                    margin-top: auto;
                    li {
                        display: flex;
                        align-items: center;
                        .svg-icon {
                            width: 24px;
                            height: auto;
                            color:#fff;
                        }
                    }
                }
            }

            .col-2 {
                ul {
                    height: 100%;
                    justify-content: center;
                    flex-direction: row;
                    flex-wrap: wrap;
                    @media (min-width: 800px) {
                        flex-direction: column;
                    }
                    .link {
                        font-size: 16px;
                        font-weight: 500;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }  
        }

        .right {
            gap: 32px;
            color: #fff;
            align-items: center;
            flex-direction: column;
            @media (min-width: 800px) {
                align-items: center;
                gap: 0;
            }
        }

        p {
            font-size: large;
            margin-top: auto;
            margin-bottom: auto;
        }
    }
}
</style>