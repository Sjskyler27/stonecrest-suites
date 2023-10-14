<template>
  <TheHeader title="SS"></TheHeader>
  <BaseButton>Click me</BaseButton>
  <BaseButton class="flat">Click me</BaseButton>
  <FaqCard>
    <template v-slot:header> Headline </template>
    This is a placeholder text for sampling the content of the label I am
    making.
  </FaqCard>
  <FaqCard>
    <template v-slot:header> Headline </template>
    This is a placeholder text for sampling the content of the label I am
    making.
  </FaqCard>
  <FaqCard>
    <template v-slot:header> Headline </template>
    This is a placeholder text for sampling the content of the label I am
    making.
  </FaqCard>
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
</style>
