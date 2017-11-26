<template>
  <div id="lesson-list">

    <lesson-form-modal></lesson-form-modal>
  </div>
</template>

<script>
  import LessonFormModal from './LessonList/LessonFormModal'

  export default {
    id: 'lesson-list',
    name: 'lesson-list',
    components: {
      LessonFormModal
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      open (link) {
        this.$data.loading = true
      }
    }
  }
</script>

<style>

</style>