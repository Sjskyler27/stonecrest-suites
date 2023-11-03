<template>
  <div class="centered-container">
    <!-- <div class="info-text">
      <h2>WELCOME TO THE ADMIN PAGE</h2>
      <p>
        You add and edit things here including: faqs, general pricing, rooms and
        amenities.
      </p>
    </div> -->
    <div class="menu">
      <ul>
        <li @click="changeView('info')" :class="{ active: view === 'info' }">
          Edit Info
        </li>
        <li @click="changeView('faq')" :class="{ active: view === 'faq' }">
          Edit FAQ
        </li>
        <li @click="changeView('room')" :class="{ active: view === 'room' }">
          Edit Room
        </li>
        <li
          @click="changeView('Amenities')"
          :class="{ active: view === 'Amenities' }"
        >
          Edit Amenities
        </li>
        <li
          @click="changeView('Location')"
          :class="{ active: view === 'Location' }"
        >
          Edit Location
        </li>
        <li
          @click="changeView('Reservations')"
          :class="{ active: view === 'Reservations' }"
        >
          Edit Reservations
        </li>
        <li
          @click="changeView('Reservations')"
          :class="{ active: view === 'Appearance' }"
        >
          Edit Appearance
        </li>
      </ul>
    </div>
    <div class="view">
      <InfoAdmin v-if="view == 'info'"></InfoAdmin>
      <FAQEdit v-if="view == 'faq'"></FAQEdit>
    </div>
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
      this.scrollToTop(); // Scroll to top when the view changes
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // You can use 'auto' for instant scrolling
      });
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
.menu {
  position: fixed;
  background-color: #fff;
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      margin: 5px;
      cursor: pointer;
      padding: 10px 20px;
      background-color: #f0f0f0;
      border-radius: 5px;

      &:hover {
        background-color: #ccc;
      }

      &.active {
        background-color: lighten($primary-color, 10%);
        color: #fff;
      }
    }
  }
}
.view {
  padding-top: 80px;
}
</style>
