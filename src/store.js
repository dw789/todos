import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
if (!localStorage.overlist) {
  localStorage.setItem("overlist", "");
}
export default new Vuex.Store({
  state: {
    overthing: "",
    overnumber: localStorage.overlist.split(",").length
  },
  mutations: {
    overlist(state, list) {
      state.overthing = list;
      if (!localStorage.overlist) {
        localStorage.setItem("overlist", list);
        state.overnumber = list.length;
      } else {
        localStorage.overlist = localStorage.overlist
          .split(",")
          .concat(list)
          .join(",");
        state.overnumber = localStorage.overlist.split(",").concat(list).length;
      }
    },
    overnumber(state, list) {
      state.overnumber = list;
    }
  }
});