<template>
  <div class="centered-container">
    <div class="info-text">
      <h2>WELCOME TO THE ADMIN PAGE</h2>
      <p>
        You add and edit things here including: faqs, general pricing, rooms and
        ameneties.
      </p>
    </div>
    <router-link to="/examples">
      <BaseButton style="margin-bottom: 10px">CREATE ROOM</BaseButton>
      <BaseButton style="margin-bottom: 10px">CREATE ROOM</BaseButton>
      <BaseButton style="margin-bottom: 10px">CREATE ROOM</BaseButton>
    </router-link>
    <FAQEdit></FAQEdit>
  </div>
</template>

<script>
import FAQEdit from '@/components/layouts/FAQEdit.vue';
export default {
  components: {
    FAQEdit,
  },
  data() {
    return {
      faqList: [], // Initialize an empty array for FAQ data
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh; /* Set the container to occupy the full viewport height */
}

.info-text {
  width: 325px;
}

h2 {
  color: #164686;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
