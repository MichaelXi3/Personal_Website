<template>
<div class="teamContainer">
    <div class="blog-card-wrap">
        <div class="head">
            <h1>AppDev Team</h1>
        </div>
        <div class="blog-cards container">
            <TeamCard :member="member" v-for="(member, index) in teamMembers" :key="index" />
        </div>
    </div>
</div>
</template>

<script>
import TeamCard from "../components/TeamCard";

export default {
    name: 'Team',
    components: { TeamCard },
    data() {
        return {
            teamMembers: [
                {
                Name: "Richard Zhang",
                Desc: "zhangk20@wfu.edu",
                Photo: "https://s2.loli.net/2022/06/16/7aPO91TNxpD3B56.png",
                },
                {
                Name: "Michael Xi",
                Desc: "xiy20@wfu.edu",
                Photo: "https://s2.loli.net/2022/06/16/Lf5j6m4aIbwZhTu.png",
                },
                {
                Name: "Jiachen Liu",
                Desc: "",
                Photo: "https://s2.loli.net/2022/06/16/mwizMhjlP3N1TZb.png",
                },
                {
                Name: "Jessica Chen",
                Desc: "",
                Photo: "https://s2.loli.net/2022/06/17/7gFBYTesOqrUL6M.jpg",
                },
                {
                Name: "Eric Gai",
                Desc: "",
                Photo: "https://s2.loli.net/2022/06/16/jNJcdUfm12ptwC6.png",
                },
            ],   
        }
    },
    computed: {
    },
};
</script>

<style lang="scss" scoped>
.teamContainer {
    background-image: url("https://img.freepik.com/free-vector/white-background-with-zigzag-pattern-design_1017-33197.jpg?w=2000");
    @media (min-width: 1300px) {
        padding: 0px 170px 0px;
    }
    .blog-card-wrap {
        padding: 60px 32px 100px;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        .head {
            text-align: center;
            margin: 0px 0px 60px;
        }

        .blog-cards {
            position: relative;
            @media (min-width: 1200px) {
                grid-template-columns: repeat(3, 1fr);
            }
            @media (min-width: 1600px) {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
}

</style>