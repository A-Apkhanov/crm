<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="$emit('onClickToggleSidebar')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ formattedDate }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdownTrigger"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul
            id="dropdown"
            class="dropdown-content"
          >
            <li>
              <router-link
                to="/profile"
                class="black-text"
              >
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li
              class="divider"
              tabindex="-1"
            />
            <li>
              <a
                href="#"
                class="black-text"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import formatDate from '@/services/formatDate';

export default {
  name: 'NavBar',
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    formattedDate() {
      return formatDate(this.date, 'datetime');
    },
    name() {
      return this.$store.getters.info && this.$store.getters.info.name;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdownTrigger, {
      constrainWidth: false,
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
