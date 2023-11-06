<template>
  <div class="centered-container">
    <div
      v-for="(location, index) in locationList"
      :key="index"
      class="location-containers"
    >
      <BaseCard>
        <LocationForm
          :location="location"
          :isAdmin="false"
          @refresh="fetchLocationData"
        ></LocationForm>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import LocationForm from '@/components/forms/LocationForm.vue';
export default {
  components: {
    LocationForm,
  },
  data() {
    return {
      locationList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
    };
  },
  created() {
    this.fetchLocationData();
  },
  methods: {
    async fetchLocationData() {
      console.log('fetching locations');
      try {
        this.isLoading = true;
        const response = await fetch(this.apiUrl + '/locations', {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            this.locationList = data;
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching location data:', error);
      }
    },
  },
};
</script>
<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.info-container {
  width: 300px;
}
.info-text {
  width: 280px;
}

.BaseCard {
  width: 280px;
}

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.location-containers {
  width: 300px;
}
.button {
  margin-top: 2px;
}
</style>
