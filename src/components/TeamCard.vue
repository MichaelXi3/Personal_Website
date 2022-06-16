<template>
    <div class="team-card">
        <img :src="member.Photo" alt="">
        <div class="info">
            <h3>{{member.Name}}</h3>
            <p>{{member.Desc}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TeamCard",
    props: ["member"],
    components: {
    },
    computed: {
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped>
.team-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 400px;
    max-height: 400px;
    max-width: 300px;
    min-width: 300px;
    transition: .5s ease all;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 6px -1px #d6b160, 0 2px 4px -1px #d6b160;
    }
}


img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 270px;
    object-fit: cover;
}

.info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000

    h4 {
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 300;
    }

    h6 {
        font-weight: 400;
        font-size: 12px;
        padding-bottom: 16px;
    }

    .link {
        display: inline-flex;
        align-items: center;
        margin-top: auto;
        font-weight: 500;
        padding-top: 20px;
        font-size: 12px;
        padding-bottom: 4px;
        transition: .5s ease-in all;

        &:hover {
            color: rgba(48, 48, 48, 0.8)
        }

        .arrow {
            width: 10px;
        }
    }
}
</style>