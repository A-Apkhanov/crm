<template>
  <div class="app-main-layout">
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
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar.vue';
import SideBar from '@/components/app/SideBar.vue';

export default {
  name: 'MainLayout',
  data() {
    return {
      isOpenSidebar: true,
    };
  },
  components: {
    NavBar,
    SideBar,
  },
};
</script>
