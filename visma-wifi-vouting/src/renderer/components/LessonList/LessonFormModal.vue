<template>
  <b-modal id="eventModelModal"
           title="Pievienot notikumu"
           @ok="handleOk">
    <form @submit.stop.prevent="handleSubmit">
      <b-form-input v-model="form.title"
                    type="text"
                    placeholder="Ievadiet notikuma nosaukumu"></b-form-input>
      <br />
      <b-form-textarea id="textarea1"
                       v-model="form.description"
                       placeholder="Ievadiet aprakstu"
                       :rows="3"
                       :max-rows="6">
      </b-form-textarea>
    </form>
  </b-modal>
</template>

<script>
  import LessonModel from '../../store/Models/lesson'

  export default {
    data () {
      return {
        loading: false,
        form: new LessonModel(this.$route.params.id, '', '')
      }
    },
    methods: {
      handleOk (evt) {
        this.$data.loading = true
        if (this.isValid()) {
          this.$store.dispatch('Lesson/addLesson', this.$data.form).then(() => {
            this.$data.form = new LessonModel(this.$route.params.id, '', '')
          }, () => {})
        } else {
          evt.preventDefault()
          alert('Nav aizpildīti visi dati')
        }
      },
      isValid () {
        return (this.$data.form.title.trim().length > 0 && this.$data.form.description.trim().length > 0)
      }
    }
  }
</script>

<style>

</style>