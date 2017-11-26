import WifiControl from 'wifi-control'
import axios from 'axios'
const childProcess = require('child_process')

WifiControl.init({})
const _apConnection = {
  ssid: 'LOLIN_V1',
  password: 'LOLIN12345'
}
const resultBaseUrl = 'http://192.168.69.96'

WifiControl.win32Disconnect = (_apConnection) => {
  try {
    childProcess.execSync(
      `netsh #${_apConnection.ssid} disconnect`
    )
  } catch (ex) {
    console.log(ex)
  }
}

const state = {
  main: 0
}

const mutations = {
}

const actions = {
  loadResultFromLolin ({ store }) {
    WifiControl.connectToAP(_apConnection, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        setTimeout(() => {
          axios.get(`${resultBaseUrl}/get_count`).then(response => {
            store.dispatch('MainEvent/setVotingResult', response.data)
            WifiControl.win32Disconnect(_apConnection)
          }).catch((error) => {
            console.log(error)
          })
        }, 2500)
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
