<template>
  <div :class="{ darkMode: isDark }" class="theme-toggle">
    <div @click="toggleMode" class="toggle-container">
      <div class="toggle-handle"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
    };
  },
  methods: {
    toggleMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle('dark', this.isDark);
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/main.scss';
.theme-toggle {
  display: flex;
  align-items: center;
  background-color: #cccccc;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: 120px;
  justify-content: flex-start;
}

.theme-toggle.darkMode {
  background-color: #222222;
  justify-content: flex-end;
}

.toggle-container {
  width: 50px;
  height: 25px;
  background: #eeeeee;
  border-radius: 15px;
  position: relative;
}

.toggle-handle {
  position: absolute;
  width: 23px;
  height: 23px;
  background: #ffffff;
  border-radius: 50%;
  top: 1px;
  left: 1px;
  transition: all 0.3s ease;
}

.darkMode .toggle-handle {
  left: calc(100% - 24px);
}

body.dark {
  background-color: #222222;
  color: #ffffff;
}
</style>
