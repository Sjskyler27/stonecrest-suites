<template>
  <div class="faq-admin">
    <h2>ADD NEW FAQ</h2>
    <div class="faq-item">
      <BaseCard>
        <label class="faq-label">Question:</label><br />
        <!-- Bind user input to a data property -->
        <textarea class="custom-textarea" v-model="newFaq.FAQ_header" /><br />

        <label class="faq-label">Answer:</label><br />
        <!-- Bind user input to a data property -->
        <textarea class="custom-textarea" v-model="newFaq.answer"></textarea
        ><br />
        <BaseButton @click="addFaq" class="add-button">ADD FAQ</BaseButton>
      </BaseCard>
    </div>

    <br />
    <h2>Edit The FAQ</h2>
    <div v-for="faq in faqList" :key="faq.FAQ_id" class="faq-item">
      <BaseCard>
        <label :for="'faq-FAQ_header-' + faq.FAQ_id" class="faq-label"
          >Question (ID: {{ faq.FAQ_id }}):</label
        ><br />
        <textarea
          :id="'faq-FAQ_header-' + faq.FAQ_id"
          v-model="faq.FAQ_header"
          class="custom-textarea"
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

        <BaseButton @click="updateFaq(faq.FAQ_id)">Update</BaseButton>
        <BaseButton @click="deleteFaq(faq.FAQ_id)" class="flat"
          >Delete</BaseButton
        >
      </BaseCard>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      newFaq: {
        FAQ_header: '', // Initialize with empty values
        answer: '',
      },
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
    async addFaq() {
      try {
        const newFaq = {
          FAQ_header: 'Enter new question', // Set the question
          answer: 'Enter new Answer', // Set the answer
        };

        const response = await fetch(`${this.apiUrl}/faqs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newFaq),
        });

        if (response.ok) {
          const responseData = await response.json();
          // Add the new FAQ to the list
          // Reload the page after a brief delay (you can adjust the delay as needed)
          location.reload();
          localStorage.setItem('message', 'New Message created');
          localStorage.setItem('messageType', 'success');
        } else {
          console.error('Failed to add a new FAQ.');
          location.reload();
          localStorage.setItem('message', 'New Message failed to create');
          localStorage.setItem('messageType', 'error');
        }
      } catch (error) {
        console.error('Error adding a new FAQ:', error);
        location.reload();
        localStorage.setItem('message', 'New Message failed to create');
        localStorage.setItem('messageType', 'error');
      }
    },
    async updateFaq(faqId) {
      try {
        // Find the FAQ by its ID
        const faqToUpdate = this.faqList.find(faq => faq.FAQ_id === faqId);

        if (!faqToUpdate) {
          console.error(`FAQ with ID ${faqId} not found.`);
          location.reload();
          localStorage.setItem('message', 'message not found');
          localStorage.setItem('messageType', 'error');

          return;
        }

        const updatedData = {
          FAQ_header: faqToUpdate.FAQ_header,
          answer: faqToUpdate.answer,
        };

        const response = await fetch(`${this.apiUrl}/faqs/${faqId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          console.log(`FAQ with ID ${faqId} updated successfully.`);

          location.reload();
          localStorage.setItem('message', `message ${faqId} Updated`);
          localStorage.setItem('messageType', 'success');
        } else {
          console.error(`Failed to update FAQ with ID ${faqId}.`);
          location.reload();
          localStorage.setItem('message', 'Message failed to update');
          localStorage.setItem('messageType', 'error');
        }
      } catch (error) {
        console.error(`Error updating FAQ with ID ${faqId}:`, error);
        location.reload();
        localStorage.setItem('message', 'Message failed to update');
        localStorage.setItem('messageType', 'error');
      }
    },
    async deleteFaq(id) {
      try {
        this.isLoading = true;
        const response = await fetch(this.apiUrl + '/faqs/' + id, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Deleting FAQ with ID:', id);
          console.log(response);
          location.reload();
          localStorage.setItem('message', `message ${id} Deleted`);
          localStorage.setItem('messageType', 'success');
        } else {
          console.error('Error with the response:', response.statusText);
        }
      } catch (error) {
        console.error('Error DELETING FAQ data:', error);
        location.reload();
        localStorage.setItem('message', 'Message failed to delete');
        localStorage.setItem('messageType', 'error');
      } finally {
        this.isLoading = false; // Ensure isLoading is reset even if there's an error
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* Add your styles here. For instance: */
/* Custom styles for input and textarea */

.custom-textarea {
  width: 100%; /* Make the textarea full width */
  height: 100px;
  padding: 8px; /* Add some padding for spacing */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 4px; /* Add border radius */
  font-size: 14px; /* Adjust the font size */
  resize: vertical; /* Allow vertical resizing of the textarea */
  border: 2px solid $primary-color;
}
.faq-admin {
  padding: 0px;
  width: 400px;
}

.faq-item {
  margin-bottom: 15px;
}

.faq-label {
  font-weight: bold;
}
.button {
  margin: 10px;
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
