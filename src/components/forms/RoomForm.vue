<template>
  <div>
    <h2>Room ID: {{ editedRoom.room_id }}</h2>
    <span>
      <label for="room_location_id" v-if="isAdmin">Location:</label>
      <div v-if="isAdmin">
        <template v-for="location in locationList" :key="location">
          <div class="columns">
            <label :for="'location_id' + location.location_id">{{
              location.location_name
            }}</label>
            <input
              type="radio"
              class="room-location_id"
              :id="location.location_id"
              v-model="editedRoom.location_id"
              :value="location.location_id"
              style="margin: 0px; width: 20%"
            />
          </div>
        </template>
      </div>
      <label for="room-image-url" v-if="isAdmin">Image URL:</label>
      <input
        v-if="isAdmin"
        class="room-image-url"
        ref="room_image_url"
        v-model="editedRoom.image_url"
        :disabled="!isAdmin"
        placeholder="Image URL"
        id="room-image-url"
      />
      <img :src="room.image_url" alt="Room Image" class="room-image" />
      <label for="room-name" v-if="isAdmin">Room Name:</label>
      <input
        class="room-name"
        ref="room_name"
        v-model="editedRoom.name"
        :disabled="!isAdmin"
        placeholder="Room Name"
        id="room-name"
      />
      <div v-if="isAdmin">
        <label for="room-type">Room Type:</label>
        <div>
          <label>
            Conference
            <input
              type="radio"
              v-model="editedRoom.type"
              value="Conference"
              name="room-type"
              style="margin: 0px; width: 20%"
            />
          </label>
        </div>
        <div>
          <label>
            Office
            <input
              type="radio"
              v-model="editedRoom.type"
              value="Office"
              name="room-type"
              style="margin: 0px; width: 20%"
            />
          </label>
        </div>
        <span class="columns">
          <label for="room-capacity">Capacity:</label>
          <input
            class="room-capacity"
            ref="room_capacity"
            v-model="editedRoom.capacity"
            :disabled="!isAdmin"
            placeholder="Capacity"
            id="room-capacity"
          />
        </span>
      </div>
      <span class="columns">
        <label for="room-square-feet">Square Feet:</label>
        <input
          class="room-square-feet"
          ref="room_square_feet"
          v-model="editedRoom.square_feet"
          :disabled="!isAdmin"
          placeholder="Square Feet"
          id="room-square-feet"
        />
      </span>
      <label for="room-description" v-if="isAdmin">Description:</label>
      <textarea
        class="room-description"
        ref="room_description"
        v-model="editedRoom.description"
        :disabled="!isAdmin"
        placeholder="Description"
        rows="2"
        id="room-description"
        v-if="isAdmin || !isAdmin & (this.editedRoom.description != '')"
      ></textarea>
      <label for="room-appliances">Appliances:</label>
      <textarea
        class="room-appliances"
        ref="room_appliances"
        v-model="editedRoom.appliances"
        :disabled="!isAdmin"
        placeholder="Appliances"
        rows="2"
        id="room-appliances"
      ></textarea>
      <span class="columns">
        <label for="room-price">Price:</label>
        <input
          class="room-price"
          ref="room_price"
          v-model="editedRoom.price"
          :disabled="!isAdmin"
          placeholder="Price"
          id="room-price"
        />
      </span>
    </span>

    <span>
      <ConferenceCalendar
        v-if="!isAdmin && room.room_id != null && type == 'Conference'"
        :roomId="room.room_id"
        :day="day"
        @selectedTimeRange="handleSelectedTimeRange"
      ></ConferenceCalendar>
    </span>
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
import ConferenceCalendar from '../UI/ConferenceCalendar.vue';

export default {
  props: {
    room: Object,
    locationList: Array,
    isAdmin: Boolean,
    day: Date,
    type: String,
  },
  data() {
    return {
      editedRoom:
        this.room == false
          ? {
              room_id: 'Create New Room',
              location_id: '0',
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
      loadRoom: false,
    };
  },
  mounted() {
    setHeight(this.$refs['room_name'], this.isAdmin, 40);
    setHeight(this.$refs['room_capacity'], this.isAdmin, 40);
    setHeight(this.$refs['room_square_feet'], this.isAdmin, 40);
    setHeight(this.$refs['room_description'], this.isAdmin, 100);
    setHeight(this.$refs['room_appliances'], this.isAdmin, 100);
    setHeight(this.$refs['room_image_url'], this.isAdmin, 40);
    setHeight(this.$refs['room_price'], this.isAdmin, 40);
  },
  methods: {
    async createRoom() {
      console.log('posting: ', this.editedRoom);
      try {
        this.loadCreate = true;
        const newRoom = {
          name: this.editedRoom.name,
          location_id: this.editedRoom.location_id,
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
          (this.editedRoom.location_id = '0'), (this.editedRoom.type = '');
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
          this.$emit('refresh');
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
    handleSelectedTimeRange(startTime, endTime) {
      console.log('Received start time:', startTime);

      console.log('Received end time:', endTime);
      window.location.href = `../checkout?startTime=${startTime}&endTime=${endTime}&room_id=${this.room.room_id}`;

      // console.log('now', this.$router.currentRoute);
      // not sure why $router is not working
      // this.$router.push({
      //   name: 'checkout',
      //   // params: {
      //   //   startTime: timeRange.startTime,
      //   //   endTime: timeRange.endTime,
      //   //   roomId: this.room.room_id,
      //   // },
      // });
      // console.log('new', this.$router.currentRoute);
    },
  },
  components: { BaseSpinner, ConferenceCalendar },
};
</script>
<style scoped lang="scss">
.columns {
  display: flex;
  align-items: center; // This vertically aligns the label and input
  justify-content: flex-start; // This aligns the label and input to the left
}
.columns.textarea {
  margin: 0px;
}
.radios {
  display: grid;
  align-items: left;
  justify-content: left;
}
.radios.input {
  margin-right: 20px;
  margin-bottom: 0px;
}

label {
  margin-right: 8px; // Adds some space between the label and the input
  white-space: nowrap; // Prevents the label from wrapping
}

input,
textarea {
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  border: 2px solid $primary-color;
  padding: 8px;
  margin-top: 6px;
  margin-bottom: 6px;
}

input:disabled,
textarea:disabled {
  pointer-events: none; /* Disable mouse events */
  border: 1px solid rgb(255, 255, 255);
  background-color: #fff;
  resize: none;
  overflow: hidden;
  margin-bottom: 0px;
}

textarea.room-description:disabled,
textarea.room-appliances:disabled {
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  overflow: hidden;
  background-color: #fff;
}

input.room-name:disabled {
  color: $primary-color;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  overflow: hidden;
  background-color: #fff;
}
.room-image {
  width: 268px;
}
</style>
