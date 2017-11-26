import db from '../db'
import LessonModel from '../Models/lesson'

const state = {
  items: []
}

const mutations = {
  LOAD_ITEMS (state, items) {
    state.items = items
  },
  REMOVE_ITEM (state, id) {
    state.items.every((itm, index) => {
      if (itm.id === id) {
        state.items.splice(index, 1)
        return false
      }
      return true
    })
  }
}

const actions = {
  addEvent (store, model) {
    model.createdAt = Date.now()
    db.mainEvent.put(model).then((id) => {
      return store.dispatch('loadData')
    }, () => {
      throw Error('Cant mainEvent data')
    })
  },
  removeItem (store, itemId) {
    console.log(itemId)
    db.mainEvent.delete(itemId).then(() => {
      db.lesson.where({mainEventId: itemId}).delete()

      store.commit('REMOVE_ITEM', itemId)
    })
  },
  addLesson ({commit}, mainEventId) {
    var itm = new LessonModel(mainEventId, 'Gatis Juris', 'Pastāstīsim un parādīsim kā tikām galā ar vouting sistēmu')
    db.lesson.put(itm).then(id => {

    })
  },

  loadData ({commit}) {
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
