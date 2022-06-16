<template>
    <div class="admin">
        <div class="container">
            <h2>Administration</h2>
            <div class="admin-info">
                <h2>Add Admin</h2>
                <div class="input">
                    <input placeholder="Enter user email to make them an admin" type="text" id="addAdmins" v-model="adminEmail" />
                </div>
                <span>{{ this.functionMsg }}</span>
                <button @click="addAdmin" class="button"> Submit </button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/functions";

export default {
    name: "Admin",
    data() {
        return {
            adminEmail: "",
            functionMsg: null,
        }
    },
    methods: {
        async addAdmin() {
            // Connect to firebase cloud functions
            const addAdmin = await firebase.functions().httpsCallable('addAdminRole');
            // Pass parameters to firebase cloud functions
            const result = await addAdmin({ email: this.adminEmail });
            // Set functionMsg to display at span, HTML
            this.functionMsg = result.data.message;
        }
    }
};
</script>

<style lang="scss" scoped>
    .admin {
        .container {
            max-width: 1000px;
            padding: 60px 25px;

            h2 {
                text-align: center;
                margin-bottom: 16px;
                font-size: 32px;
                font-weight: 300;
            }

            .admin-info {
                display: flex;
                flex-direction: column;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                padding: 32px;
                background-color: #f1f1f1;
                max-width: 600px;
                margin: 32px auto;

                span {
                    font-size: 14px;
                }

                .input {
                    margin: 16px 0;

                    label {
                        font-size: 14px;
                        display: block;
                        padding-bottom: 6px;
                    }

                    input {
                        width: 100%;
                        border: none;
                        height: 50px;
                        padding: 8px;
                        background-color: #f2f7f6;
                        @media (min-width: 900px) {}

                        &:focus {
                            outline: none;
                        }
                    }
                }

                button {
                    align-self: center;
                }
            }
        }
    }
</style>