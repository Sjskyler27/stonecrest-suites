<template>
  <div class="centered-container" v-if="isPasswordCorrect">
    <!-- <div class="info-text">
      <h2>WELCOME TO THE ADMIN PAGE</h2>
      <p>
        You add and edit things here including: faqs, general pricing, rooms and
        amenities.
      </p>
    </div> -->

    <div class="menu" ref="menu">
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
          v-if="true"
          @click="changeView('amenities')"
          :class="{ active: view === 'amenities' }"
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
          @click="changeView('reservations')"
          :class="{ active: view === 'reservations' }"
        >
          Edit Reservations
        </li>
        <li
          @click="changeView('appearance')"
          :class="{ active: view === 'appearance' }"
        >
          Edit Appearance
        </li>
      </ul>
    </div>
    <div class="view" ref="view">
      <InfoAdmin v-if="view == 'info'"></InfoAdmin>
      <FAQEdit v-if="view == 'faq'"></FAQEdit>
      <LocationAdmin v-if="view == 'Location'"></LocationAdmin>
      <RoomAdmin v-if="view == 'room'"></RoomAdmin>
      <ReservationAdmin v-if="view == 'reservations'"></ReservationAdmin>
      <AmenitiesAdmin v-if="view == 'amenities'"></AmenitiesAdmin>
    </div>
  </div>
  <p v-else>You are not authorized to access this page</p>
</template>

<script>
import FAQEdit from '@/components/forms/FAQEdit.vue';
import InfoAdmin from '@/components/admin-views/InfoAdmin.vue';
import LocationAdmin from '@/components/admin-views/LocationAdmin.vue';
import RoomAdmin from '@/components/admin-views/RoomAdmin.vue';
import ReservationAdmin from '@/components/admin-views/ReservationAdmin.vue';
import AmenitiesAdmin from '@/components/admin-views/AmenitiesAdmin.vue';
export default {
  components: {
    InfoAdmin,
    FAQEdit,
    LocationAdmin,
    RoomAdmin,
    ReservationAdmin,
    AmenitiesAdmin,
  },
  data() {
    return {
      view: 'info',
      correctPassword: '1111',
      enteredPassword: '',
      isPasswordCorrect: false,
    };
  },
  mounted() {
    this.setPadding();
  },
  created() {
    // Check if the correct password is stored in localStorage
    const storedPassword = localStorage.getItem('adminPassword');

    if (storedPassword === this.correctPassword) {
      this.isPasswordCorrect = true;
    } else {
      // Password is not stored or incorrect, prompt for password
      this.promptForPassword();
    }
  },
  methods: {
    setPadding() {
      const menuElement = this.$refs.menu;
      const viewElement = this.$refs.view;
      console.log('padding', viewElement);
      viewElement.style.paddingTop = `${menuElement.scrollHeight}px`;
    },

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
    promptForPassword() {
      const enteredPassword = prompt('Enter the admin password:');

      if (enteredPassword === this.correctPassword) {
        // Password is correct, store it in localStorage
        localStorage.setItem('adminPassword', enteredPassword);
        this.isPasswordCorrect = true;
      } else {
        // Password is incorrect, you can handle this case as needed (e.g., show an error message)
        alert('Incorrect password. Access denied.');
        // You can also redirect to another page or take appropriate action here
        window.location.href = '../';
      }
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
</style>
