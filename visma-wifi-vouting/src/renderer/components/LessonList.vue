<template>
  <div id="lesson-list">
    <b-table striped hover :fields="fields" :items="items">

      <template slot="operations" slot-scope="data">
        <a v-on:click="startVoting(data.item)">
          <icon name="play"></icon>
        </a>
        <a v-on:click="loadFromWifi(data.item)">
          <icon name="refresh"></icon>
        </a>
        <a v-on:click="createPdf(data.item)">
          <icon name="file-pdf-o"></icon>
        </a>
      </template>

      <template slot="results" slot-scope="data">
        <span class="table-lesson_result table-lesson_result__green">{{ data.item.results.green}}</span>
        <span class="table-lesson_result table-lesson_result__yellow">{{ data.item.results.yellow}}</span>
        <span class="table-lesson_result table-lesson_result__red">{{ data.item.results.red}}</span>
      </template>

    </b-table>
    <lesson-form-modal v-bind:event-id="$route.params.id"></lesson-form-modal>
  </div>
</template>

<script>
  import LessonFormModal from './LessonList/LessonFormModal'
  import moment from 'moment'

  export default {
    id: 'lesson-list',
    name: 'lesson-list',
    components: {
      LessonFormModal
    },
    data () {
      return {
        loading: false,
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
          results: {
            label: 'Rezultāts'
          },
          operations: {
            label: 'Operācijas',
            variant: 'lesson__table__operation__cell'
          }
        }
      }
    },
    methods: {
      createPdf (item) {
        this.$data.loading = true
      },
      loadFromWifi (item) {
        this.$store.dispatch('WifiReader/loadResultFromLolin', item)
      }
    },
    mounted () {
      this.$store.dispatch('Lesson/loadData', this.$route.params.id)
    },
    computed: {
      items () {
        return this.$store.state.Lesson.items
      }
    }
  }
</script>

<style>
  .table-lesson__table__operation__cell a {
    padding: 5px;
  }
  .table-lesson_result {
    padding: 2px 8px 3px;
    border-radius: 20px;
    font-weight: 600;
  }
  .table-lesson_result__green {
      background-color: green;
    }
  .table-lesson_result__yellow {
      background-color: gold;
    }
  .table-lesson_result__red {
      background-color: red;
    }
</style>