<template>
  <TheHeader title="SS"></TheHeader>
  <BaseButton>Click me</BaseButton>
  <BaseButton class="flat">Click me</BaseButton>
  <div class="faq-container">
    <FaqCard class="faq">
      <template v-slot:header> Headline </template>
      This is a placeholder text for sampling the content of the label I am
      making.
    </FaqCard>
    <FaqCard class="faq">
      <template v-slot:header>
        Can I customize there setups of the room for my event?
      </template>
      One approach to fix the delay while closing is to set the max-height
      dynamically based on the actual content height. This way, the transition
      will be smooth both when opening and closing the accordion.
    </FaqCard>
    <FaqCard class="faq">
      <template v-slot:header>
        Can I customize the setup of the conference room for my event?</template
      >
      One approach to fix the delay while closing is to set the max-height
      dynamically based on the actual content height. This way, the transition
      will be smooth both when opening and closing the accordion. One approach
      to fix the delay while closing is to set the max-height dynamically based
      on the actual content height. This way, the transition will be smooth both
      when opening and closing the accordion. One approach to fix the delay
      while closing is to set the max-height dynamically based on the actual
      content height. This way, the transition will be smooth both when opening
      and closing the accordion. One approach to fix the delay while closing is
      to set the max-height dynamically based on the actual content height. This
      way, the transition will be smooth both when opening and closing the
      accordion. One approach to fix the delay while closing is to set the
      max-height dynamically based on the actual content height. This way, the
      transition will be smooth both when opening and closing the accordion. One
      approach to fix the delay while closing is to set the max-height
      dynamically based on the actual content height. This way, the transition
      will be smooth both when opening and closing the accordion. One approach
      to fix the delay while closing is to set the max-height dynamically based
      on the actual content height. This way, the transition will be smooth both
      when opening and closing the accordion. One approach to fix the delay
      while closing is to set the max-height dynamically based on the actual
      content height. This way, the transition will be THIS IS MAX CONTENT
    </FaqCard>
  </div>
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
