<template>
<div>
    <!-- <q-input
            filled
            v-model="username"
            label="Username *" />
        <q-input
            filled
            type="password"
            v-model="password"
            label="Password" />
        <div>
            <center>
                <q-btn
                label="Login"
                @click="btnLogin"
                color="primary" />
            </center>

        </div> -->

    <q-card class="my-card">
        <q-card-section >
            <q-input
            outlined
            v-model="username"
            label="Username *" />
        <q-input
            outlined
            type="password"
            v-model="password"
            label="Password" />
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
           <q-btn
                label="Login"
                @click="btnLogin"
                color="primary" />
        </q-card-actions>
    </q-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        btnLogin() {
            console.log('call')
            let user = {
                username: this.username,
                password: this.password
            }
            // Meteor.call('loginByPassword', user, function(err, result) {
            //     if (result) {
            //         console.log(result);
            //     }
            // });
            Meteor.loginWithPassword(this.username, this.password, error => {
                if (error) {
                    console.log(error)
                } else {
                    // this.$router.push('/admin')
                     console.log(Meteor.user())
                }
            })
        }
    }
}
</script>

<style>
.Login {
    margin: 30px;
}
</style>
