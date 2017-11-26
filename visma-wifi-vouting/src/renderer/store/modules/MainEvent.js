import db from '../db'
import MainEventModel from '../Models/mainEvent'
import LessonModel from '../Models/lesson'

const state = {
  items: []
}

const mutations = {
  LOAD_ITEMS (state, items) {
    state.items = items
  }
}

const actions = {
  addEvent (store) {
    var itm = new MainEventModel('Gudro nedēļa', 'Visma pirmais vouting wifi tests visas nedēļas garumā')
    db.mainEvent.put(itm).then((id) => {
      return store.dispatch('loadData')
    }, () => {
      throw Error('Cant mainEvent data')
    })
  },

  addLesson ({commit}, mainEventId) {
    var itm = new LessonModel(mainEventId, 'Gatis Juris', 'Pastāstīsim un parādīsim kā tikām galā ar vouting sistēmu')
    db.lesson.put(itm).then(id => {

    })
  },

  loadData ({commit}) {
    console.log('Im reloading')
    db.mainEvent.toArray((items) => {
      items.forEach(itm => {
        db.lesson.where({mainEventId: itm.id}).toArray(lessons => {
          itm.lessons = lessons
        })
      })
      commit('LOAD_ITEMS', items)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
