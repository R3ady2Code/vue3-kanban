<template>
  <div class="app">
    <div class="layout">
      <Sidebar />
      <Header />
    </div>
    <Kanban />
  </div>
</template>

<script>
import Sidebar from './components/Layout/Sidebar.vue';
import Header from './components/Layout/Header.vue';
import Kanban from './components/Kanban.vue';

export default {
  name: "App",
  components: { Sidebar, Header, Kanban },

  async mounted() {
    this.projects = (await this.$store.dispatch('fetchProjects')).map(p => p.title)
  },
};
</script>
