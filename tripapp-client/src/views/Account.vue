<template>
    <div>
        <q-card class="my-card" v-if="this.user === null" flat bordered>
            <login/>
        </q-card>
        <div v-else>
            <h3>Welcome {{this.user.username}}</h3>
            <user-data :user = "user"/>
        </div>
            
    </div>
</template>

<script>

import Login from '@/views/Login';
import userService from "@/services/userService";
import UserData from '@/views/UserData';

export default {
    
    name: "Account",
    components: {Login, UserData},

    async created() {
        const user = await userService.getUserData();
        this.user = user
    },
    data () {
        return {
            user: null,
        }
    },

}
</script>

<style>

</style>