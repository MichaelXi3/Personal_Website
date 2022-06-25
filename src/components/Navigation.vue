<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home'}">Michael</router-link> 
            </div>
            <div class="nav-links">
                <!-- top bar links only display on PC devices (wider screen)-->
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Home'}">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs'}">Blog</router-link>
                    <router-link class="link" :to="{ name: 'Project'}">Project</router-link>
                    <!-- If current user is Admin, show 'Create Post' link -->
                    <router-link v-if="admin" class="link" :to="{ name: 'CreatePost'}">Create Post</router-link>
                    <!-- If there is no user currently login, show the link of 'Login/Register' -->
                    <router-link v-if="!user" class="link" :to="{ name: 'Login'}">Login/Register</router-link>
                </ul>
                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{ this.$store.state.profileInitials }}</span>
                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">{{ this.$store.state.profileInitials }}</p>
                            <div class="right">
                                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                                <p>{{ this.$store.state.profileUsername }}</p>
                                <p>{{ this.$store.state.profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{ name: 'Profile' }">
                                    <userIcon class="icon"/>
                                    <p>Profile</p>
                                </router-link>
                            </div>
                            <div v-if="admin" class="option">
                                <router-link class="option" :to="{ name: 'Admin' }">
                                    <adminIcon class="icon"/>
                                    <p>Admin</p>
                                </router-link>
                            </div>
                            <div @click="signOut" class="option">
                                    <signOutIcon class="icon"/>
                                    <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- menu-icon only displayed on mobile devices (shorter screen)-->
        <menu-icon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
        <transition name="mobile-nav">
                <ul class="mobile-nav" v-show="mobileNav">
                    <router-link class="link" :to="{ name: 'Home'}">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs'}">Blog</router-link>
                    <router-link class="link" :to="{ name: 'Project'}">Project</router-link>
                    <router-link v-if="admin" class="link" :to="{ name: 'CreatePost'}">Create Post</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login'}">Login/Register</router-link>
                </ul>
        </transition>
    </header>
</template>


<script>
import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
import adminIcon from '../assets/Icons/user-crown-light.svg';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';

import firebase from "firebase/app";
import "firebase/auth";

export default {
    name: 'navigation',
    components: {
        menuIcon,
        userIcon,
        adminIcon,
        signOutIcon,
    },

    data() {
        return {
            mobile: null, // Boolean: whether the device is mobile or not
            mobileNav: null, // Boolean: Whether we display the left navigation bar
            windowWidth: null,
            profileMenu: null, // Boolean: Whether we display the profile menu
        };
    },
    // 生命周期函数,页面初始化函数
    created() {
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
    },

    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;
            // Mobile device, left navigation bar disabled
            if (this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            // PC device, left navigation bar initial value set as false
            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        // Change the status of left nav bar
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },

        toggleProfileMenu(e) {
            // ProfileMenu is only toggled when click on the profile icon instead of the span list
            // Implemented through the HTML ref attribute
            if (e.target === this.$refs.profile) {
                this.profileMenu = !this.profileMenu;                
            }
        },

        signOut() {
            firebase.auth().signOut();
            window.location.reload(); // Reload the window after sign-out
        },
    },

    computed: {
        user() {
            return this.$store.state.user; // Boolean of whether user login or not
        },
        admin() {
            return this.$store.state.profileAdmin; // Boolean of whether user is admin
        },
    }
};
</script>


<style lang="scss" scoped>
header {
    background-color: #0E0B16;
    padding: 0 25px;
    // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;
        color: #E7DFDD;

        &:hover {
            color: #ffffff;
        }
    }

    nav {
        display: flex;
        padding: 25px 0;
        .branding {
            display: flex;
            align-items: center;
            
            .header {
                font-weight: 600;
                font-size: 24px;
                color: #E7DFDD;
                text-decoration: none;
            }
        }
        .nav-links {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul {
                margin-right: 32px;
                .link {
                    margin-right: 32px;
                }
                .link:last-child {
                     margin-right: 0px;
                }
            }

            .profile {
                position:relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #0E0B16;
                background-color: #E7DFDD;

                span {
                    pointer-events: none;
                }

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #0E0B16;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    .info {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid #0E0B16;

                        .initials {
                            position: initial;
                            width: 40px;
                            height: 40px;
                            background-color: #E7DFDD;
                            color: #0E0B16;
;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }

                        .right {
                            flex: 1;
                            margin-left: 24px;
                            color: #E7DFDD;
                            p:nth-child(1) {
                                font-size: 14px;
                            }
                            p:nth-child(2),
                            p:nth-child(3) {
                                font-size: 12px;
                            }  
                        }
                    }

                    .options {
                        padding: 15px;
                        .option {
                            text-decoration: none;
                            color: #E7DFDD;
;
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;

                            .icon {
                                width: 18px;
                                height: auto;
                            }

                            p {
                                font-size: 14px;
                                margin-left: 12px;
                            }
                        }
                        .option:last-child {
                            margin-bottom: 0px;
                        }
                    }
                }
            }
        }
    }

    .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }

    .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: #0E0B16;
        top: 0;
        left: 0;
        .link {
            padding-top: 15px;
            color: #E7DFDD;

            &:hover {
            color: #ffffff;
        }
        }
    }
}
</style>