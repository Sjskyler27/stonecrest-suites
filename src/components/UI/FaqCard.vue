<template>
  <div class="faq-card" ref="faqCard">
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
    <div :class="['content', { open: isOpen }]" ref="content">
      <slot></slot>
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
      this.$nextTick(this.setMaxHeight); // Use nextTick to ensure DOM elements are ready then set the height
    },
    /*************************************
     * SETMAXHEIGHT
     * this function uses the height of the header and the height of the
     * content to dynamically change the height of the card
     * ***********************************/
    setMaxHeight() {
      const header = this.$refs.header; //both open and closed need header height
      let headerHeight = 0;
      if (header) {
        headerHeight = header.offsetHeight + 10; // add pading to header
        // console.log(headerHeight);
      }
      if (this.isOpen) {
        // header + content height
        const content = this.$refs.content;
        if (content) {
          const contentHeight = content.scrollHeight + 20; // add padding to content
          const totalHeight = contentHeight + headerHeight;
          // console.log(contentHeight);
          this.$refs.faqCard.style.maxHeight = `${totalHeight}px`; // sets the height of the card
        }
      } else {
        // If closed, just set it to header height
        this.$refs.faqCard.style.maxHeight = `${headerHeight}px`; // sets the height of the card
      }
    },
  },
  mounted() {
    // Set the initial max height when the component is mounted
    this.setMaxHeight();
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';
.faq-card {
  display: flex;
  width: 310px;
  padding: 6px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px; /*determines the gap between the top of the content and the underline */
  border-radius: 20px;
  background: linear-gradient(to top right, #114f9a, #626367);
  background-size: 100% 100%; /* Increase the gradient to extend beyond the card */
  background-position: bottom left; /* Start from the bottom left corner */
  transition: max-height 0.4s ease-in-out; /* sets how fast the card animates*/
  margin-bottom: 3px; /*likely not a good idea to have some margin in the component, but just in case*/
}

.header {
  padding-top: 5px;
  padding-bottom: 7px; /* determines space between header title and underline currently is visible when open and closed */
  display: flex;
  align-items: center;
  gap: 4px; /*determines how close the text can get to the arrow*/
  align-self: stretch;
  border-bottom: 1px solid transparent; /*hide it when closed*/
}

.header:hover {
  cursor: pointer;
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
/*styles for the underline animation*/
.header {
  position: relative;
}

.header::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background: white;
  transition: width 0.3s ease-in-out; /*speed of the underline, keep it a little faster then the card aniamtion*/
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
