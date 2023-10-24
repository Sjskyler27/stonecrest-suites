<template>
  <div class="centered-container">
    <div class="info-text">
      <h2>BOOK A ROOM WITH STONECREST SUITES TODAY</h2>
      <p>
        We are happy to have a variety of different rooms to meet your needs
        along with additional amenities to choose from.
      </p>
    </div>
    <router-link to="/examples">
      <BaseButton style="margin-bottom: 10px">BOOK NOW!</BaseButton>
    </router-link>
    <FaqCard class="faq" v-for="(faq, index) in faqList" :key="index">
      <template v-slot:header>
        {{ faq.FAQ_header }}
      </template>
      {{ faq.answer }}
    </FaqCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqList: [], // Initialize an empty array for FAQ data
    };
  },
  created() {
    // Make the GET request when the component is created
    this.fetchFAQData();
  },
  methods: {
    async fetchFAQData() {
      try {
        this.isLoading = true;
        await fetch('https://stonecrast-api.onrender.com/api/faq')
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data);
            const tempResults = [];
            this.faqList = data; // Populate faqList with the response data
          });
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    },
  },
};
</script>
<style>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh; /* Set the container to occupy the full viewport height */
}

.info-text {
  width: 325px;
}

h2 {
  color: #164686;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
