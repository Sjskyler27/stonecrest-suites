<template>
  <div class="centered-container">
    <div class="info-text">
      <h2>WELCOME TO THE ADMIN PAGE</h2>
      <p>
        You add and edit things here including: faqs, general pricing, rooms and
        ameneties.
      </p>
    </div>
    <BaseButton style="margin-bottom: 10px" @click="changeView('info')"
      >Edit Info</BaseButton
    >
    <BaseButton style="margin-bottom: 10px" @click="changeView('faq')"
      >Edit Faq</BaseButton
    >
    <BaseButton style="margin-bottom: 10px" @click="changeView('room')"
      >Edit Room</BaseButton
    >
    <BaseButton style="margin-bottom: 10px" @click="changeView('Ameneties')"
      >Edit Ameneties</BaseButton
    >
    <BaseButton style="margin-bottom: 10px" @click="changeView('Location')"
      >Edit Location</BaseButton
    >
    <BaseButton style="margin-bottom: 10px" @click="changeView('Reservations')"
      >Edit Reservations</BaseButton
    >

    <InfoAdmin v-if="view == 'info'"></InfoAdmin>
    <FAQEdit v-if="view == 'faq'"></FAQEdit>
  </div>
</template>

<script>
import FAQEdit from '@/components/forms/FAQEdit.vue';
import InfoAdmin from '@/components/admin-views/InfoAdmin.vue';
export default {
  components: {
    InfoAdmin,
    FAQEdit,
  },
  data() {
    return {
      view: 'info',
    };
  },
  methods: {
    changeView(view) {
      this.view = view;
      console.log('view', this.view);
    },
  },
};
</script>
<style scoped lang="scss">
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.info-containers {
  width: 300px;
}
.create-container {
  width: 300px;
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
