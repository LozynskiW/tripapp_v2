<template>
    <div>
        <div>
            <div> 
                <input v-model="username" placeholder="username" id="username"/>
            </div>
            <div> 
                <input v-model="password" placeholder="password" id="password"/>
            </div>
            <div>
                <button @click="sendUserData()">Log in</button>
            </div>
        </div>

    </div>
    
</template>

<script>

import axios from 'axios'

export default {

    name: 'Login',
    data () {
        return {
            
        }
    },
    created() {
    },
    methods: {
        async sendUserData() {
            let username = document.getElementById('username').value
            let password = document.getElementById('password').value

            await axios.post('/api/login', {
                data: {
                    username: username,
                    password: password 
                }
            })

            this.$router.go()
        }
    }
}
</script>

<style>

</style>