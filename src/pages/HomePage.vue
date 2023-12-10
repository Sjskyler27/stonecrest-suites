<template>
  <div class="centered-container">
    <br />
    <h2>WELCOME TO STONECREST SUITES</h2>
    <img
      src="https://images.squarespace-cdn.com/content/v1/582cce42bebafbfc47a82b04/1672856046574-E4JYXTRGK17XE4FKI36I/christina-wocintechchat-com-eS72kLFS6s0-unsplash.jpg?format=1500w"
      alt="Stonecrest Suites"
      class="home-image"
    />
    <div class="info-text">
      <p>
        Discover the perfect place to stay with Stonecrest Suites. We offer a
        variety of comfortable rooms to meet your needs, whether you're here for
        business or leisure. Our friendly staff is dedicated to making your stay
        memorable.
      </p>
    </div>
    <router-link to="/selection">
      <BaseButton style="margin-top: 20px">BOOK NOW!</BaseButton>
    </router-link>
    <br />
    <h2>General Pricing Info</h2>
    <BaseCard class="info-container">
      <div v-for="info in infoList" :key="info">
        <infoForm :info="info" :isAdmin="false"></infoForm>
      </div>
      <BaseButton style="margin-top: 20px">BOOK NOW!</BaseButton>
    </BaseCard>
    <!-- <br />
    <h2>Available Amenities</h2>
    <BaseCard class="info-container">
      <div>
        <div v-for="amenityType in amenityTypeList" :key="amenityType">
          <AmenityTypeForm
            :amenity-type="amenityType"
            :isAdmin="false"
            @refresh="this.fetchAmenityTypeData"
          ></AmenityTypeForm>
        </div>
      </div>
    </BaseCard> -->
    <br />
    <h2>Frequently Asked Questions</h2>
    <FaqCard class="faq" v-for="faq in faqList" :key="faq">
      <template v-slot:header>
        {{ faq.FAQ_header }}
      </template>
      {{ faq.answer }}
    </FaqCard>
    <BaseButton style="margin-top: 20px">BOOK NOW!</BaseButton>
  </div>
</template>

<script>
import infoForm from '@/components/forms/infoForm.vue';
import AmenityTypeForm from '@/components/forms/AmenityTypeForm.vue';
export default {
  components: {
    infoForm,
    AmenityTypeForm,
  },
  data() {
    return {
      amenityTypeList: [],
      faqList: [], // Initialize an empty array for FAQ data
      infoList: [],
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  created() {
    // Make the GET request when the component is created
    this.fetchFAQData();
    this.fetchInfoData();
    this.fetchAmenityTypeData();
  },
  methods: {
    async fetchFAQData() {
      try {
        this.isLoading = true;
        // console.log('env:', this.apiUrl);
        const response = await fetch(this.apiUrl + '/faqs', {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data);
            this.faqList = data; // Populate faqList with the response data
          });
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    },
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
    async fetchInfoData() {
      try {
        this.isLoading = true;
        // console.log('env:', this.apiUrl);
        const response = await fetch(this.apiUrl + '/info', {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data);
            const tempResults = [];
            this.infoList = data; // Populate infoList with the response data
          });
      } catch (error) {
        console.error('Error fetching info data:', error);
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
.home-image {
  width: 100%;
  max-width: 800px; /* Adjust the max-width as needed */
  margin-top: 20px;
}

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

@media (min-width: 600px) {
  .info-text {
    width: 380px;
  }
  .info-container {
    width: 400px;
  }

  .BaseCard {
    width: 380px;
  }
}

@media (min-width: 1100px) {
  .info-text {
    width: 480px;
  }
  .info-container {
    width: 500px;
  }

  .BaseCard {
    width: 480px;
  }
}
</style>
