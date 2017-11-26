import db from '../db'

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
  addLesson (store, model) {
    model.createdAt = Date.now()
    model.saltId = model.guid()
    db.lesson.put(model).then((id) => {
      return store.dispatch('loadData')
    }, () => {
      throw Error('Cant mainEvent data')
    })
  },
  removeItem (store, itemId) {
    db.mainEvent.delete(itemId).then(() => {
      db.lesson.where({mainEventId: itemId}).delete()
      store.commit('REMOVE_ITEM', itemId)
    })
  },
  loadData ({commit}) {
    db.lesson.toArray((items) => {
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
