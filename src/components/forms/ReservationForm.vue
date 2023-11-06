<template>
  <div>
    <span>
      <h2 v-if="isAdmin">ID: {{ editedReservation.reservation_id }}</h2>
      <input
        type="user-id"
        ref="user_id"
        v-model="editedReservation.user_id"
        :disabled="!isAdmin"
      />
      <input
        type="room-id"
        ref="room_id"
        v-model="editedReservation.room_id"
        :disabled="!isAdmin"
      />
      <input
        type="datetime-local"
        ref="start_time"
        v-model="editedReservation.start_time"
        :disabled="!isAdmin"
      />
      <input
        type="datetime-local"
        ref="end_time"
        v-model="editedReservation.end_time"
        :disabled="!isAdmin"
      />
      <input
        type="text"
        ref="status"
        v-model="editedReservation.status"
        :disabled="!isAdmin"
      />
    </span>
    <!-- Create, Edit, and Delete buttons -->
    <BaseButton
      @click="createReservation"
      v-if="isAdmin && reservation.reservation_id == null"
    >
      <BaseSpinner :isLoading="loadCreate" /><span v-if="!loadCreate">
        Create
      </span>
    </BaseButton>
    <BaseButton
      @click="saveChanges"
      v-if="isAdmin && reservation.reservation_id != null"
    >
      <BaseSpinner :isLoading="loadUpdate" /><span v-if="!loadUpdate">
        Update
      </span>
    </BaseButton>
    <BaseButton
      class="flat"
      @click="deleteReservation"
      v-if="isAdmin && reservation.reservation_id != null"
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
    reservation: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
      editedReservation:
        this.reservation == false
          ? {
              reservation_id: 'Create New Reservation',
              user_id: '',
              room_id: '',
              start_time: '',
              end_time: '',
              status: '',
            }
          : {
              reservation_id: this.reservation.reservation_id,
              user_id: this.reservation.user_id,
              room_id: this.reservation.room_id,
              start_time: this.reservation.start_time,
              end_time: this.reservation.end_time,
              status: this.reservation.status,
            },
      apiUrl: process.env.VUE_APP_API_URL,
      loadDelete: false,
      loadUpdate: false,
      loadCreate: false,
    };
  },
  mounted() {
    setHeight(this.$refs['start_time'], this.isAdmin, 40);
    setHeight(this.$refs['end_time'], this.isAdmin, 40);
    setHeight(this.$refs['status'], this.isAdmin, 40);
  },
  methods: {
    async createReservation() {
      try {
        this.loadCreate = true;
        const newReservation = {
          start_time: this.editedReservation.start_time,
          end_time: this.editedReservation.end_time,
          status: this.editedReservation.status,
        };
        const response = await fetch(`${this.apiUrl}/reservations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReservation),
        });
        if (response.ok) {
          this.loadCreate = false;
          alert('New reservation added');
          // clear content
          this.editedReservation.start_time = '';
          this.editedReservation.end_time = '';
          this.editedReservation.status = '';
          this.$emit('refresh');
        } else {
          this.loadCreate = false;
          alert('Failed to add a new reservation.');
        }
      } catch (error) {
        this.loadCreate = false;
        alert('Error adding a new reservation:', error);
      }
    },
    async saveChanges() {
      try {
        this.loadUpdate = true;
        const response = await fetch(
          `${this.apiUrl}/reservations/${this.editedReservation.reservation_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedReservation),
          }
        );
        if (response.ok) {
          this.loadUpdate = false;
          alert('Saved changes');
        } else {
          this.loadUpdate = false;
          alert('Failed to update reservation.');
        }
      } catch (error) {
        alert('Error updating reservation:', error);
      }
    },
    async deleteReservation() {
      try {
        this.loadDelete = true;
        const response = await fetch(
          `${this.apiUrl}/reservations/${this.reservation.reservation_id}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          this.loadDelete = false;
          alert('Deleted reservation');
          this.$emit('refresh');
        } else {
          this.loadDelete = false;
          alert('Failed to delete reservation.');
        }
      } catch (error) {
        this.loadDelete = false;
        alert('Error deleting reservation:', error);
      }
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
  border: 2px solid $primary-color;
}

input:disabled {
  color: $primary-color;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}

input:disabled {
  color: #000;
  font-family: Inika;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
}
</style>
