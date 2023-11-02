<template>
  <div class="centered-container">
    <div class="info-text">
      <h2>WELCOME TO THE ADMIN PAGE</h2>
      <p>
        You add and edit things here including: faqs, general pricing, rooms and
        ameneties.
      </p>
    </div>
    <router-link to="/examples">
      <BaseButton style="margin-bottom: 10px">CREATE ROOM</BaseButton>
      <BaseButton style="margin-bottom: 10px">CREATE ROOM</BaseButton>
      <BaseButton style="margin-bottom: 10px">CREATE ROOM</BaseButton>
    </router-link>
    <BaseCard style="width: 400px">
      <infoForm :info="false" :isAdmin="true"></infoForm>
    </BaseCard>
    <div v-for="(info, index) in infoList" :key="index" class="info-containers">
      <BaseCard>
        <infoForm :info="info" :isAdmin="true"></infoForm>
      </BaseCard>
    </div>
    <FAQEdit></FAQEdit>
  </div>
</template>

<script>
import FAQEdit from '@/components/layouts/FAQEdit.vue';
import infoForm from '@/components/forms/infoForm.vue';
export default {
  components: {
    infoForm,
    FAQEdit,
  },
  data() {
    return {
      faqList: [], // Initialize an empty array for FAQ data
      infoList: [],
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  created() {
    this.fetchInfoData();
  },
  methods: {
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
<style scoped lang="scss">
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh; /* Set the container to occupy the full viewport height */
}
.info-containers {
  width: 400px;
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
