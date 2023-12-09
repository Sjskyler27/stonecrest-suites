<template>
  <header v-if="content" class="stonecrest-header">
    <a href="/" class="logo-title" :style="{ color: content.primaryColor }">
      <img
        src="../../../public/SSR_Logo.png"
        alt="Stonecrest Suites Logo"
        class="logo"
      />
      <h1>{{ content.title }}</h1>
    </a>
    <div class="menu-container" @click="toggleMenu">
      <!-- <DarkToggle></DarkToggle> -->
      <div class="menu-icon"><HamburgerButton></HamburgerButton></div>
      <transition name="slide-fade">
        <div v-if="menuVisible" class="dropdown-menu">
          <router-link v-if="isPasswordCorrect" to="/admin">Admin</router-link>
          <!-- <router-link to="/settings">Settings</router-link> -->
          <!-- <router-link to="/profile">Profile</router-link> -->
          <!-- <router-link to="/support">Support</router-link> -->
          <router-link to="/about">About Us</router-link>
          <router-link to="/account">Account</router-link>
          <router-link to="/logout">Logout</router-link>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import HamburgerButton from '../UI/HamburgerButton.vue';
import DarkToggle from '../UI/DarkToggle.vue';
import content from '../../assets/appearance.js';

export default {
  components: {
    HamburgerButton,
    DarkToggle,
  },
  name: 'StonecrestHeader',
  data() {
    return {
      menuVisible: false,
      content: null,
      correctPassword: '1234',
      enteredPassword: '',
      isPasswordCorrect: false,
    };
  },
  async created() {
    const storedPassword = localStorage.getItem('adminPassword');

    if (storedPassword === this.correctPassword) {
      this.isPasswordCorrect = true;
    }
    try {
      this.content = await content;
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.stonecrest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 2px solid $primary-color;
  z-index: 9999; /* Ensure it appears on top of everything */
}

.logo-title {
  display: flex;
  align-items: center;
  text-decoration: none;
  /*color: $primary-color;*/
  font-family: Inika;
}

.logo {
  height: 50px;
  margin-right: 10px;
}
.logo-title h1 {
  font-size: 24px;
}
.menu-container {
  position: relative;
}

.menu-icon {
  cursor: pointer;
  position: relative;
}

.dropdown-menu {
  margin-top: 8px;
  position: absolute;
  top: 100%;
  right: 0;
  background: linear-gradient(
    to top right,
    lighten($primary-color, 50%),
    #e9e9ea
  );
  border: 1px solid lighten($primary-color, 50%);
  box-shadow: 0 2px 8px lighten($primary-color, 50%);
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

@media (min-width: 600px) {
  .logo-title h1 {
    // Reduce the font size for small devices
    font-size: 38px; // Adjust the size as needed
  }

  .logo {
    height: 70px; // Adjust the logo size as well to keep the proportions
  }
  .menu-icon {
    font-size: 24px;
  }
}
</style>
