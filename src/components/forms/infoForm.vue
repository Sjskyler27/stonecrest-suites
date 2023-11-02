<!-- 
  This is a component that represents the general info.
  many components will follow the same format in this folder.
  The component has three states that it might be in.
  if the component is passed a object and Admin false
  then it knows it is in 'read only mode' text areas become 
  disabled and the content is styled to look good for reading
  however if admin is true then text areas become etitable
  and the update and delete buttons apear.
  if the component is told admin true but sent no object then
  it is in create mode. it has all blank data and shows the 
  create button 

 -->
<template>
  <div>
    <span>
      <h2 v-if="isAdmin">ID: {{ editedInfo.info_id }}</h2>
      <textarea
        class="info_header"
        ref="info_header"
        v-model="editedInfo.info_header"
        :disabled="!isAdmin"
      />
      <textarea
        ref="content"
        v-model="editedInfo.content"
        :disabled="!isAdmin"
      ></textarea>
    </span>
    <!-- Create, Edit, and Delete buttons -->
    <BaseButton @click="createInfo" v-if="isAdmin && info.info_id == null">
      Add Info
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
  mounted() {
    this.setHeight('content');
    this.setHeight('info_header');
  },
  methods: {
    setHeight(ref) {
      const content = this.$refs[ref];
      console.log('ref = ', content);
      if (content && !this.isAdmin) {
        const contentHeight = content.scrollHeight; // add padding to content
        const totalHeight = contentHeight;
        // Set the height of the current textarea (based on the ref)
        content.style.height = `${totalHeight}px`;
      } else if (content) {
        content.style.height = `${100}px`;
      }
    },
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

<style scoped lang="scss">
textarea {
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  border: 2px solid $primary-color;
}

input:disabled,
textarea:disabled {
  pointer-events: none; /* Disable mouse events */
  border: none;
  background-color: transparent;
  resize: none;
}
textarea.info_header:disabled {
  color: $primary-color;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
textarea.content:disabled {
  color: #000;
  font-family: Inika;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
