<template>
  <div>
    <div class="centered-container">
      <BasePageSpinner :isLoading="isLoading" />
      <h2>Create a new Room</h2>
      <BaseCard class="create-container">
        <RoomForm
          :room="false"
          :isAdmin="true"
          :locationList="locationList"
          @refresh="fetchRoomData"
        ></RoomForm>
      </BaseCard>
      <div v-if="location == null">
        <h2>Select a room type</h2>
        <div class="room-type">
          <!-- Radio buttons to select room type -->
          <label>
            <input type="radio" v-model="roomType" value="Office" />
            Office
          </label>
          <label>
            <input type="radio" v-model="roomType" value="Conference" />
            Conference
          </label>
        </div>
        <div
          v-for="location in locationList"
          :key="location"
          class="location-containers"
        >
          <BaseCard>
            <LocationForm
              :location="location"
              :isAdmin="false"
              @refresh="fetchLocationData"
              @locationSelected="handleLocationSelected"
            ></LocationForm>
          </BaseCard>
        </div>
      </div>
      <span v-if="location != null">
        <BaseButton
          @click="
            {
              {
                location = null;
              }
            }
          "
          >Change Location or Type</BaseButton
        >
        <h2>Showing {{ roomType }} Rooms at {{ selectedLocationName }}</h2>
        <div class="cards-wrapper">
          <div v-for="room in roomList" :key="room" class="room-containers">
            <BaseCard>
              <RoomForm
                :room="room"
                :locationList="locationList"
                :isAdmin="true"
                @refresh="fetchRoomData"
              ></RoomForm>
            </BaseCard>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import LocationForm from '@/components/forms/LocationForm.vue';
import RoomForm from '@/components/forms/RoomForm.vue';

export default {
  components: {
    RoomForm,
    LocationForm,
  },
  data() {
    return {
      roomList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
      locationList: [],
      location: null,
      roomType: 'Office',
    };
  },
  computed: {
    selectedLocationName() {
      const selectedLocation = this.locationList.find(
        location => location.location_id === this.location
      );
      return selectedLocation ? selectedLocation.location_name : '';
    },
  },
  watch: {
    // roomType: 'fetchRoomData', // Watch roomType and call fetchRoomData when it changes
    location: 'fetchRoomData',
  },
  created() {
    this.fetchRoomData();
    this.fetchLocationData();
  },
  methods: {
    handleLocationSelected(locationId) {
      this.location = locationId; // Update the location data property
      this.fetchRoomData(); // Fetch rooms for the updated location and room type
    },
    async fetchRoomData() {
      console.log(this.roomType, this.location);
      try {
        this.isLoading = true;
        const response = await fetch(
          this.apiUrl +
            `/rooms/filter/{location_id}/{room_type}?location_id=${this.location}&room_type=${this.roomType}`,
          {
            method: 'GET',
          }
        )
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            console.log(data);
            this.isLoading = false;
            this.roomList = data;
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching room data:', error);
      }
    },
    async fetchLocationData() {
      console.log('fetching locations');
      try {
        this.isLoading = true;
        const response = await fetch(this.apiUrl + '/locations', {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            this.locationList = data;
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching location data:', error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}
.room-containers {
  width: 300px;
}
.create-container {
  width: 300px;
}
.cards-wrapper {
  display: flex;
  flex-direction: column;
  columns: 2;
  align-items: center;
  text-align: center;
}

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.info-container {
  width: 300px;
}
.info-text {
  width: 280px;
}

.BaseCard {
  width: 280px;
}

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.location-containers {
  width: 300px;
}
.button {
  margin-top: 2px;
}
@media (min-width: 768px) {
  .cards-wrapper {
    display: grid;
    grid-template-columns: auto auto;
    align-items: normal;
  }
  .room-containers {
    margin: 10px;
  }
}
@media (min-width: 1250px) {
  .cards-wrapper {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: normal;
  }
  .room-containers {
    margin: 10px;
  }
}
</style>
