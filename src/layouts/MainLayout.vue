<template>
  <div
    class="app-main-layout"
  >
    <NavBar @on-click-toggle-sidebar="isOpenSidebar = !isOpenSidebar" />
    <SideBar :is-open-sidebar="isOpenSidebar" />
    <main
      class="app-content"
      :class="{full: !isOpenSidebar}"
    >
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/record"
        v-tooltip="'Создать новую запись'"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar.vue';
import SideBar from '@/components/app/SideBar.vue';
import messages from '@/services/messages';

export default {
  name: 'MainLayout',
  data() {
    return {
      isOpenSidebar: true,
      isLoading: true,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
  async mounted() {
    if (this.$store.getters.info === null) {
      await this.$store.dispatch('fetchUserInfo');
    }
  },
  components: {
    NavBar, SideBar,
  },
};
</script>
