<template>
  <ul
    class="sidenav app-sidenav"
    :class="{open: isOpenSidebar}"
  >
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      custom
      v-slot="{ href, navigate, isActive}"
    >
      <li
        :class="{active: isActive}"
      >
        <a
          :href="href"
          @click="navigate"
          class="waves-effect waves-orange pointer"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    isOpenSidebar: Boolean,
  },
  data() {
    return {
      links: [
        {
          title: 'Счет',
          url: '/',
        },
        {
          title: 'История',
          url: '/history',
        },
        {
          title: 'Планирование',
          url: '/planning',
        },
        {
          title: 'Новая запись',
          url: '/record',
        },
        {
          title: 'Категории',
          url: '/categories',
        },
      ],
    };
  },
};
</script>
