<template>
        <div class="q-pa-md">

            <q-form class="comment-form">

                <div class="row">
    
                    <div class="col-8">

                        <q-input v-model="photoUrl" label="Add new url to photo"></q-input>

                    </div>

                    <div class="col-2">
                        <q-btn color="secondary" icon-right="send" type="submit" label="Add new photo" @click="this.addNewPhotoForPlace"/>
                    </div>
                </div>

            </q-form>

        </div>
</template>

<script>
import photoService from '@/services/photoService'
export default {
    name: "AddPhoto",
    props: {
        placeId: null,
    },
    data() {
        return {
        }
    },
    created() {

    },
    methods: {

        addNewPhotoForPlace() {
            photoService.addPhotoForPlace(this.$route.params.placeId, this.photoUrl)
            this.$router.go(0)
        },

    }

}
</script>

<style>

</style>