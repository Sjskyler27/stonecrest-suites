<template>
  <TheHeader class="TheHeader" title="SS"></TheHeader>
  <div class="header-padding"></div>
  <BaseMessage />

  <router-view></router-view>
  <TheFooter></TheFooter>
</template>

<script>
import BaseMessage from './components/UI/BaseMessage.vue';
import TheFooter from './components/layouts/TheFooter.vue';

export default {
  components: {
    BaseMessage,
    TheFooter,
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import '@fortawesome/fontawesome-free/css/all.css';

* {
  box-sizing: border-box;
}
.TheHeader {
  position: fixed;
  background-color: white;
  width: 100%;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
h2 {
  color: $primary-color;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.faq {
  margin-top: 0px;
}
/* Vertical Track */
::-webkit-scrollbar {
  width: 8px; /* Set the width of the vertical scrollbar */
  background-color: #f5f5f5; /* Background color of the vertical track */
}

/* Vertical Handle */
::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the vertical scrollbar handle */
  border-radius: 4px; /* Rounded corners for the vertical handle */
}

/* Vertical Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the vertical handle on hover */
}
.header-padding {
  height: 70px;
}
@media (min-width: 600px) {
  .header-padding {
    height: 110px;
  }
}
</style>
