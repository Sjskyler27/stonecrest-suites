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
    <div v-for="(info, index) in infoList" :key="index" class="info-containers">
      <BaseCard>
        <infoForm
          :info="info"
          :isAdmin="true"
          @refresh="this.fetchInfoData"
        ></infoForm>
      </BaseCard>
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
            // console.log(data);
            const tempResults = [];
            this.infoList = data; // Populate infoList with the response data
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
</style>
