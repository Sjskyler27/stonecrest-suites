<template>
  <div>
    <span>
      <h2 v-if="isAdmin">ID: {{ editedAmenity.amenity_id }}</h2>
      <!-- <textarea
        class="amenity-type"
        ref="amenity-type"
        v-model="editedAmenity.type_id"
        :disabled="!isAdmin"
        rows="1"
      ></textarea> -->

      <select
        v-model="editedAmenity.type_id"
        :disabled="!isAdmin"
        class="amenity-type-dropdown"
      >
        <option
          v-for="type in amenityTypeList"
          :key="type"
          :value="type.type_id"
        >
          {{ type.type_name }}
        </option>
      </select>
      <h2>Location</h2>
      <div v-for="location in locationList" :key="location">
        <input
          type="radio"
          class=""
          :id="location.location_id"
          v-model="editedAmenity.location_id"
          :value="location.location_id"
          style="margin: 0px; width: 20%"
        />
        <label :for="'location_id' + location.location_id">{{
          location.location_name
        }}</label>
      </div>
    </span>
    <br />
    <!-- Create, Edit, and Delete buttons -->
    <BaseButton
      @click="createAmenity"
      v-if="isAdmin && amenity.amenity_id == null"
    >
      <BaseSpinner :isLoading="loadCreate" /><span v-if="!loadCreate">
        Create
      </span>
    </BaseButton>
    <BaseButton
      @click="saveChanges"
      v-if="isAdmin && amenity.amenity_id != null"
    >
      <BaseSpinner :isLoading="loadUpdate" /><span v-if="!loadUpdate">
        Update
      </span>
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteAmenity"
      v-if="isAdmin && amenity.amenity_id != null"
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
    amenity: Object,
    isAdmin: Boolean,
    locationList: Array,
    amenityTypeList: Array,
  },
  data() {
    return {
      editedAmenity:
        this.amenity == false
          ? {
              amenity_id: 'Create New Amenity',
              location_id: '',
              type_id: '',
            }
          : {
              amenity_id: this.amenity.amenity_id,
              location_id: this.amenity.location_id,
              type_id: this.amenity.type_id,
            },
      apiUrl: process.env.VUE_APP_API_URL,
      loadDelete: false,
      loadUpdate: false,
      loadCreate: false,
    };
  },
  mounted() {
    setHeight(this.$refs['amenity-type'], this.isAdmin, 40);
    setHeight(this.$refs['location-id'], this.isAdmin, 150);
  },
  methods: {
    async createAmenity() {
      try {
        this.loadCreate = true;
        const newAmenity = {
          location_id: this.editedAmenity.location_id,
          type_id: this.editedAmenity.type_id,
        };
        const response = await fetch(`${this.apiUrl}/amenities`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAmenity),
        });
        if (response.ok) {
          this.loadCreate = false;
          alert('New amenity added');
          // Clear content
          this.editedAmenity.location_id = '';
          this.editedAmenity.type_id = '';
          this.$emit('refresh');
        } else {
          alert('Failed to add a new amenity.');
        }
      } catch (error) {
        alert('Error adding a new amenity:', error);
      }
    },
    async saveChanges() {
      try {
        this.loadUpdate = true;
        const response = await fetch(
          `${this.apiUrl}/amenities/${this.editedAmenity.amenity_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedAmenity),
          }
        );
        if (response.ok) {
          // Data successfully updated
          this.loadUpdate = false;
          alert('Saved changes');
        } else {
          alert('Failed to update amenity.');
        }
      } catch (error) {
        alert('Error updating amenity:', error);
      }
    },
    async deleteAmenity() {
      try {
        this.loadDelete = true;
        const response = await fetch(
          `${this.apiUrl}/amenities/${this.amenity.amenity_id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          alert('Deleted amenity');
          this.$emit('refresh');
        } else {
          alert('Failed to delete amenity.');
        }
      } catch (error) {
        alert('Error deleting amenity:', error);
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

textarea.amenity-type:disabled,
textarea.location-id:disabled,
textarea.amenity-type:disabled {
  color: #000;
  font-family: Inika;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}
</style>
