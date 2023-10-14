<template>
  <div :class="['faq-card', { open: isOpen }]" @click="toggleContent">
    <div :class="['header', { open: isOpen }]">
      <div class="header-title">
        <slot name="header"></slot>
      </div>
      <span class="icon" v-if="isOpen">▲</span>
      <span class="icon" v-else>▼</span>
    </div>
    <div :class="['content', { open: isOpen }]" ref="contentDiv">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isContentVisible: false,
    };
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen;
      //   if (this.isOpen) {
      //     setTimeout(() => {
      //       this.isContentVisible = true;
      //     }, 500); // Adjust this time to match the max-height transition duration
      //   } else {
      //     this.isContentVisible = false;
      //   }
    },
  },
};
</script>

<style scoped>
.faq-card {
  display: flex;
  width: 310px;
  padding: 10px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: radial-gradient(
      214.11% 95.29% at 36.25% 142%,
      #114f9a 0%,
      rgba(17, 79, 154, 0) 100%
    ),
    #626367;
  transition: max-height 0.7s ease-in-out;
  max-height: 50px; /* Set to closed height */
}
.faq-card.open {
  max-height: 250px; /* Set to a large enough open height */
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
}
.header.open {
  border-bottom: 1px solid white;
}
.header-title {
  flex: 1 0 0;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Inika;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.icon {
  display: flex;
  width: 35px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  color: white;
}
.content {
  align-self: stretch;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-height: 1000px;
  overflow: hidden;
}
</style>
