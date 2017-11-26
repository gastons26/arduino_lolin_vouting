import WifiControl from 'wifi-control'
const childProcess = require('child_process')
const $ = require('jquery')

WifiControl.init({})
const _apConnection = {
  ssid: 'LOLIN_V1',
  password: 'LOLIN12345'
}
const resultBaseUrl = 'http://192.168.69.96'

WifiControl.win32Disconnect = () => {
  try {
    childProcess.execSync(
      `netsh wlan disconnect`
    )
  } catch (ex) {
    console.log(ex)
  }
}

const state = {}

const mutations = {
}

const actions = {
  loadResultFromLolin (store, item) {
    store.commit('Lesson/LOADING_RESULT', true, {root: true})
    WifiControl.connectToAP(_apConnection, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        wifiAjaxCallToGetData(store, item)
      }
    })
  },
  startVoting (store, item) {
    store.commit('Lesson/LOADING_RESET', true, {root: true})
    WifiControl.connectToAP(_apConnection, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        wifiAjaxCallToReset(store, item)
      }
    })
  }
}

function wifiAjaxCallToGetData (store, item) {
  $.ajax({
    url: `${resultBaseUrl}/get_count`,
    method: 'get',
    crossDomain: true
  }).then((data) => {
    store.dispatch('Lesson/setVotingResult', {
      id: item.id,
      results: data
    }, {root: true})
    store.commit('Lesson/LOADING_RESULT', false, {root: true})
    WifiControl.win32Disconnect()
  }, () => {
    setTimeout(wifiAjaxCallToGetData(store, item), 300)
  })
}

function wifiAjaxCallToReset (store, item) {
  $.ajax({
    url: `${resultBaseUrl}/reset`,
    method: 'get',
    crossDomain: true
  }).then((data) => {
    store.dispatch('Lesson/startVoting', {
      id: item.id
    }, {root: true})
    store.commit('Lesson/LOADING_RESET', false, {root: true})
    WifiControl.win32Disconnect()
  }, () => {
    setTimeout(wifiAjaxCallToReset(store, item), 300)
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
