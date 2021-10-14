<template>
    <div>
        
        <q-card class="my-card" v-if="this.user !== null" flat bordered>
            <p>Account: {{this.user.username}}</p>
            <p>Email: {{this.user.email}}</p>
            <p>Role: {{this.user.role}}</p>
        </q-card>

        <q-card v-else>

            <p> You need to log in to see your account details </p>

        </q-card>
    </div>
</template>

<script>

import userService from "@/services/userService";

export default {
    
    name: "UserData",


    data () {
        return {
            user: null,
        }
    },

    async mounted () {
        const user = await userService.getUserData();
        this.user = user
        console.log("type of user:", typeof this.user)
    },

}
</script>

<style>

</style>