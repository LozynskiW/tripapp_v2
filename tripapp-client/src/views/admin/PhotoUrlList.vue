<template>
    <div>

    <div v-if="photosForPlace !== undefined && photosForPlace.length > 0">
        <q-table title="Photos for place"
                    :grid="$q.screen.xs"
                    :rows="photosForPlace"
                    :columns="columns"
                    row-key="id">
                    

            <template v-slot:body="props">

                <q-tr :props="props">
                    <q-td>
                        <img :alt="props.row.name" :src="props.row.url">
                    </q-td>

                    <q-td>
                        <q-btn color="red-14" label="Delete" @click="deletePhoto(props.row._id)" />
                    </q-td>
                </q-tr>

            </template>
        </q-table>
    </div>

    <div v-else>
      <p> No photos for that place </p>
    </div>

  </div>
</template>

<script>
import photoService from '@/services/photoService'

const columns = [
  {
    name: 'url',
    required: true,
    label: 'Photo',
    align: 'left',
    sortable: true
  },
  { name: 'action', align: 'center', label: 'Actions', field: 'Action', sortable: false },
]

export default {
    name: "PhotoUrlList",
    components: {},
    props: {
        placeId: {type: String},
        photosForPlace: {type: Array}
    },
    data() {
        return {
            //photosForPlace: [],
            user: null,
            columns,
        }
    },

    created() {
       
    },

    methods: {
        async deletePhoto(photoId) { 
            await photoService.deletePhotoForPlace(photoId)
            this.$router.go(0)
        }
    }

}
</script>

<style>

</style>