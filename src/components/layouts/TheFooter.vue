<template>
  <div class="footer-container">
    <div class="contact-info">
      <h2>CONTACT STONECREST RENTALS</h2>
      <p class="contact-text">To learn more call:</p>
      <p class="contact-text">888-888-8888</p>
      <p class="contact-text">or send an email to:</p>
      <p class="contact-text">example@gmail.com</p>
    </div>
    <div class="social-icons">
      <img src="path_to_your_images/facebook-icon.png" alt="Facebook Icon" />
      <img src="path_to_your_images/instagram-icon.png" alt="Instagram Icon" />
      <img src="path_to_your_images/linkedin-icon.png" alt="LinkedIn Icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped lang="scss">
.footer-container {
  background-color: $primary-color;
  color: white;
  padding: 50px;
  text-align: center;
}

.contact-text {
  font-size: 20px;
  margin-bottom: 30px;
}

.social-icons img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}
</style>
