<template>
  <div class="info-table">
    <span v-if="isAdmin">
      <h2>ID: {{ editedInfo.info_id }}</h2>
      <input
        v-model="editedInfo.info_header"
        :disabled="!isAdmin"
        v-if="isAdmin"
      />
      <textarea v-model="editedInfo.content" :disabled="!isAdmin"></textarea>
    </span>
    <span v-else>
      <h2>{{ editedInfo.info_header }}</h2>
      <p>{{ editedInfo.content }}</p>
    </span>
    <!-- Create Edit and Delete buttons -->
    <BaseButton @click="createInfo" v-if="isAdmin && info.info_id == null">
      Create
    </BaseButton>
    <BaseButton @click="saveChanges" v-if="isAdmin && info.info_id != null">
      Update
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteInfo"
      v-if="isAdmin && info.info_id != null"
    >
      Delete
    </BaseButton>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
      editedInfo:
        this.info == false
          ? {
              info_id: 'Create New Info',
              info_header: '',
              content: '',
            }
          : {
              info_id: this.info.info_id,
              info_header: this.info.info_header,
              content: this.info.content,
            },

      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async createInfo() {
      try {
        const newInfo = {
          info_header: this.editedInfo.info_header, // Set the question
          content: this.editedInfo.content, // Set the answer
        };

        const response = await fetch(`${this.apiUrl}/info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newInfo),
        });

        if (response.ok) {
          const responseData = await response.json();
          location.reload();
          localStorage.setItem('message', 'New Message created');
          localStorage.setItem('messageType', 'success');
        } else {
          console.error('Failed to add a new info.');
          location.reload();
          localStorage.setItem('message', 'New Message failed to create');
          localStorage.setItem('messageType', 'error');
        }
      } catch (error) {
        console.error('Error adding a new info:', error);
        location.reload();
        localStorage.setItem(
          'message',
          `New Message failed to create Error: ${error} `
        );
        localStorage.setItem('messageType', 'error');
      }
    },

    async saveChanges() {
      try {
        const response = await fetch(
          `${this.apiUrl}/info/${this.editedInfo.info_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedInfo),
          }
        );

        if (response.ok) {
          // Data successfully updated
          alert('Saved changes');
          location.reload();
        } else {
          location.reload();
          console.error('Failed to update info.');
          localStorage.setItem('message', 'Failed to update info');
          localStorage.setItem('messageType', 'error');
        }
      } catch (error) {
        location.reload();
        console.error('Error updating info:', error);
        localStorage.setItem('message', `Error updating info: ${error}`);
        localStorage.setItem('messageType', 'error');
      }
    },

    async deleteInfo() {
      try {
        const response = await fetch(
          `${this.apiUrl}/info/${this.info.info_id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          // Data successfully deleted
          location.reload();
          alert('Deleted info');
        } else {
          location.reload();
          console.error('Failed to delete info.');
          localStorage.setItem('message', 'Failed to delete info');
          localStorage.setItem('messageType', 'error');
        }
      } catch (error) {
        location.reload();
        console.error('Error deleting info:', error);
        localStorage.setItem('message', `Error deleting info: ${error}`);
        localStorage.setItem('messageType', 'error');
      }
    },
  },
};
</script>

<style scoped>
.info-table {
}

input,
textarea {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
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
