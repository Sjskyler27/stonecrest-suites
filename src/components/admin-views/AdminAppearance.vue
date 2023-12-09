<template>
  <div v-if="editedContent">
    <h2>Edit Content</h2>
    <form @submit.prevent="saveChanges" class="content-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="editedContent.title" />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          id="phone"
          v-model="editedContent.contactInfo.phone"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="editedContent.contactInfo.email"
        />
      </div>
      <div class="form-group">
        <label>Social Icons</label>
        <div v-for="(icon, index) in editedContent.socialIcons" :key="index">
          <input type="text" v-model="icon.icon" placeholder="Icon Class" />
          <input type="url" v-model="icon.link" placeholder="Link" />
          <BaseButton @click="removeSocialIcon(index)">Remove</BaseButton>
          <BaseButton @click="addSocialIcon">Add Social Icon</BaseButton>
        </div>
      </div>
      <div class="form-group">
        <label for="primaryColor">Primary Color</label>
        <input
          type="color"
          id="primaryColor"
          v-model="editedContent.primaryColor"
        />
      </div>
      <div class="form-group">
        <label for="secondaryColor">Secondary Color</label>
        <input
          type="color"
          id="secondaryColor"
          v-model="editedContent.secondaryColor"
        />
      </div>
      <BaseButton type="submit">Save Changes</BaseButton>
      <BaseButton type="button" @click="discardChanges"
        >Discard Changes</BaseButton
      >
    </form>
  </div>
</template>

<script>
import content from '../../assets/appearance.js';

export default {
  data() {
    return {
      previousContent: null,
      editedContent: null,
    };
  },
  async created() {
    try {
      this.editedContent = await content;
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
    try {
      this.previousContent = JSON.parse(JSON.stringify(this.editedContent));
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  },
  methods: {
    async saveChanges() {
      const apiUrl = process.env.VUE_APP_API_URL;
      const contentUrl = `${apiUrl}/content/1`;
      try {
        // Send a PUT request to update the content on the server
        const response = await fetch(contentUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editedContent),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Update the previousContent with the editedContent
        this.previousContent = JSON.parse(JSON.stringify(this.editedContent));

        // Log success
        console.log('Content updated successfully:', this.editedContent);
      } catch (error) {
        // Handle error
        console.error('Error updating content:', error);
      }
      console.log('Saved Changes:', this.editedContent);
    },
    addSocialIcon() {
      this.editedContent.socialIcons.push({ icon: '', link: '' });
    },
    removeSocialIcon(index) {
      this.editedContent.socialIcons.splice(index, 1);
    },
    discardChanges() {
      // Reset the editedContent to the original content from the JSON file
      console.log('setting changes to: ', this.previousContent);
      this.editedContent = JSON.parse(JSON.stringify(this.previousContent));
      this.previousContent = JSON.parse(JSON.stringify(this.previousContent));
    },
  },
};
</script>

<style scoped>
/* Style for the form container */
.content-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Style for form fields and labels */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type='text'],
input[type='email'],
input[type='url'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px;
}

input[type='color'] {
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
}

/* Style for social icons section */
.label-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label-group input[type='text'] {
  flex: 1;
  margin-right: 10px;
}

/* Add more styles as needed */
</style>
