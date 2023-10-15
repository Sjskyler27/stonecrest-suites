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
      <div class="menu-icon">&#x2630;</div>
      <transition name="slide-fade">
        <div v-if="menuVisible" class="dropdown-menu">
          <a href="/settings">Settings</a>
          <a href="/profile">Profile</a>
          <a href="/account">Account</a>
          <a href="/support">Support</a>
          <a href="/about">About Us</a>
          <a href="/logout">Logout</a>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
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
  color: #164686;
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
  background: linear-gradient(to top right, #75a7e6, #e5e5e6);
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: white;
}

.dropdown-menu a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: black;
}

.dropdown-menu a:hover {
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
