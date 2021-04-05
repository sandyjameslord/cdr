<template>
    <main>
        <span id='title'>Log in </span>
        
        <form id='container'>
            <label>Email</label>
            <input type="email" v-model="email">
            <label>Password</label>
            <input type="password" v-model="password">

            <span id='signupBtn' @click="onLogin">Log in to your account</span>
        </form>
    </main>
</template>
<script>
export default {
    auth: "guest",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        async onLogin() {
            try {
                this.$auth.loginWith("local", { data: {
                    email: this.email,
                    password: this.password
                }});
                console.log('about to push to profile');
                this.$router.push("/");
            } catch (err) {
                
                console.log(err)
            }
        },
    },
}
</script>
<style scoped>

#container {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
}

label {
    font-size: 1.2em;
    margin-left: 5%;

}

#title {
    font-size: 2em;
    padding-top: 5px;
    margin-left: 5%;
    
}

#youNotDog {
    padding-bottom: 10px;
}

input {
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
}

#signupBtn {
    padding-top: 20px;
    cursor: pointer;
    margin-left: 5%;
    font-size: 2em;
    width: fit-content;
    background: #f7b24a;
    color: black;
    border-radius: 10px;
    padding-right: 4px;
    padding-left: 4px;
    padding-top: 3px;
    padding-bottom: 2px;
    border: 2px solid black;
    margin: 10px auto;
}
</style>