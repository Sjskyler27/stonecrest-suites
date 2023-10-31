<template>
  <TheHeader class="TheHeader" title="SS"></TheHeader>
  <div style="height: 100px"></div>
  <router-view></router-view>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

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

.faq {
  margin-top: 0px;
}
</style>
