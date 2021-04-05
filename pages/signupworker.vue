<template>
    <main>
        <span id='title'>Sign up to work here (employee)</span>
        
        <form id='container'>
            <label>First name</label>
            <input type="text" v-model="firstName">
            <label>Last name</label>
            <input type="text" v-model="lastName">
            <label>Email</label>
            <input type="email" v-model="email">
            <label>Password</label>
            <input type="password" v-model="password1">

            <label>Confirm password</label>
            <input type="password" v-model="password2">

            <label>Street address</label>
            <input type="text" v-model="streetAddress">
            <label>City/Town</label>
            <input type="text" v-model="cityAddress">
            <label>Zip Code</label>
            <input type="text" v-model="zipCode">
            <label>Cell #</label>
            <input type="text" v-model="cellNumber">
            <label>Landline (optional)</label>
            <input type="text" v-model="landLine">

            
            <span id='signupBtn' @click="onSignup">Create your account</span>
        </form>
        
    </main>
</template>

<script>
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password1: "",
            password2: "",
            streetAddress: "",
            cityAddress: "",
            zipCode: "",
            cellNumber: "",
            landLine: "",
            userType: "",

        }
    },
    methods: {
        async onSignup() {
            try {
                if (this.password1 != this.password2) {
                    alert("Passwords do not match. Make sure they do.")
                    return
                }
                
                
                let data = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password2,
                    streetAddress: this.streetAddress,
                    cityAddress: this.cityAddress,
                    zipCode: this.zipCode,
                    cellNumber: this.cellNumber,
                    landLine: this.landLine,
                    userType: "employee",

                };

                let button =  document.getElementById("signupBtn");
                button.style.opacity = "0";
                button.style.position = "absolute";
                button.style.top = "0";
                button.style.height = "0";
                button.style.width = "0";

                let response = await this.$axios.$post("/api/auth/signup", data);

                // let button =  document.getElementById("signupBtn");
                // button.disabled = "disabled";

                if (response.success) {
                    this.$auth.loginWith("local", {
                        data: {
                            email: this.email,
                            password: this.password2
                        }
                    });
                }
                this.$router.push("/");
            } catch (err) {
                console.log(err)
            }
        }
    }    
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
    font-size: 1.3em;
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
    /* height: 35px; */
    background: #f7b24a;
    color: black;
    border-radius: 10px;
    padding-right: 4px;
    padding-left: 4px;
    padding-top: 3px;
    padding-bottom: 2px;
    border: 2px solid black;
    margin: 10px auto;
    /* margin-bottom: 2px; */

}
</style>