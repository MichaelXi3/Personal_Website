<template>
    <div class="reset-password">
        <!-- v-on 指的是 listen to property 'close-modal' -->
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
        <Loading v-if="loading" />
        <div class="form-wrap">
            <form class="reset">
                <h2>Reset Password</h2>
                <p> Forgot your password? Enter your email to reset it, or back to
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <email class="icon" />
                    </div>
                </div>
                <button @click.prevent="resetPassword"> Reset </button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Model";
import Loading from "../components/Loading";

import firebase from "firebase/app";
import "firebase/auth";

export default {
    name: "ForgotPassword",
    components: {
        email,
        Modal,
        Loading,
    },
    data() {
        return {
            email: null,
            modalActive: null,
            modalMessage: "",
            loading: null,
        }
    },
    methods: {
        resetPassword() {
            this.loading = true;
            firebase.auth().sendPasswordResetEmail(this.email).then(() => {
                this.modalMessage = "If your account exists, you will receive an email. Please check Spam mailbox as well.";
                this.loading = false;
                this.modalActive = true;
            }).catch(err => {
                this.modalMessage = err.message;
                this.loading = false;
                this.modalActive = true;
            });
        },
        closeModal() {
            this.modalActive = !this.modalActive;
            this.email = "";
        }
    }
};
</script>

<style lang="scss" scoped>
.reset-password {
    position: relative;
    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }
            p {
                text-align: center;
                margin-bottom: 32px;
                margin-top: 16px;
                max-width: 310px;
            }
        }
    }
}

</style>