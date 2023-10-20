<template>
  <div @click="toggle" :class="{ active: active }" class="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
  },
  watch: {
    // Watch for changes in the route
    $route() {
      // Set active to false when the route changes
      this.active = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';
.hamburger {
  width: 30px;
  height: 24px;
  position: relative;
  cursor: pointer;
}
.hamburger span {
  background-color: #333;
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  transition: all 0.3s ease;
}
.hamburger span:nth-child(1) {
  top: 0;
}
.hamburger span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}
.hamburger span:nth-child(3) {
  bottom: 0;
}
.hamburger.active span:nth-child(1) {
  transform: translateY(0px) rotate(45deg);
  top: 50%;
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(4px) rotate(-45deg);
  bottom: 50%;
}
</style>
