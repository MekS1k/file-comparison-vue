import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstFileData: [],
    SecondFileData: [],
    NameFile1: '',
    NameFile2: '',
    firstHedaer: [],
    SecondHeader: []

  },
  getters: {
  },
  mutations: {
    FIRST_FILE_DATA: (state, payload) =>{
      state.firstFileData = payload
    },
    SECOND_FILE_DATA: (state, payload) =>{
      state.SecondFileData = payload
    },
    FIRST_FILE_NAME: (state, payload) =>{
      state.NameFile1 = payload
    },
    SECOND_FILE_NAME: (state, payload) =>{
      state.NameFile2 = payload
    },
    FIRST_FILE_HEADER: (state, payload) =>{
      state.firstHedaer = payload
    },
    SECOND_FILE_HEADER: (state, payload) =>{
      state.SecondHeader = payload
    }
  },
  actions: {
  },
})
