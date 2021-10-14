<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <h4>Filtruj wyniki</h4>
    </div>
    <q-form>
        <div class="row">

            <div class="col-2">
              <q-input rounded outlined v-model="cityFilter" label="Miasto" />
            </div>

            <div class="col-2">
              <q-input rounded outlined v-model="nameFilter" label="Nazwa miejsca" />
            </div>

            <div class="col-2">
              <q-input rounded outlined v-model="priceFilter" label="Maksymalna cena" />
            </div>

            <div class="col-2">
              <q-input rounded outlined v-model="descFilter" label="Opis" />
            </div>

            <div class="col-1"></div>

            <div class="col-2">
              <q-btn color="secondary" label="Filtruj" @click="filterPlaces"/>
              <q-btn color="primary" label="Reset" @click="resetFilters"/>
            </div>

        </div>
    </q-form>
  

    <q-table title="Lista atrakcji"
        :filter="filter"
        :rows="placesToShow"
        :columns="columns"
        row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn color="primary" label="Pokaz" @click="goToPlace(props.row._id)" />
          </div>
        </q-td>
      </template>
    </q-table>

    <div class="row">
      <div class="col-8">

        <q-form v-if="user.role==='admin'">

          <div><h3>Admin panel</h3></div>
          <div><h3>Dodaj nowe miejsce</h3></div>

          <q-input outlined v-model="name" label="Name" />
          <q-input outlined v-model="description" label="Description" />
          <q-input outlined v-model="city" label="City" />
          <q-input outlined v-model="street" label="Street" />
          <q-input outlined v-model="lat" label="Latitude" />
          <q-input outlined v-model="lon" label="Longitude" />
          <q-input outlined v-model="costToVisit" label="Cost to visit" />
          <q-input outlined v-model="timeToVisit" label="Time to visit" />
          <q-btn color="primary" label="Dodaj miejsce" @click="addNewPlace()" />

        </q-form>

      </div>
    </div>
    
  </q-page>
  
</template>

<script>

import placeService from "@/services/placeService";
import userService from "@/services/userService";
import {filter, each} from 'underscore'

export default {
  name: "Places",
  data() {
    return {
      user: null,
      places: [],
      placesToShow: [],
      columns:[
        { name: 'name', label: 'Nazwa', field: 'name', align: 'left'},
        { name: 'costToVisit', label: 'Koszt wizyty', field: 'costToVisit', align: 'left'},
        { name: 'actions', align: 'right'}
      ],
      name: null,
      description: null,
      city: null,
      street: null,
      lat: null,
      lon: null,
      costToVisit: null,
      timeToVisit: null,
      cityFilter: null,
      nameFilter: null,
      priceFilter: null,
      descFilter: null
    }
  },
  props: {
    
  },
  async created() {
    this.getPlaces()
    this.user = await userService.getUserData();
    this.filterPlaces()

  },

  methods: {

    async getPlaces() {
      this.places = await placeService.getAllPlaces()
      this.placesToShow = this.places;
    },

    goToPlace(id) {
      this.$router.push('/places/' + id)
    },

    addNewPlace() {
      if(!this.name || !this.description || !this.city || !this.street || !this.lat || !this.lon || !this.costToVisit || !this.timeToVisit) {
        alert("Wszystkie pola powinny być uzupełnione")
      } else {
        let place = {
          name: this.name,
          description: this.description,
          city: this.city,
          street: this.street,
          lat: this.lat,
          lon: this.lon,
          costToVisit: this.costToVisit,
          timeToVisit: this.timeToVisit
        }

        placeService.addNewPlace(place);
      }
    },

    filterPlaces() {
      this.placesToShow = filter(this.places.data, p=>p)
      if(this.cityFilter) {
        this.placesToShow = each(this.placesToShow, p => console.log(p.city.includes(this.cityFilter)))
        this.placesToShow = filter(this.placesToShow, p => p.city === this.cityFilter)
      }

      if(this.nameFilter) {
        this.placesToShow = filter(this.placesToShow, p => p.name === this.nameFilter)
      }

      if(this.priceFilter) {
        this.placesToShow = filter(this.placesToShow, p => p.price <= this.priceFilter)
      }

      if(this.descFilter) {
        this.placesToShow = filter(this.placesToShow, p => p.description.includes(this.descFilter))
      }

    },

    resetFilters() {
      this.placesToShow = this.places
      this.cityFilter = null
      this.nameFilter = null
      this.priceFilter = null
      this.descFilter = null
      this.filterPlaces()
    }

  }
}
</script>

<style scoped>

</style>