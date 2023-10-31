<template>
  <div class="faq-admin">
    <h2>Edit The FAQ</h2>
    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <label :for="'faq-question-' + index">Question:</label>
      <input :id="'faq-question-' + index" v-model="faq.question" />

      <label :for="'faq-answer-' + index">Answer:</label>
      <textarea :id="'faq-answer-' + index" v-model="faq.answer"></textarea>

      <button @click="deleteFaq(index)">Delete</button>
    </div>

    <button @click="addFaq">ADD FAQ</button>
    <button @click="saveFaqs">Save Changes</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        // Sample initial data. You can replace this with an API call to fetch existing FAQs.
        {
          question: 'How do I book a conference room online?',
          answer: 'You can book a room by...',
        },
        // Add more FAQ items as needed
      ],
    };
  },
  methods: {
    addFaq() {
      this.faqs.push({ question: '', answer: '' });
    },
    deleteFaq(index) {
      this.faqs.splice(index, 1);
    },
    async saveFaqs() {
      // Make an API call to save the changes to your backend
      try {
        const response = await this.$http.post('/api/saveFaqs', this.faqs);
        if (response.status === 200) {
          alert('FAQs saved successfully!');
        } else {
          alert('There was an error saving the FAQs.');
        }
      } catch (error) {
        console.error('Error saving FAQs:', error);
        alert('There was an error saving the FAQs.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here. For instance: */
.faq-admin {
  padding: 20px;
}
.faq-item {
  margin-bottom: 15px;
}
</style>
