<template>
  <div class="faq-admin">
    <h2>Edit The FAQ</h2>
    <div v-for="faq in faqList" :key="faq.FAQ_id" class="faq-item">
      <BaseCard>
        <label :for="'faq-FAQ_header-' + faq.FAQ_id" class="faq-label"
          >Question (ID: {{ faq.FAQ_id }}):</label
        ><br />
        <input
          :id="'faq-FAQ_header-' + faq.FAQ_id"
          v-model="faq.FAQ_header"
          class="custom-input"
        /><br />

        <label :for="'faq-answer-' + faq.FAQ_id" class="faq-label"
          >Answer:</label
        ><br />
        <textarea
          :id="'faq-answer-' + faq.FAQ_id"
          v-model="faq.answer"
          class="custom-textarea"
        ></textarea
        ><br />

        <BaseButton @click="deleteFaq(faq.id)" class="delete-button"
          >Delete</BaseButton
        >
      </BaseCard>
    </div>

    <BaseButton @click="addFaq" class="add-button">ADD FAQ</BaseButton>
    <BaseButton @click="saveFaqs" class="save-button">Save Changes</BaseButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqList: [],
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  mounted() {
    // Fetch FAQs from your API when the component is mounted
    this.fetchFAQData();
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
            const tempResults = [];
            this.faqList = data; // Populate faqList with the response data
          });
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    },
    addFaq() {
      this.faqs.push({ id: null, question: '', answer: '' });
    },
    deleteFaq(id) {
      // You can implement the logic to delete an FAQ from your backend here
      // Send a DELETE request to your API endpoint with the FAQ ID
      // Update the state after successful deletion
      console.log('Deleting FAQ with ID:', id);
    },
    async saveFaqs() {
      // Make an API call to save the changes to your backend
      try {
        const response = await this.$http.post(
          `${process.env.VUE_APP_API_URL}/faqs`,
          this.faqs
        );
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
/* Custom styles for input and textarea */
.custom-input {
  width: 100%; /* Make the input element full width */
  padding: 8px; /* Add some padding for spacing */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 4px; /* Add border radius */
  font-size: 14px; /* Adjust the font size */
  white-space: nowrap; /* Prevent line breaks in the input */
}

.custom-textarea {
  width: 100%; /* Make the textarea full width */
  height: 200px;
  padding: 8px; /* Add some padding for spacing */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 4px; /* Add border radius */
  font-size: 14px; /* Adjust the font size */
  resize: vertical; /* Allow vertical resizing of the textarea */
}
.faq-admin {
  padding: 20px;
}

.faq-item {
  margin-bottom: 15px;
}

.faq-label {
  font-weight: bold;
}

/* Vertical Track */
::-webkit-scrollbar {
  width: 8px; /* Set the width of the vertical scrollbar */
  background-color: #f5f5f5; /* Background color of the vertical track */
}

/* Vertical Handle */
::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the vertical scrollbar handle */
  border-radius: 4px; /* Rounded corners for the vertical handle */
}

/* Vertical Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the vertical handle on hover */
}
</style>
