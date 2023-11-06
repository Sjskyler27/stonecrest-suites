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
        ></AmenitiesForm>
      </BaseCard>
      <div
        v-for="(amenity, index) in amenityList"
        :key="index"
        class="amenity-containers"
      >
        <BaseCard>
          <AmenitiesForm
            :amenity="amenity"
            :isAdmin="true"
            @refresh="fetchAmenitiesData"
          ></AmenitiesForm>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import AmenitiesForm from '../forms/AmenitiesForm..vue';

export default {
  components: {
    AmenitiesForm,
  },
  data() {
    return {
      amenityList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
    };
  },
  created() {
    this.fetchAmenitiesData();
  },
  methods: {
    async fetchAmenitiesData() {
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
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching amenities data:', error);
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
