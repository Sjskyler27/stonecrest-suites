<template>
  <div>
    <h2 v-if="isAdmin">Room ID: {{ editedRoom.room_id }}</h2>
    <span>
      <input
        class="room-location_id"
        ref="room_location_id"
        v-model="editedRoom.location_id"
        :disabled="!isAdmin"
        placeholder="Room Location_ID"
      />
      <input
        class="room-name"
        ref="room_name"
        v-model="editedRoom.name"
        :disabled="!isAdmin"
        placeholder="Room Name"
      />
      <input
        class="room-type"
        ref="room_type"
        v-model="editedRoom.type"
        :disabled="!isAdmin"
        placeholder="Room Type"
      />
      <input
        class="room-capacity"
        ref="room_capacity"
        v-model="editedRoom.capacity"
        :disabled="!isAdmin"
        placeholder="Capacity"
      />
      <input
        class="room-square-feet"
        ref="room_square_feet"
        v-model="editedRoom.square_feet"
        :disabled="!isAdmin"
        placeholder="Square Feet"
      />
    </span>
    <textarea
      class="room-description"
      ref="room_description"
      v-model="editedRoom.description"
      :disabled="!isAdmin"
      placeholder="Description"
      rows="3"
    ></textarea>
    <textarea
      class="room-appliances"
      ref="room_appliances"
      v-model="editedRoom.appliances"
      :disabled="!isAdmin"
      placeholder="Appliances"
      rows="3"
    ></textarea>
    <input
      class="room-image-url"
      ref="room_image_url"
      v-model="editedRoom.image_url"
      :disabled="!isAdmin"
      placeholder="Image URL"
    />
    <input
      class="room-price"
      ref="room_price"
      v-model="editedRoom.price"
      :disabled="!isAdmin"
      placeholder="Price"
    />
    <BaseButton @click="createRoom" v-if="isAdmin && room.room_id == null">
      <BaseSpinner :isLoading="loadCreate" />
      <span v-if="!loadCreate">Create</span>
    </BaseButton>
    <BaseButton @click="saveChanges" v-if="isAdmin && room.room_id != null">
      <BaseSpinner :isLoading="loadUpdate" />
      <span v-if="!loadUpdate">Update</span>
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteRoom"
      v-if="isAdmin && room.room_id != null"
    >
      <BaseSpinner :isLoading="loadDelete" />
      <span v-if="!loadDelete">Delete</span>
    </BaseButton>
  </div>
</template>

<script>
import { setHeight } from '@/assets/utils.js';
import BaseSpinner from '../UI/BaseSpinner.vue';

export default {
  props: {
    room: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
      editedRoom:
        this.room == false
          ? {
              room_id: 'Create New Room',
              location_id: '',
              name: '',
              type: '',
              capacity: '',
              square_feet: '',
              description: '',
              appliances: '',
              image_url: '',
              price: '',
            }
          : {
              room_id: this.room.room_id,
              location_id: this.room.location_id,
              name: this.room.name,
              type: this.room.type,
              capacity: this.room.capacity,
              square_feet: this.room.square_feet,
              description: this.room.description,
              appliances: this.room.appliances,
              image_url: this.room.image_url,
              price: this.room.price,
            },
      apiUrl: process.env.VUE_APP_API_URL,
      loadDelete: false,
      loadUpdate: false,
      loadCreate: false,
    };
  },
  mounted() {
    setHeight(this.$refs['room_name'], this.isAdmin, 40);
    setHeight(this.$refs['room_type'], this.isAdmin, 40);
    setHeight(this.$refs['room_capacity'], this.isAdmin, 40);
    setHeight(this.$refs['room_square_feet'], this.isAdmin, 40);
    setHeight(this.$refs['room_description'], this.isAdmin, 150);
    setHeight(this.$refs['room_appliances'], this.isAdmin, 150);
    setHeight(this.$refs['room_image_url'], this.isAdmin, 40);
    setHeight(this.$refs['room_price'], this.isAdmin, 40);
  },
  methods: {
    async createRoom() {
      try {
        this.loadCreate = true;
        const newRoom = {
          name: this.editedRoom.name,
          type: this.editedRoom.type,
          capacity: this.editedRoom.capacity,
          square_feet: this.editedRoom.square_feet,
          description: this.editedRoom.description,
          appliances: this.editedRoom.appliances,
          image_url: this.editedRoom.image_url,
          price: this.editedRoom.price,
        };
        const response = await fetch(`${this.apiUrl}/rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRoom),
        });
        if (response.ok) {
          this.loadCreate = false;
          alert('New room added');
          // Clear content
          this.editedRoom.name = '';
          this.editedRoom.type = '';
          this.editedRoom.capacity = '';
          this.editedRoom.square_feet = '';
          this.editedRoom.description = '';
          this.editedRoom.appliances = '';
          this.editedRoom.image_url = '';
          this.editedRoom.price = '';
          this.$emit('refresh');
        } else {
          this.loadCreate = false;
          alert('Failed to add a new room.');
        }
      } catch (error) {
        this.loadCreate = false;
        alert('Error adding a new room:', error);
      }
    },
    async saveChanges() {
      try {
        this.loadUpdate = true;
        const response = await fetch(
          `${this.apiUrl}/rooms/${this.editedRoom.room_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedRoom),
          }
        );
        if (response.ok) {
          // Data successfully updated
          this.loadUpdate = false;
          alert('Saved changes');
        } else {
          this.loadUpdate = false;
          alert('Failed to update room.');
        }
      } catch (error) {
        this.loadUpdate = false;
        alert('Error updating room:', error);
      }
    },
    async deleteRoom() {
      try {
        this.loadDelete = true;
        const response = await fetch(
          `${this.apiUrl}/rooms/${this.room.room_id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          this.loadDelete = false;
          alert('Deleted room');
          this.$emit('refresh');
        } else {
          this.loadDelete = false;
          console.log(`${this.apiUrl}/rooms/${this.room.room_id}`, response);
          alert('Failed to delete room.');
        }
      } catch (error) {
        this.loadDelete = false;
        alert('Error deleting room:', error);
      }
    },
  },
  components: { BaseSpinner },
};
</script>

<style scoped lang="scss">
input,
textarea {
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  border: 2px solid $primary-color;
  margin-bottom: 6px;
}

input:disabled,
textarea:disabled {
  pointer-events: none; /* Disable mouse events */
  border: none;
  background-color: transparent;
  resize: none;
  overflow: hidden;
}

textarea.room-description:disabled,
textarea.room-appliances:disabled {
  color: #000;
  font-family: Inika;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}
</style>