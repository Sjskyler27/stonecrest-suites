<template>
  <h2>Edit Locations</h2>
  <div class="centered-container">
    <BasePageSpinner :isLoading="isLoading" />
    <BaseCard class="create-container">
      <LocationForm
        :location="false"
        :isAdmin="true"
        @refresh="fetchLocationData"
      ></LocationForm>
    </BaseCard>
    <div
      v-for="location in locationList"
      :key="location"
      class="location-containers"
    >
      <BaseCard>
        <LocationForm
          :location="location"
          :isAdmin="true"
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

<style scoped lang="scss">
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.location-containers {
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
