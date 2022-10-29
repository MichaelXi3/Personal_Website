<template>
<div class="containerAll">
  <div class="title">
    <h1>The Voyage of Discovery</h1>
  </div>
  <div class="containerProj">
      <div class="left" v-show="isDesktop">
          <img src="https://s2.loli.net/2022/06/26/R2Qmo7ZeNVq8HYC.png" alt="" />
          <div class="left2"><img src="https://s2.loli.net/2022/06/26/UF4dhwYDJiA7gZM.png" alt="" /></div>
          <div class="left3"><img src="https://s2.loli.net/2022/06/26/Be5SK3wTVIDR2Wx.png" alt="" /></div>
          <div class="left31"><img src="https://s2.loli.net/2022/06/26/JCeO5hQp6GcDz9r.png" alt="" /></div>
          <div class="left4"><img src="https://s2.loli.net/2022/06/26/GE7RSs93ZglacxF.png" alt="" /></div>
          <div class="left5"><img src="https://s2.loli.net/2022/06/26/YaZ7luWgBUN13pK.png" alt="" /></div>
          <div class="left6"><img src="https://s2.loli.net/2022/06/26/5gl7VfYieLXDBPO.png" alt="" /></div>
      </div>
      <div class="demo">
        <div class="demo-theme dark">
          <timeline timeline-theme="white" timeline-bg="#3a3939">
            <timeline-title font-color="#fff" icon-size="large"><h2>2022</h2></timeline-title>

            <timeline-item bg-color="#9dd8e0" font-color="#E7DFDD" icon-size="medium"><h3>June</h3></timeline-item>
            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>🍜 WFU Eatery released Version 2.0</h3>
              <h4>Eatery 2.0 released two major new features: a thumb up and down rating system for hundreds of food items & comment feature for every eateries!</h4>
              <h4>👉 View our <a href="https://wakeappdev.com/view-post/McvqkrTf2ZLcT2rnpVWo">Article</a> about Eatery!</h4>
              <h4>📝 Open-source Github Repo: <a href="https://github.com/RichardZhang0316/WFU-Eatery">Link</a></h4>
              <div class="Eatery">
                <img src="https://s2.loli.net/2022/06/26/lB1foy3JES7Xzpe.png" alt="">
              </div>
            </timeline-item>

            <timeline-item bg-color="#9dd8e0" font-color="#E7DFDD" icon-size="medium"><h3>May</h3></timeline-item>
            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>📟 WFU AppDev Official Website</h3>
              <h4>AppDev's official website is a place where we write blogs and make updates to our products. We welcome everybody to register an account and get our updates!</h4>
              <h4>👉 View our <a href="https://wakeappdev.com/">SITE</a>!</h4>
              <h4>🕹 Domain Name: <a href="https://wakeappdev.com/">wakeappdev.com</a></h4>
              <h4>📝 Open-source Github Repo: <a href="https://github.com/MichaelXi3/AppDev_Website">Link</a></h4>
              <div class="Eatery">
                <img src="https://s2.loli.net/2022/06/26/v3j4oM6qhtI28xp.png" alt="">
              </div>
            </timeline-item>

            <timeline-item bg-color="#9dd8e0" font-color="#E7DFDD" icon-size="medium"><h3>March</h3></timeline-item>
            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>🤩 Deacon Emojis now Available on App Store</h3>
              <h4>Deacon Emojis is a school pride emojis app that provides 40+ emojis of WFU mascot, Deacon Deacons, for the users. Users could share and use these stickers on iMessage, instagram, WeChat, and more. </h4>
              <h4>👉 View the <a href="https://wakeappdev.com/view-post/OVduB2FBysWNmDuAH5Gc">Blog</a> of Deacon Emojis!</h4>
              <h4>📝 Open-source Github Repo: <a href="https://github.com/WakeAppDev/WakeStickersApp">Link</a></h4>
              <div class="Eatery">
                <img src="https://s2.loli.net/2022/06/26/sgbW5RDcJXltaY7.png" alt="">
              </div>
            </timeline-item>

            <timeline-item bg-color="#9dd8e0" font-color="#E7DFDD" icon-size="medium"><h3>January</h3></timeline-item>
            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>🦠 WFU Covid released Version 2.0</h3>
              <h4>WFU Covid monitors the covid information on campus, which helps the parents of international students to stay up to date.</h4>
              <h4>👉 View the <a href="https://wakeappdev.com/view-post/soPFghzRNluppzZkm2lj">Blog</a> of WFU Covid!</h4>
              <h4>📝 Open-source Github Repo: <a href="https://github.com/MichaelXi3/WFU-Covid">Link</a></h4>
              <div class="Eatery">
                <img src="https://s2.loli.net/2022/06/26/iBqHzeWZv9aosG5.png" alt="">
              </div>
            </timeline-item>

            <timeline-title font-color="#fff" icon-size="large"><h2>2021</h2></timeline-title>

            <timeline-item bg-color="#9dd8e0" font-color="#E7DFDD" icon-size="medium"><h3>November</h3></timeline-item>
            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>🍜 WFU Eatery released Version 1.0</h3>
              <h4>Eatery helps to increase the dining experience of international students on campus.</h4>
              <h4>👉 View the <a href="https://wakeappdev.com/view-post/IyjjcBUaRTr8MsUKMKeD">Blog</a> of Eatery!</h4>
              <h4>📝 Open-source Github Repo: <a href="https://github.com/RichardZhang0316/WFU-Eatery">Link</a></h4>
              <div class="Eatery">
                <img src="https://s2.loli.net/2022/06/26/4sroLpWE6SxO2R7.jpg" alt="">
              </div>
            </timeline-item>

            <timeline-item bg-color="#9dd8e0" font-color="#E7DFDD" icon-size="medium"><h3>September</h3></timeline-item>
            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>Co-founded WFU AppDev</h3>
              <h4>A club aims to build meaningful apps that benefits our community.</h4>
              <h4>👉 Check out our <a href="https://wakeappdev.com/team">Team</a> !</h4>
              <div class="logo">
                <img src="https://s2.loli.net/2022/06/26/qitolhY3nmgMTw8.png" alt="">
              </div>
            </timeline-item>

            <timeline-item bg-color="#f2d7e1" font-color="#E7DFDD" icon-size="medium">
              <h3>My first CS class: CSC111</h3>
              <h4>Starting my CS journey from "<b @click="run">System.out.println("Hello World!");</b>".</h4>
            </timeline-item>
          </timeline>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
