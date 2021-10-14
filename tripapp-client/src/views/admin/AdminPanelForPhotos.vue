<template>
    <q-page v-if="this.user.role === 'admin'">
        <q-card-section horizontal>
            <span><h3>Admin panel</h3></span>
            
        </q-card-section>

        <q-separator />

        <q-card-section>
            <add-photo :placeId="placeId"/>
        </q-card-section>

        <q-separator />

        <q-card-section>
            <photo-url-list :photosForPlace="this.photosForPlace" />
        </q-card-section>

    </q-page>
</template>

<script>
import photoService from '@/services/photoService'
import PhotoUrlList from './PhotoUrlList'
import AddPhoto from './AddPhoto'

export default {
    name: "AdminPanelForPhotos",
    components: { PhotoUrlList, AddPhoto },
    props: {
        placeId: null,
        user: Object
    },
    data() {
        return {
            photosForPlace: [],
            //user: null
        }
    },
    async created() {
        this.photosForPlace = await this.getAllPhotosForPlace()
        console.log("Admin panel")
        console.log(this.photosForPlace)
    },
    methods: {

        async getAllPhotosForPlace() {
            return await photoService.getAllPhotosForPlace(this.$route.params.placeId)
        }
    }
}
</script>

<style>

</style>