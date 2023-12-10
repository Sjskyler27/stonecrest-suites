<template>
  <div>
    <span>
      <h2 v-if="isAdmin">ID: {{ editedAmenityType.type_id }}</h2>
      <textarea
        class="amenity_type_header"
        ref="amenity_type_header"
        v-model="editedAmenityType.type_name"
        :disabled="!isAdmin"
        rows="1"
      />
      <textarea
        class="content"
        ref="content"
        v-model="editedAmenityType.description"
        :disabled="!isAdmin"
        rows="1"
      ></textarea>
    </span>
    <!-- Create, Edit, and Delete buttons -->
    <BaseButton
      @click="createAmenity"
      v-if="isAdmin && amenityType.type_id == null"
    >
      <BaseSpinner :isLoading="loadCreate" /><span v-if="!loadCreate">
        Create
      </span>
    </BaseButton>
    <BaseButton
      @click="saveChanges"
      v-if="isAdmin && amenityType.type_id != null"
    >
      <BaseSpinner :isLoading="loadUpdate" /><span v-if="!loadUpdate">
        Update
      </span>
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteAmenity"
      v-if="isAdmin && amenityType.type_id != null"
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
    amenityType: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
      editedAmenityType:
        this.amenityType == false
          ? {
              type_id: 'Create New Info',
              type_name: '',
              description: '',
            }
          : {
              type_id: this.amenityType.type_id,
              type_name: this.amenityType.type_name,
              description: this.amenityType.description,
            },
      apiUrl: process.env.VUE_APP_API_URL,
      loadDelete: false,
      loadUpdate: false,
      loadCreate: false,
    };
  },
  mounted() {
    setHeight(this.$refs['amenity_type_header'], this.isAdmin, 40);
    setHeight(this.$refs['content'], this.isAdmin, 150);
  },
  methods: {
    async createAmenity() {
      try {
        this.loadCreate = true;
        const newAmenityType = {
          type_name: this.editedAmenityType.type_name,
          description: this.editedAmenityType.description,
        };
        const response = await fetch(`${this.apiUrl}/amenity-types`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAmenityType),
        });
        if (response.ok) {
          this.loadCreate = false;
          alert('new Amenity Type added');
          // clear content
          this.editedAmenityType.type_name = '';
          this.editedAmenityType.description = '';
          this.$emit('refresh');
        } else {
          this.loadCreate = false;
          alert('Failed to add a new amenity-types.');
        }
      } catch (error) {
        this.loadCreate = false;
        alert('Error adding a new amenity-types:', error);
      }
    },
    async saveChanges() {
      try {
        this.loadUpdate = true;
        const response = await fetch(
          `${this.apiUrl}/amenity-types/${this.editedAmenityType.type_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedAmenityType),
          }
        );
        if (response.ok) {
          // Data successfully updated
          this.loadUpdate = false;
          alert('Saved changes');
        } else {
          this.loadUpdate = false;
          alert('Failed to update amenity-types.');
        }
      } catch (error) {
        this.loadUpdate = false;
        alert('Error updating amenity-types:', error);
      }
    },
    async deleteAmenity() {
      try {
        this.loadDelete = true;
        const response = await fetch(
          `${this.apiUrl}/amenity-types/${this.amenityType.type_id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          this.loadDelete = false;
          alert('Deleted amenity-types');
          this.$emit('refresh');
        } else {
          this.loadDelete = false;
          alert('Failed to delete amenity-types.');
        }
      } catch (error) {
        this.loadDelete = false;
        alert('Error deleting amenity-types:', error);
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
textarea.amenity_type_header:disabled {
  color: $primary-color;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}
textarea.content:disabled {
  color: #000000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  overflow: hidden;
  margin-left: 9px;
}
</style>
