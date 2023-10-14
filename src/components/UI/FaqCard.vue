<template>
  <div :class="['faq-card', { open: isOpen }]">
    <div :class="['header', { open: isOpen }]" @click="toggleContent">
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
  background: linear-gradient(to top right, #114f9a, #626367);
  background-size: 100% 100%; /* Increase the size to extend beyond the card */
  background-position: bottom left; /* Start from the bottom left corner */
  transition: max-height 0.3s ease-in-out;
  max-height: 50px;
}

.faq-card.open {
  max-height: 600px; /* this sets the max size of the card when expanded, the bigger it is the longer delay it has when collapsing*/
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  transition: border-bottom 0.3s ease-in-out;
  border-bottom: 1px solid transparent;
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
/*underline animation*/
.header {
  position: relative; /* add this line */
}

.header::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background: white;
  transition: width 0.3s ease-in-out;
}

.header.open::before {
  width: 100%;
}
/*end underline animation*/

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
  /*max-height: 1000px;*/
  overflow: hidden;
}
</style>
