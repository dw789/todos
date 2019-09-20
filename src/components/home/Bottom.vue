<template>
  <div class="home">
    <div class="top">
      <div class="iconfont all-icon" :style="alliconStyle" @click="allClick">
        <div :style="allStyle">&#xe627;</div>
        <div>全选</div>
      </div>
      <!-- Todos备忘录 -->
      <span class="title">Todos备忘录</span>
      <div class="iconfont top-icon" @click="topiconClick">&#xe60f;</div>
    </div>
    <div class="empty"></div>
    <div class="totalinfo">
      <strong class="nofinish">{{list.length}}</strong>件待处理事项,
      <strong class="over">{{num}}</strong>件已完成事项
    </div>
    <ul>
      <li v-for="(item,index) in list" :key="index" class="info">
        <div class="iconfont info-icon" @click="iconClick(index)" :style="iconStyle[index]">&#xe627;</div>
        <div class="item">待处理：{{item}}</div>
      </li>
    </ul>
    <div :style="open" class="add">
      <div class="add-top">新建事项</div>
      <p>请为该事项输入内容</p>
      <input type="text" v-model="value" id="input" />
      <div class="add-function">
        <div class="cancel" @click="cancelClick">取消</div>
        <div class="sub" :style="sub" @click="subClick">提交</div>
      </div>
    </div>
    <div class="warn" :style="warnStyle">
      <div class="warn-top">请先撤销编辑，再添加事项！</div>
      <div class="warn-ok" @click="warnClick">ok</div>
    </div>
    <div class="bottom">
      <div class="plus" @click="plusClick">
        <span class="iconfont plus-icon">&#xe610;</span>
        <span class="word">增加事项</span>
      </div>
      <router-link tag="div" class="over" to="/over">
        <span class="iconfont plus-icon">&#xe62f;</span>
        <span class="word">已完成事项</span>
      </router-link>
      <div class="choice">
        <span class="iconfont plus-icon" @click="overClick">&#xe647;</span>
        <span class="word">完成</span>
      </div>
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
  name: "HomeBottom",
  data() {
    return {
      value: "",
      list: [], //存放待处理事项
      open: {
        opacity: 0
      },
      sub: {
        color: "#BDBDBD"
      },
      iconStyle: [], //存放圆圈样式
      alliconStyle: {
        //全选样式
        display: "none"
      },
      allStyle: {
        //全选圆圈样式
        color: ""
      },
      warnStyle: {
        display: "none"
      },
      thinglist: [],
      overlist: [], //存放已完成事项
      num: this.$store.state.overnumber //已完成事项数量
    };
  },
  methods: {
    plusClick() {
      if (this.alliconStyle.display == "block") {
        this.warnStyle.display = "block";
      } else {
        this.open.opacity = 1;
        document.getElementById("input").focus();
      }
    }, //增加
    cancelClick() {
      this.open.opacity = 0;
      this.value = "";
    }, //取消
    subClick() {
      if (this.sub.color == "#ff9800") {
        this.list.push(this.value);
        this.value = "";
        this.open.opacity = 0;
        this.iconStyle.push({ color: "#8a8a8a", display: "none" });
        localStorage.setItem("list", this.list);
        localStorage.setItem("iconStyle", JSON.stringify(this.iconStyle));
      }
    }, //提交
    iconClick(index) {
      this.iconStyle[index].color =
        this.iconStyle[index].color == "#8a8a8a" ? "#1AFA29" : "#8a8a8a";
    }, //选中
    topiconClick() {
      this.iconStyle.forEach(it => {
        it.display = it.display == "none" ? "block" : "none";
      });
      if (this.list.length == 0) {
        this.alliconStyle.display = "none";
      } else {
        this.alliconStyle.display =
          this.alliconStyle.display == "none" ? "block" : "none";
      }
    }, //编辑
    reduceClick() {
      this.iconStyle.forEach((it, index) => {
        if (it.color == "#1AFA29") {
          this.thinglist.push(index); //存放选中事项的下标
        }
      });
      let length = this.list.length;
      let i = 0;
      this.thinglist.forEach(it => {
        //循环删除选中事项与其样式
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
      this.alliconStyle.display = "none";
      this.allStyle.color = "";
      localStorage.setItem("list", this.list); //缓存数据更新
      localStorage.setItem("iconStyle", JSON.stringify(this.iconStyle)); //缓存样式数据更新
    }, //删除
    overClick() {
      let list2 = [];
      this.iconStyle.forEach((it, index) => {
        if (it.color == "#1AFA29") {
          list2.push(index);
        }
      });
      this.list.forEach((it, index) => {
        if (list2.indexOf(index) !== -1) {
          this.overlist.push(it);
        }
      });
      if (!localStorage.overlist) {
        this.num = this.overlist.length;
      } else {
        this.num = localStorage.overlist
          .split(",")
          .concat(this.overlist).length;
      }
      this.$store.commit("overlist", this.overlist);
      this.overlist = [];
      this.reduceClick();
    }, //提交已完成事项
    allClick() {
      this.allStyle.color = this.allStyle.color == "" ? "#1AFA29" : "";
      if (this.allStyle.color == "") {
        this.iconStyle.forEach(it => {
          it.color = "#8a8a8a";
        });
      } else {
        this.iconStyle.forEach(it => {
          it.color = "#1AFA29";
        });
      }
    }, //全选
    warnClick() {
      this.warnStyle.display = "none";
    } //关闭警告窗口
  },
  watch: {
    value() {
      //监控input是否有内容
      if (this.value) {
        this.sub.color = "#ff9800";
      } else {
        this.sub.color = "#BDBDBD";
      }
    }
  },
  mounted() {
    if (!localStorage.list) {
      this.list = [];
    } else {
      this.list = localStorage.list.split(",");
    }
    if (!localStorage.iconStyle) {
      this.iconStyle = [];
    } else {
      this.iconStyle = JSON.parse(localStorage.iconStyle);
    }
    if (localStorage.overlist == "") {
      this.num = 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: rgb(242, 242, 242);
    font-size: 0.5rem;
    color: #666;

    .title {
      font-size: 0.42rem;
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

  .totalinfo {
    height: 0.5rem;
    font-size: 0.3rem;
    line-height: 0.5rem;
    text-align: left;
    margin-left: 2.5%;

    .nofinish {
      color: red;
    }

    .over {
      color: green;
    }
  }

  .bottom {
    position: fixed;
    display: flex;
    bottom: 0;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    background-color: #ffffff;
    font-size: 0.4rem;

    div {
      flex: 1;
      color: black;
    }

    .plus-icon {
      display: block;
      margin: 0 auto;
      font-size: 0.5rem;
      height: 0.7rem;
      line-height: 0.7rem;
      width: 0.6rem;
      color: #999;
    }

    .word {
      display: block;
      height: 0.3rem;
      line-height: 0.3rem;
      font-size: 0.24rem;
      color: #999;
    }
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

  .add {
    background-color: #fff;
    width: 5rem;
    height: 2.4rem;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -2.5rem;
    border-radius: 0.24rem;
    border: 1px solid #BDBDBD;

    .add-top {
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.3rem;
      color: black;
    }

    p {
      font-size: 0.24rem;
      color: #000;
      line-height: 0.4rem;
      margin-bottom: 0.2rem;
    }

    input {
      width: 4.2rem;
      height: 0.5rem;
      border: 1px solid #eee;
    }

    .add-function {
      width: 100%;
      display: flex;
      height: 0.6rem;
      line-height: 0.6rem;
      margin-top: 0.1rem;
      color: #ff9800;
      font-size: 0.3rem;
      font-weight: 400;

      div {
        border-top: 1px solid #C7C7C7;
        flex: 1;
      }

      .cancel {
        border-right: 1px solid #C7C7C7;
      }
    }
  }

  .warn {
    background-color: #fff;
    width: 5rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -2.5rem;
    margin-top: -1rem;
    border-radius: 0.25rem;
    border: 1px solid #BDBDBD;

    .warn-top {
      font-size: 0.36rem;
      line-height: 1.2rem;
    }

    .warn-ok {
      height: 0.8rem;
      width: 100%;
      font-size: 0.5rem;
      line-height: 0.8rem;
      border-top: 1px solid #BDBDBD;
      color: #ff9800;
    }
  }
}
</style>
