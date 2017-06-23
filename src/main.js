// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    todos: [
      {
        task: 'Code',
        completed: true,
        id: uuid.v4()
      },
      {
        task: 'Sleep',
        completed: false,
        id: uuid.v4()
      },
      {
        task: 'Eat',
        completed: false,
        id: uuid.v4()
      }
    ]
  },
  getters: {
    todos: state => state.todos
  },
  // synchronous
  mutations: {
    addTodo: (state, payload) => {
      const task = {
        task: payload,
        completed: false
      }
      state.todos.unshift(task)
    },
    deleteTodo: (state, payload) => {
      const index = state.todos.findIndex(t => t.id === payload)
      // delete from index
      state.todos.splice(index, 1)
      console.log(index)
    },
    toggleTodo: (state, payload) => {
      // create new list of array
      state.todos = state.todos.map((t) => {
        if (t.id === payload) {
          // new array
          return { task: t.task, completed: !t.completed, id: t.id }
        }
        return t
      })
    }
  }
})

/* eslint-disable no-new */

const TodoList = {
  props: ['todos'],
  template: `
    <div>
      <ul>
        <li v-for="t in todos" :class="{completed: t.completed}" @click="toggleTodo(t.id)" @dblclick="deleteTodo(t.id)">{{t.task}}</li>
      </ul>
    </div>
    `,
  methods: {
    toggleTodo (id) {
      this.$store.commit('toggleTodo', id)
    },
    deleteTodo (id) {
      console.log(id)
      this.$store.commit('deleteTodo', id)
    }
  }
}

new Vue({
  el: '#app',
  template: `
    <div>
      <form @submit.prevent="addTodo">
        <input type="text" v-model="task" />
      </form>
      <todo-list :todos="todos"></todo-list>
    </div>
  `,
  data: () => ({
    task: ''
  }),
  store,
  components: {
    'todo-list': TodoList
  },
  computed: {
    todos () {
      return this.$store.getters.todos
    }
  },
  methods: {
    addTodo () {
      this.$store.commit('addTodo', this.task)
      this.task = ''
    }
  }
})
