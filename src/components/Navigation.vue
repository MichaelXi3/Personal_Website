<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home'}">AppDev</router-link> 
            </div>
            <div class="nav-links">
                <!-- top bar links only display on PC devices (wider screen)-->
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Home'}">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs'}">Updates</router-link>
                    <router-link class="link" to="#">Create Post</router-link>
                    <router-link class="link" :to="{ name: 'Login'}">Login/Register</router-link>
                </ul>
            </div>
        </nav>
        <!-- menu-icon only displayed on mobile devices (shorter screen)-->
        <menu-icon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
        <transition name="mobile-nav">
                <ul class="mobile-nav" v-show="mobileNav">
                    <router-link class="link" :to="{ name: 'Home'}">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs'}">Updates</router-link>
                    <router-link class="link" to="#">Create Post</router-link>
                    <router-link class="link" :to="{ name: 'Login'}">Login/Register</router-link>
                </ul>
        </transition>
    </header>
</template>


<script>
import menuIcon from '../assets/Icons/bars-regular.svg';

export default {
    name: 'navigation',
    components: {
        menuIcon
    },

    data() {
        return {
            mobile: null, // Boolean: whether the device is mobile or not
            mobileNav: null, // Boolean: Whether we display the left navigation bar
            windowWidth: null,
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
        }
    }
};
</script>


<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

        &:hover {
            color: #1eb8b8;
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
                color: #000;
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
        background-color: #303030;
        top: 0;
        left: 0;
        .link {
            padding-top: 15px;
            color: #fff;
            &:hover {
            color: #1eb8b8;
        }
        }
    }
}
</style>