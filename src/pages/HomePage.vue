<template>
  <div class="centered-container">
    <div class="info-text">
      <h2>BOOK A ROOM WITH STONECREST SUITES TODAY</h2>
      <p>
        We are happy to have a variety of different rooms to meet your needs
        along with additional amenities to choose from.
      </p>
    </div>
    <router-link to="/selection">
      <BaseButton style="margin-bottom: 10px">BOOK NOW!</BaseButton>
    </router-link>
    <BaseCard class="info-container">
      <div v-for="(info, index) in infoList" :key="index">
        <infoForm :info="info" :isAdmin="false"></infoForm>
      </div>
    </BaseCard>
    <FaqCard class="faq" v-for="(faq, index) in faqList" :key="index">
      <template v-slot:header>
        {{ faq.FAQ_header }}
      </template>
      {{ faq.answer }}
    </FaqCard>
  </div>
</template>

<script>
import infoForm from '@/components/forms/infoForm.vue';
export default {
  components: {
    infoForm,
  },
  data() {
    return {
      faqList: [], // Initialize an empty array for FAQ data
      infoList: [],
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  created() {
    // Make the GET request when the component is created
    this.fetchFAQData();
    this.fetchInfoData();
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

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
