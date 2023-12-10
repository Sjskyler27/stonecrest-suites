<template>
  <div>
    <h2>Edit Amenities</h2>
    <div class="centered-container">
      <BasePageSpinner :isLoading="isLoading" />
      <BaseCard class="create-container">
        <AmenitiesForm
          :amenity="false"
          :isAdmin="true"
          @refresh="fetchAmenitiesData"
          :locationList="locationList"
          :amenityTypeList="amenityTypeList"
        ></AmenitiesForm>
      </BaseCard>
      <div
        v-for="amenity in amenityList"
        :key="amenity"
        class="amenity-containers"
      >
        <BaseCard>
          <AmenitiesForm
            :amenity="amenity"
            :isAdmin="true"
            @refresh="fetchAmenitiesData"
            :locationList="locationList"
            :amenityTypeList="amenityTypeList"
          ></AmenitiesForm>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import AmenitiesForm from '../forms/AmenitiesForm.vue';

export default {
  components: {
    AmenitiesForm,
  },
  data() {
    return {
      amenityList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
      locationList: [],
      amenityTypeList: [],
    };
  },
  created() {
    this.fetchLocationData();
    this.fetchAmenitiesData();
    this.fetchAmenityTypesData();
  },
  methods: {
    async fetchAmenitiesData() {
      console.log('fetching amenities');
      try {
        this.isLoading = true;
        const response = await fetch(`${this.apiUrl}/amenities`, {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            this.amenityList = data;
            console.log(this.amenityList);
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching amenities data:', error);
      }
    },
    async fetchAmenityTypesData() {
      console.log('fetching amenities Types');
      try {
        this.isLoading = true;
        const response = await fetch(`${this.apiUrl}/amenity-types`, {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            this.amenityTypeList = data;
            console.log(this.amenityTypeList);
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching amenities types data:', error);
      }
    },
    async fetchLocationData() {
      console.log('fetching locations');
      try {
        this.isLoading = true;
        const response = await fetch(`${this.apiUrl}/locations`, {
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
            console.log(this.locationList);
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
.amenity-containers {
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
