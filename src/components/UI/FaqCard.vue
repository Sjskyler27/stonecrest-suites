<template>
  <div :class="['faq-card', { open: isOpen }]" ref="faqCard">
    <div
      :class="['header', { open: isOpen }]"
      @click="toggleContent"
      ref="header"
    >
      <div class="header-title">
        <slot name="header"></slot>
      </div>
      <span class="icon" v-if="isOpen">▲</span>
      <span class="icon" v-else>▼</span>
    </div>
    <div :class="['content', { open: isOpen }]" ref="contentDiv">
      <slot ref="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen;
      this.$nextTick(this.setMaxHeight); // Use nextTick to ensure DOM elements are ready
    },
    setMaxHeight() {
      if (this.isOpen) {
        // If open, set max height to 100%
        // const content = this.$refs.content;
        // if (content) {
        //   const contentHeight = content.offsetHeight + 10;
        //   console.log(contentHeight);
        //   this.$refs.faqCard.style.maxHeight = `${contentHeight}px`;
        // }
        this.$refs.faqCard.style.maxHeight = `${600}px`; // this is now how we update the max height when open
      } else {
        // If closed, calculate header height if it exists
        const header = this.$refs.header;
        if (header) {
          const headerHeight = header.offsetHeight + 10;
          console.log(headerHeight);
          this.$refs.faqCard.style.maxHeight = `${headerHeight}px`;
        }
      }
    },
  },
  mounted() {
    // Set the initial max height when the component is mounted
    this.setMaxHeight();
  },
};
</script>

<style scoped>
.faq-card {
  display: flex;
  width: 310px;
  padding: 6px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: linear-gradient(to top right, #114f9a, #626367);
  background-size: 100% 100%; /* Increase the size to extend beyond the card */
  background-position: bottom left; /* Start from the bottom left corner */
  transition: max-height 0.3s ease-in-out;
  /*max-height: 50px;*/ /*we now get the max height dynamicaly*/
  padding-bottom: 10px;
  margin-bottom: 3px; /*likely not a good idea to have some margin in the component, but just in case*/
}

.faq-card.open {
  max-height: 100%; /* this sets the max size of the card when expanded, the bigger it is the longer delay it has when collapsing NOW USE FUNCTION TO SET*/
}

.header {
  padding-top: 5px;
  padding-bottom: 5px;
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
  overflow: hidden;
}
</style>
