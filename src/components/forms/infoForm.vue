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
        rows="1"
      />
      <textarea
        ref="content"
        v-model="editedInfo.content"
        :disabled="!isAdmin"
        rows="1"
      ></textarea>
    </span>
    <!-- Create, Edit, and Delete buttons -->
    <BaseButton @click="createInfo" v-if="isAdmin && info.info_id == null">
      <BaseSpinner :isLoading="loadCreate" /><span v-if="!loadCreate">
        Create
      </span>
    </BaseButton>
    <BaseButton @click="saveChanges" v-if="isAdmin && info.info_id != null">
      <BaseSpinner :isLoading="loadUpdate" /><span v-if="!loadUpdate">
        Update
      </span>
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteInfo"
      v-if="isAdmin && info.info_id != null"
    >
      <BaseSpinner :isLoading="loadDelete" /><span v-if="!loadDelete">
        Delete
      </span>
    </BaseButton>
  </div>
</template>

<script>
import { setHeight } from '@/assets/utils.js';
import BaseSpinner from '../UI/BaseSpinner.vue';
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
      loadDelete: false,
      loadUpdate: false,
      loadCreate: false,
    };
  },
  mounted() {
    setHeight(this.$refs['info_header'], this.isAdmin, 40);
    setHeight(this.$refs['content'], this.isAdmin, 150);
  },
  methods: {
    async createInfo() {
      try {
        this.loadCreate = true;
        const newInfo = {
          info_header: this.editedInfo.info_header,
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
          this.loadCreate = false;
          alert('new info added');
          // clear content
          this.editedInfo.info_header = '';
          this.editedInfo.content = '';
          this.$emit('refresh');
        } else {
          this.loadCreate = false;
          alert('Failed to add a new info.');
        }
      } catch (error) {
        this.loadCreate = false;
        alert('Error adding a new info:', error);
      }
    },
    async saveChanges() {
      try {
        this.loadUpdate = true;
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
          this.loadUpdate = false;
          alert('Saved changes');
        } else {
          this.loadUpdate = false;
          alert('Failed to update info.');
        }
      } catch (error) {
        this.loadUpdate = false;
        alert('Error updating info:', error);
      }
    },
    async deleteInfo() {
      try {
        this.loadDelete = true;
        const response = await fetch(
          `${this.apiUrl}/info/${this.info.info_id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          this.loadDelete = false;
          alert('Deleted info');
          this.$emit('refresh');
        } else {
          this.loadDelete = false;
          alert('Failed to delete info.');
        }
      } catch (error) {
        this.loadDelete = false;
        alert('Error deleting info:', error);
      }
    },
  },
  components: { BaseSpinner },
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
  overflow: hidden;
}
textarea.info_header:disabled {
  color: $primary-color;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}
textarea.content:disabled {
  color: #000;
  font-family: Inika;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}
</style>