import Timeline from "../components/timeline.vue";
import TimelineItem from "../components/timelineItem.vue";
import TimelineTitle from "../components/timelineTitle.vue";

export default {
  name: 'Project',
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data() {
    return {
      Msg: null,
      isDesktop: null
    }
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    run() {
      this.Msg = "Hello World! ❤️";
      alert(this.Msg);
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      // Mobile device
      if (this.windowWidth <= 750) {
          this.isDesktop = false;
          return;
      }
      // PC device
      this.isDesktop = true;
      return;
    }
  }
}
</script>

<style lang="scss">

.timeline-item {
  b {
    color:#00d0fe;
    cursor: pointer;
    transition: 0.3s color ease-in-out;

    &:hover {
        color: #fe8700;
    }
  }

  h3 {
    padding-bottom: 6px;
  }

  h4 {
    padding-top: 4px;
  }

  img {
    max-width: 1000px;
    max-height: 1000px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    // padding: 10px 15px 10px 15px;    
  }

  .logo {
    img {
      max-width: 400px;
      max-height: 400px;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .Eatery {
    img {
      max-width: 750px;
      max-height: 450px;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 16px 0 0 0;
    }
  }
}

.containerAll {
  display: flex;
  flex-direction: column;
  background-color: #0E0B16;
  padding-top: 70px;
}

.title {
  color: #E7DFDD;
  margin-bottom: 100px;
  margin-top: 0;
  h1 {
    font-size: 50px;
    text-align: center;
  }
}

.containerProj {
    background-color: #0E0B16;
    display: flex;
    flex-direction: column;

    @media(min-width: 700px) {
      flex-direction: row;
    }
}

.left{
    display: flex;
    flex-direction: column;
    flex: 1;
    
    img {
        max-width: 700px;
        max-height: 700px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 20px 25px 20px 70px;
        transition: .5s ease-in-out all;

        &:hover {
            transform: scale(1.03);
        }
    }

    .left2 {
      img {
        max-width: 700px;
        max-height: 700px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 0px 25px 115px 70px;
        transition: .5s ease all;

        &:hover {
            transform: rotateZ(1deg) scale(1.03);
        }
      }
    }

    .left3 {
      img {
        max-width: 700px;
        max-height: 700px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 40px 25px 20px 70px;
        transition: .5s ease-in-out all;

        &:hover {
            transform: scale(1.03);
        }
      }
    }

    .left31 {
      img {
        max-width: 700px;
        max-height: 700px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 20px 25px 20px 70px;
        transition: .5s ease all;

        &:hover {
            transform: rotateZ(-1deg) scale(1.03);
        }
      }
    }

    .left4 {
      img {
        max-width: 700px;
        max-height: 700px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 40px 25px 70px 80px;
        transition: .5s ease-in-out all;

        &:hover {
            transform: scale(1.03);
        }
      }
    }

    .left5 {
      img {
        max-width: 750px;
        max-height: 750px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 130px 25px 10px 80px;
        transition: .5s ease all;

        &:hover {
            transform: rotateZ(1deg) scale(1.03);
        }
      }
    }

    .left6 {
      img {
        max-width: 830px;
        max-height: 800px;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 20px 25px 20px 70px;
        transition: .5s ease-in-out all;

        &:hover {
            transform: scale(1.03);
        }
      }
    }
}

.append {
    font-size: .8em;
    margin-top: 3px;
    color: #646C7C;
}

a {
    color: #97e0f1;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s color ease;

    &:hover {
        color: #00d0fe;
    }
}

.icon-heart {
    width: 15px;
}

.demo {
    // display: grid;
    // grid-template-columns: repeat(1, 100%);
    display: flex;
    flex: 1;
    grid-gap: 1rem; 
}

.demo-theme.dark {
    background: #0E0B16;
}

</style>