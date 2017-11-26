<template>
  <b-modal id="eventModelModal"
           title="Pievienot pasākumu"
           @ok="handleOk">
    <form @submit.stop.prevent="handleSubmit">
      <b-form-input v-model="form.title"
                    type="text"
                    placeholder="Ievadiet pasākuma nosaukumu"></b-form-input>
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
  import MainEventModel from '../../store/Models/mainEvent'

  export default {
    data () {
      return {
        loading: false,
        form: new MainEventModel('', '')
      }
    },
    methods: {
      handleOk (evt) {
        this.$data.loading = true
        if (this.isValid()) {
          this.$store.dispatch('MainEvent/addEvent', this.$data.form).then(() => {}, () => {})
        } else {
          evt.preventDefault()
          alert('Nav aizpildīti visi dati')
        }
      },
      isValid () {
        console.log(this.$data.form)
        return (this.$data.form.title.trim().length > 0 && this.$data.form.description.trim().length > 0)
      }
    }
  }
</script>

<style>

</style>