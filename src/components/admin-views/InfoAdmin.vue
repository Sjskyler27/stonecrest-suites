<template>
  <h2>Edit Info</h2>
  <div class="centered-container">
    <BasePageSpinner :isLoading="isLoading" />
    <BaseCard class="create-container">
      <infoForm
        :info="false"
        :isAdmin="true"
        @refresh="this.fetchInfoData"
      ></infoForm>
    </BaseCard>
    <div class="cards-wrapper">
      <div v-for="info in infoList" :key="info" class="info-containers">
        <BaseCard>
          <infoForm
            :info="info"
            :isAdmin="true"
            @refresh="this.fetchInfoData"
          ></infoForm>
        </BaseCard>
      </div>
    </div>
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
      infoList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
    };
  },
  created() {
    this.fetchInfoData();
  },
  methods: {
    async fetchInfoData() {
      console.log('fetching info');
      try {
        this.isLoading = true;
        // console.log('env:', this.apiUrl);
        const response = await fetch(this.apiUrl + '/info', {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            this.infoList = data; // Populate infoList with the response data
            console.log(this.infoList);
          });
      } catch (error) {
        this.isLoading = false;
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
  .room-containers {
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
