<template>
  <div id="app">

    <b-navbar toggleable="md" type="light" variant="light">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand>Lolin vouting V1</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto"  v-if="$route.name !== 'lesson-list'">
          <section>
            <b-nav-item v-b-modal="'eventModelModal'"><icon name="plus" color="Teal"></icon></b-nav-item>
          </section>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="$route.name === 'lesson-list'">
          <b-nav-item>
            <router-link :to="{ name: 'landing-page' }"><icon name="arrow-left" color="Teal"></icon></router-link>
          </b-nav-item>
          <b-nav-item v-b-modal="'eventModelModal'"><icon name="plus" color="Teal"></icon></b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'visma-wifi-vouting'
  }
</script>

<style>
  /* CSS */
</style>
