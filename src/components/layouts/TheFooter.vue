<template>
  <div
    v-if="content"
    class="footer-container"
    :style="{ backgroundColor: content.primaryColor }"
  >
    <div class="contact-info">
      <h3>CONTACT STONECREST RENTALS</h3>
      <p class="contact-text">To learn more call:</p>
      <p class="contact-text">{{ content.contactInfo.phone }}</p>
      <p class="contact-text">Or send an email to:</p>
      <p class="contact-text">{{ content.contactInfo.email }}</p>
    </div>
    <div class="social-icons">
      <i
        v-for="(icon, index) in content.socialIcons"
        :key="index"
        :class="['fa-brands', icon.icon, 'fa-2xl']"
      ></i>
    </div>
  </div>
</template>

<script>
import content from '../../assets/appearance.js'; // Import the JSON file

export default {
  name: 'FooterComponent',
  data() {
    return {
      content: null,
    };
  },
  async created() {
    try {
      this.content = await content;
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  },
};
</script>

<style scoped lang="scss">
.footer-container {
  /*background-color: $primary-color;*/
  color: white;
  margin-top: 50px;
  padding: 25px;
  text-align: center;
}

.contact-text {
  font-size: 20px;
  margin-bottom: 30px;
}

.social-icons i {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}
</style>
