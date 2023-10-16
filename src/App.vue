<template>
  <TheHeader title="SS"></TheHeader>
  <div
    style="
      display: grid;
      justify-content: center; /* Horizontally center */
      align-items: center;
    "
  ></div>
  <router-view></router-view>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
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
