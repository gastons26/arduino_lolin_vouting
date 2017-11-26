import db from '../db'

const state = {
  items: [],
  loadingResult: false,
  loadingStart: false
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
  },
  SET_VOTING_RESULT (state, model) {
    state.items.every((itm, index) => {
      if (itm.id === model.id) {
        state.items[index].results = model.results
        return false
      }
      return true
    })
  },
  START_VOTING (state, model) {
    state.items.every((itm, index) => {
      if (itm.id === model.id) {
        state.items[index].isActive = true
        state.loadingStart = false
        return false
      }
      return true
    })
  },
  LOADING_RESULT (state, isLoading) {
    state.loadingResult = isLoading
  },
  LOADING_RESET (state, isLoading) {
    state.loadingStart = isLoading
  }
}

const actions = {
  addLesson (store, model) {
    model.createdAt = Date.now()
    model.saltId = model.guid()
    db.lesson.put(model).then((id) => {
      return store.dispatch('loadData', model.mainEventId)
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
  loadData ({commit}, id) {
    db.lesson.where('mainEventId').equals(id).toArray((items) => {
      commit('LOAD_ITEMS', items)
    })
  },
  setVotingResult (store, model) {
    db.lesson.update(model.id, {results: model.results}).then(function (updated) {
      if (updated) {
        store.commit('SET_VOTING_RESULT', model)
      }
    })
  },
  startVoting (store, model) {
    db.lesson.update(model.id, {isActive: true}).then(function (updated) {
      if (updated) {
        store.commit('START_VOTING', model)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
