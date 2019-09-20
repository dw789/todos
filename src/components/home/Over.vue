<template>
  <div class="over">
    <div class="top">
      <router-link tag="div" class="back iconfont" to="/">&#xe646;</router-link>
      <div class="iconfont all-icon"></div>已完成事项
      <div class="iconfont top-icon" @click="topiconClick">&#xe60f;</div>
    </div>
    <div class="empty"></div>
    <ul>
      <li v-for="(item,index) in list" :key="index" class="info">
        <div class="iconfont info-icon" @click="iconClick(index)" :style="iconStyle[index]">&#xe627;</div>
        <div class="item">已完成：{{item}}</div>
      </li>
    </ul>
    <div class="bottom">
      <div class="reduce" @click="reduceClick">
        <span class="iconfont plus-icon">&#xe64a;</span>
        <span class="word">删除</span>
      </div>
    </div>
    <div class="empty2"></div>
  </div>
</template>
<script>
export default {
  name: "HomeOver",
  data() {
    return {
      list: [],
      iconStyle: [], //圆圈样式
      thinglist: [], //存放事项的下标
      overlist: []
    };
  },
  methods: {
    topiconClick() {
      this.iconStyle.forEach(it => {
        it.display = it.display == "none" ? "block" : "none";
      });
    }, //编辑
    reduceClick() {
      this.iconStyle.forEach((it, index) => {
        if (it.color == "#1AFA29") {
          this.thinglist.push(index);
        }
      });
      let length = this.list.length;
      let i = 0;
      this.thinglist.forEach(it => {
        if (this.list.length < length) {
          i++;
          this.list.splice(it - i, 1);
          this.iconStyle.splice(it - i, 1);
        } else {
          this.list.splice(it, 1);
          this.iconStyle.splice(it, 1);
        }
      });
      this.thinglist = [];
      this.iconStyle.forEach(it => {
        it.display = "none";
      });
      window.localStorage.setItem("overlist", this.list);
      window.localStorage.setItem(
        "overiconStyle",
        JSON.stringify(this.iconStyle)
      );
      this.$store.commit("overnumber", this.list.length);
    }, //删除
    iconClick(index) {
      this.iconStyle[index].color =
        this.iconStyle[index].color == "#8a8a8a" ? "#1AFA29" : "#8a8a8a";
    }
  }, //选中事项
  mounted() {
    if (!localStorage.overiconStyle) {
      this.iconStyle = [];
    } else {
      this.iconStyle = JSON.parse(localStorage.overiconStyle);
    }
    if (!localStorage.overlist) {
      this.list = [];
    } else {
      this.list = localStorage.overlist.split(",");
      if (this.iconStyle !== []) {
        this.list.forEach(() => {
          this.iconStyle.push({ color: "#8a8a8a", display: "none" });
        });
        window.localStorage.setItem(
          "overiconStyle",
          JSON.stringify(this.iconStyle)
        );
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  background-color: rgb(242, 242, 242);
  font-size: 0.42rem;
  color: #666;

  .back {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.6rem;
    line-height: 0.92rem;
    width: 0.7rem;
  }

  .top-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.46rem;
  }

  .all-icon {
    position: absolute;
    left: 0.1rem;
    top: 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.4rem;

    div {
      display: inline-block;
      font-size: 0.4rem;
    }
  }
}

.empty {
  height: 0.9rem;
}

.empty2 {
  height: 1rem;
}

.info {
  display: flex;
  width: 95%;
  height: 0.6rem;
  line-height: 0.6rem;
  margin: 0.2rem auto 0;
  color: black;
  font-size: 0.4rem;

  .item {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #666;
    font-size: 0.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info-icon {
    float: left;
    width: 0.5rem;
    font-size: 0.42rem;
    line-height: 0.7rem;
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  width: 100%;
  background-color: rgb(242, 242, 242);
  font-size: 0.4rem;

  .plus-icon {
    display: block;
    margin: 0 auto;
    font-size: 0.5rem;
    height: 0.7rem;
    line-height: 0.7rem;
    width: 0.6rem;
    color: #ff9800;
  }

  .word {
    display: block;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.24rem;
    color: #ff9800;
  }
}
</style>