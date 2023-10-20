<template>
  <header class="stonecrest-header">
    <a href="/" class="logo-title">
      <img
        src="../../../public/SSR_Logo.png"
        alt="Stonecrest Suites Logo"
        class="logo"
      />
      <h1>Stonecrest Suites</h1>
    </a>
    <div class="menu-container" @click="toggleMenu">
      <!-- <DarkToggle></DarkToggle> -->
      <div class="menu-icon"><HamburgerButton></HamburgerButton></div>
      <transition name="slide-fade">
        <div v-if="menuVisible" class="dropdown-menu">
          <router-link to="/settings">Settings</router-link>
          <router-link to="/profile">Profile</router-link>
          <router-link to="/account">Account</router-link>
          <router-link to="/support">Support</router-link>
          <router-link to="/about">About Us</router-link>
          <router-link to="/logout">Logout</router-link>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import HamburgerButton from '../UI/HamburgerButton.vue';
import DarkToggle from '../UI/DarkToggle.vue';
export default {
  components: {
    HamburgerButton,
    DarkToggle,
  },
  name: 'StonecrestHeader',
  data() {
    return {
      menuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style scoped>
.stonecrest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
}

.logo-title {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font-family: Inika;
}

.logo {
  height: 70px;
  margin-right: 10px;
}
.menu-container {
  position: relative;
}

.menu-icon {
  font-size: 24px;
  padding: 7px;
  cursor: pointer;
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: linear-gradient(to top right, #90bbf0, #e9e9ea);
  border: 1px solid #90bbf0;
  box-shadow: 0 2px 8px #90bbf0;
  border-radius: 5px;
  color: white;
}

.dropdown-menu a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: black;
}

.dropdown-menu a:hover,
a.router-link-active {
  color: #f5f5f5;
}
/* Animation styles */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to /* <- This is the alias for .slide-fade-leave-active in Vue 2.6+ */ {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-to, .slide-fade-leave-from /* <- This is the alias for .slide-fade-leave in Vue 2.6+ */ {
  opacity: 1;
  transform: translateY(0);
}
</style>
