// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    counter: state => state.counter * 2
    // counter3: state => state.counter * 3
  },
  mutations: {
    increment: state => state.counter++
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `
    <div>
        <p class="counter">{{ counter }}</p>
        <div class="actions">
            <div class="actions-inner">
                <button @click="increment"> + </button>
            </div>
        </div>
    </div>
  `,
  store,
  /** log instance */
  /* created () {
    console.log(this)
  } */
  computed: {
    counter: function () {
      return this.$store.getters.counter
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    }
  }
})
