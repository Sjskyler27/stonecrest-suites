<template>
  <div class="footer-container">
    <div class="contact-info">
      <h3>CONTACT STONECREST RENTALS</h3>
      <p class="contact-text">To learn more call:</p>
      <p class="contact-text">888-888-8888</p>
      <p class="contact-text">or send an email to:</p>
      <p class="contact-text">example@gmail.com</p>
    </div>
    <div class="social-icons">
      <i class="fa-brands fa-facebook fa-2xl"></i>
      <i class="fa-brands fa-instagram fa-2xl"></i>
      <i class="fa-brands fa-twitter fa-2xl"></i>
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
