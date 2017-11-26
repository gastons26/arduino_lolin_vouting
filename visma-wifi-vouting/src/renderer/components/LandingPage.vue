<template>

  <div id="wrapper">
    <main>
      <b-table striped hover :fields="fields" :items="items">
        <template slot="operations" slot-scope="data">
          <icon name="eye"></icon>
          <a v-on:click="deleteItem(data.item)">
          <icon name="trash-o"></icon>
          </a>
        </template>
      </b-table>
    </main>

    <main-event-form-modal id="eventModelModal"></main-event-form-modal>
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import MainEventFormModal from './LandingPage/MainEventFormModal'
  import moment from 'moment'

  export default {
    name: 'landing-page',
    components: {
      SystemInformation,
      MainEventFormModal
    },
    data () {
      return {
        loading: false,
        wifi: require('wifi-control'),
        fields: {
          title: {
            label: 'Nosaukums',
            sortable: true
          },
          description: {
            label: 'Apraksts',
            sortable: true
          },
          createdAt: {
            label: 'Izveidots',
            sortable: true,
            formatter: (value) => { return moment(value).format('DD.MM.YYYY HH:mm') }
          },
          operations: {
            label: 'Operācijas'
          }
        }
      }
    },
    mounted () {
      this.$store.dispatch('MainEvent/loadData')
    },
    computed: {
      items () {
        return this.$store.state.MainEvent.items
      }
    },
    methods: {
      open (link) {
        this.$data.loading = true
        this.$store.dispatch('MainEvent/addEvent').then(() => {

        })
        this.$store.dispatch('MainEvent/addLesson', 1)
      },
      logEvents () {
        this.$store.dispatch('MainEvent/loadData').then(() => {
          console.log(this.$store.state.MainEvent.items)
        })
      },
      deleteItem (item) {
        if (confirm('Vai tiešām vēlaties dzēsst?')) {
          this.$store.dispatch('MainEvent/removeItem', item.id)
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    height: 100vh;
    padding: 0;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }
</style>
