<template>

  <q-page class="q-pa-sm">

    <div class="q-page" v-if="place" flat bordered>

      <div class="row">
        <q-card-section>
          <div class="text-h6">{{ place.name }}</div>
        </q-card-section>
      </div>

      <div class="row">
        <div v-if="place.costToVisit"><strong>Koszt wizyty: </strong>{{place.costToVisit}} zł</div>
        <div v-else>Darmowy wstęp!</div>
      </div>

      <div class="row">
        <p><strong>Opis: </strong>{{place.descr}}</p>
      </div>

      <div class="row">
        <p><strong>Współrzędne: </strong>{{geoPosition}}</p>
      </div>

      <div class="row">
        <q-card-actions>
          <q-btn @click="showWeather" flat>Pogoda</q-btn>
          <q-btn @click="goToComments" flat>Komentarze</q-btn>
        </q-card-actions>
      </div>

      <div class="row">
        <q-table title="Photos for place"
                    :rows="photosForPlace"
                    :columns="columns"
                    row-key="id">

                    <template v-slot:body="props">

                        <q-tr :props="props">
                            <q-td>
                                <img :alt="props.row.url" :src="props.row.url">
                            </q-td>
                        </q-tr>

                    </template>

        </q-table>
      </div>

    </div>

    <div v-else>Brak miejsca w bazie</div>

    <div v-if="user !== null">
      <admin-panel-for-photos :user="user" :placeId="placeId"/>
    </div>

  </q-page>

</template>

<script>
  import placeService from "@/services/placeService";
  import userService from "@/services/userService"
  import photosForPlaceService from "../services/photoService"
  import AdminPanelForPhotos from "./admin/AdminPanelForPhotos"

  let columns = [
  {
    name: 'url',
    required: true,
    label: 'Photo',
    align: 'left',
    sortable: true
  }]

export default {
  name: "Place",
  components: {
    AdminPanelForPhotos
  },
  props: {
    placeId: {type: String}
  },
  emits: ['add-comment'],
  data() {
    return {
      place: null,
      photosForPlace: [],
      user: null,
      columns
    }
  },
  computed: {
    geoPosition() {
      return this.place.lat + ', ' + this.place.lon
    }
  },
  async created() {
    await this.getPlace(this.$route.params.placeId)
    this.place = JSON.parse(JSON.stringify(this.place))[0]
    this.user = await userService.getUserData();
    this.photosForPlace = await photosForPlaceService.getAllPhotosForPlace(this.$route.params.placeId)
    //this.photosForPlace = photosForPlace.map(p => {return p._id, p.url})
    console.log("PLACE")
    console.log(this.photosForPlace)
  },
  methods: {
    goToComments() {
      this.$router.push('/places/' + this.$route.params.placeId + '/comments')
    },
    async getPlace(id) {
      if (id) {
        this.place = await placeService.getPlaceById(id)
      }
    },
    showWeather() {
      alert("Będzie szero...będzie zimno...i będzie to trwało do końca waszych dni...")
    }
  }
}
</script>

<style scoped>
.my-card{
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>