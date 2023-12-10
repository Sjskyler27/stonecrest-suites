<template>
  <h2>Edit Types of Amenities</h2>
  <div class="centered-container">
    <BasePageSpinner :isLoading="isLoading" />
    <BaseCard class="create-container">
      <AmenityTypeForm
        :amenity-type="false"
        :isAdmin="true"
        @refresh="this.fetchAmenityTypeData"
      ></AmenityTypeForm>
    </BaseCard>
    <div class="cards-wrapper">
      <div
        v-for="amenityType in amenityTypeList"
        :key="amenityType"
        class="info-containers"
      >
        <BaseCard>
          <AmenityTypeForm
            :amenity-type="amenityType"
            :isAdmin="true"
            @refresh="this.fetchAmenityTypeData"
          ></AmenityTypeForm>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import AmenityTypeForm from '@/components/forms/AmenityTypeForm.vue';

export default {
  components: {
    AmenityTypeForm,
  },
  data() {
    return {
      amenityTypeList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
    };
  },
  created() {
    this.fetchAmenityTypeData();
  },
  methods: {
    async fetchAmenityTypeData() {
      console.log('fetching amenity types');
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
            console.log(data);
            this.amenityTypeList = data;
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching amenity types data:', error);
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

@media (min-width: 768px) {
  .cards-wrapper {
    display: grid;
    grid-template-columns: auto auto;
    align-items: normal;
  }

  .info-containers {
    margin: 10px;
  }
}

@media (min-width: 1250px) {
  .cards-wrapper {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: normal;
  }

  .info-containers {
    margin: 10px;
  }
}
</style>
