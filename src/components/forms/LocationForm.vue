<template>
  <div>
    <span>
      <h2 v-if="isAdmin">Location ID: {{ editedLocation.location_id }}</h2>
      <input
        class="location_name"
        ref="location_name"
        v-model="editedLocation.location_name"
        :disabled="!isAdmin"
        placeholder="Location Name"
      />
      <input
        ref="address"
        v-model="editedLocation.address"
        :disabled="!isAdmin"
        placeholder="Address"
      />
      <input
        ref="city"
        v-model="editedLocation.city"
        :disabled="!isAdmin"
        placeholder="City"
      />
      <input
        ref="state"
        v-model="editedLocation.state"
        :disabled="!isAdmin"
        placeholder="State"
      />
      <input
        ref="postal_code"
        v-model="editedLocation.postal_code"
        :disabled="!isAdmin"
        placeholder="Postal Code"
      />
    </span>
    <!-- Select, Create, Edit, and Delete buttons -->
    <BaseButton
      @click="selectLocation"
      v-if="!isAdmin && location.location_id != null"
    >
      <BaseSpinner :isLoading="loadSelect" /><span v-if="!loadSelect">
        Select Location
      </span>
    </BaseButton>
    <BaseButton
      @click="createLocation"
      v-if="isAdmin && location.location_id == null"
    >
      <BaseSpinner :isLoading="loadCreate" /><span v-if="!loadCreate">
        Create Location
      </span>
    </BaseButton>
    <BaseButton
      @click="saveChanges"
      v-if="isAdmin && location.location_id != null"
    >
      <BaseSpinner :isLoading="loadUpdate" /><span v-if="!loadUpdate">
        Update Location
      </span>
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteLocation"
      v-if="isAdmin && location.location_id != null"
    >
      <BaseSpinner :isLoading="loadDelete" /><span v-if="!loadDelete">
        Delete Location
      </span>
    </BaseButton>
  </div>
</template>

<script>
import { setHeight } from '@/assets/utils.js';
import BaseSpinner from '../UI/BaseSpinner.vue';

export default {
  props: {
    location: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
      editedLocation:
        this.location == false
          ? {
              location_id: 'Create New Location',
              location_name: '',
              address: '',
              city: '',
              state: '',
              postal_code: '',
            }
          : {
              location_id: this.location.location_id,
              location_name: this.location.location_name,
              address: this.location.address,
              city: this.location.city,
              state: this.location.state,
              postal_code: this.location.postal_code,
            },
      apiUrl: process.env.VUE_APP_API_URL,
      loadDelete: false,
      loadUpdate: false,
      loadCreate: false,
      loadSelect: false,
    };
  },
  mounted() {
    setHeight(this.$refs['location_name'], this.isAdmin, 40);
    setHeight(this.$refs['address'], this.isAdmin, 40);
    setHeight(this.$refs['city'], this.isAdmin, 40);
    setHeight(this.$refs['state'], this.isAdmin, 40);
    setHeight(this.$refs['postal_code'], this.isAdmin, 40);
  },
  methods: {
    async createLocation() {
      try {
        this.loadCreate = true;
        const newLocation = {
          location_name: this.editedLocation.location_name,
          address: this.editedLocation.address,
          city: this.editedLocation.city,
          state: this.editedLocation.state,
          postal_code: this.editedLocation.postal_code,
        };
        const response = await fetch(`${this.apiUrl}/locations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLocation),
        });
        if (response.ok) {
          this.loadCreate = false;
          alert('New location added');
          // Clear content
          this.editedLocation.location_name = '';
          this.editedLocation.address = '';
          this.editedLocation.city = '';
          this.editedLocation.state = '';
          this.editedLocation.postal_code = '';
          this.$emit('refresh');
        } else {
          this.loadCreate = false;
          alert('Failed to add a new location.');
        }
      } catch (error) {
        this.loadCreate = false;
        alert('Error adding a new location:', error);
      }
    },
    async saveChanges() {
      try {
        this.loadUpdate = true;
        const response = await fetch(
          `${this.apiUrl}/locations/${this.editedLocation.location_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedLocation),
          }
        );
        if (response.ok) {
          this.loadUpdate = false;
          alert('Saved changes');
        } else {
          this.loadUpdate = false;
          alert('Failed to update location.');
        }
      } catch (error) {
        this.loadUpdate = false;
        alert('Error updating location:', error);
      }
    },
    async deleteLocation() {
      try {
        this.loadDelete = true;
        const response = await fetch(
          `${this.apiUrl}/locations/${this.location.location_id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          this.loadDelete = false;
          alert('Deleted location');
          this.$emit('refresh');
        } else {
          this.loadDelete = false;
          alert('Failed to delete location.');
        }
      } catch (error) {
        this.loadDelete = false;
        alert('Error deleting location:', error);
      }
    },
    selectLocation() {
      // Emit the selected location_id
      this.$emit('locationSelected', this.location.location_id);
    },
  },
  components: { BaseSpinner },
};
</script>

<style scoped lang="scss">
input {
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  border: 2px solid $primary-color;
  margin-bottom: 4px;
}

input:disabled {
  pointer-events: none; /* Disable mouse events */
  border: none;
  background-color: transparent;
  resize: none;
  overflow: hidden;
}

input.location_name:disabled {
  color: $primary-color;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}

/* Add styling for other input fields as needed */
</style>
