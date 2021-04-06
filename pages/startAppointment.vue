<template>
    <main>
        <span id='counter'>1</span>
        <h1>{{this.$route.query.dogName}}'s appointment for today.</h1>
        <h2>{{this.$route.query.time}}</h2>

        <div>Client email: {{this.$route.query.ownerEmail}}</div><br>
        
        <form action="">
            <label for="pickUpTime">Pick Up Time:</label>
            <input type="text" name='pickUpTime' v-model="pickUpTime"><br><br>

            <label for="beginActivityTime">Begin Activity Time:</label>
            <input type="text" name='beginActivityTime' v-model="beginActivityTime"><br><br>

            <label for="endActivityTime">End Activity Time:</label>
            <input type="text" name='endActivityTime' v-model="endActivityTime"><br><br>

            <label for="dropOffTime">Drop Off Time:</label>
            <input type="text" name='dropOffTime' v-model="dropOffTime"><br><br>

            <label for="photo">Add map</label>
            <input type="file" name="photo" @change="onFileSelected"><br><br>

            <!-- <div id='checkTimeDiff' @click="checkTimeDiff()">CHECK TIME DIFFERENCE</div> -->


            <span id='addDogBtn' @click="onAddMap">Add client's map and this session's appointment's to the database</span>
        </form>
        
    </main>
</template>


<script>
export default {


    // middleware: "auth",
    data() {
        return {
            pickUpTime: "",
            beginActivityTime: "",
            endActivityTime: "",
            dropOffTime: "",
            selectedFile: null,
           
        }
    },

    methods: {
        checkTimeDiff() {
            let pickUpMinutes;
            let pickUpHour = "" + `${this.pickUpTime}`.substring(0, 2);
            if (pickUpHour.charAt(1) == ":") { 
                pickUpHour = "0" + pickUpHour.charAt(0);
                pickUpMinutes = "" + `${this.pickUpTime}`.substring(2, 4);
            } else {
                pickUpMinutes = "" + `${this.pickUpTime}`.substring(3, 5);
            } 


            let dropOffMinutes;
            let dropOffHour = "" + `${this.dropOffTime}`.substring(0, 2);
            if (dropOffHour.charAt(1) == ":") { 
                dropOffHour = "0" + dropOffHour.charAt(0);
                dropOffMinutes = "" + `${this.dropOffTime}`.substring(2, 4);
            } else {
                dropOffMinutes = "" + `${this.dropOffTime}`.substring(3, 5);
            } 

            
            
            
            let beginActivityMinutes;
            let beginActivityHour = "" + `${this.beginActivityTime}`.substring(0, 2);
            if (beginActivityHour.charAt(1) == ":") { 
                beginActivityHour = "0" + beginActivityHour.charAt(0);
                beginActivityMinutes = "" + `${this.beginActivityTime}`.substring(2, 4);
            } else {
                beginActivityMinutes = "" + `${this.beginActivityTime}`.substring(3, 5);
            } 


            let endActivityMinutes;
            let endActivityHour = "" + `${this.endActivityTime}`.substring(0, 2);
            if (endActivityHour.charAt(1) == ":") { 
                endActivityHour = "0" + endActivityHour.charAt(0);
                endActivityMinutes = "" + `${this.endActivityTime}`.substring(2, 4);
            } else {
                endActivityMinutes = "" + `${this.endActivityTime}`.substring(3, 5);
            } 


            console.log("pick up hour", pickUpHour);
            console.log("pick up minutes", pickUpMinutes);

            console.log("drop off hour", dropOffHour);
            console.log("drop off minutes", dropOffMinutes);







            console.log("begin activity hour", beginActivityHour);
            console.log("begin activity minutes", beginActivityMinutes);

            console.log("end activity hour", endActivityHour);
            console.log("end activity minutes", endActivityMinutes);

            let totalAppointmentTime = `${dropOffHour - pickUpHour} hour ${dropOffMinutes - pickUpMinutes} minutes`
            let totalActivityTime = `${endActivityHour - beginActivityHour} hour ${endActivityMinutes - beginActivityMinutes} minutes`

            console.log("total appointment time:", totalAppointmentTime);
            console.log("total activity time:", totalActivityTime);

            // console.log("this.$route.params" , `${this.$route.params}`);

            // this.pickUpTime = "";
            // this.dropOffTime = "";
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },
        async onAddMap({ $axios }) {
            let data = new FormData();
            data.append("dogName", this.$route.query.dogName);
            data.append("ownerEmail", this.$route.query.ownerEmail);
            data.append("date", this.$route.query.date);
            data.append("time", this.$route.query.time);
            data.append("handlerEmail", this.$auth.$state.user.email);
            data.append("handlerName", this.$auth.$state.user.firstName + this.$auth.$state.user.lastName);
            data.append("handlerCellNumber", this.$auth.$state.user.cellNumber);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            data.append("pickUpTime", this.pickUpTime);
            data.append("beginActivityTime", this.beginActivityTime);
            data.append("endActivityTime", this.endActivityTime);
            data.append("dropOffTime", this.dropOffTime);

            let button =  document.getElementById("addDogBtn");
            button.style.opacity = "0";
            button.style.position = "absolute";
            button.style.top = "0";
            button.style.height = "0";
            button.style.width = "0";

            let result = await this.$axios.$post("/api/maps", data);

            this.$router.push("/profile"); 
        },
        doMapProcess() {
            if (document.getElementById("counter").innerHTML == 1) {
                this.beginGettingCoordinates();
            }
            
        },
        beginGettingCoordinates() {
            navigator.geolocation.getCurrentPosition(
                
                data => {
                    this.coordinates.push([data.coords.longitude, data.coords.latitude]);
                    this.window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
                },
                    
                error => {
                    console.log(error)
                },
                    
                {
                    enableHighAccuracy: true
                }    
            );
            this.doMapProcess();
            console.log("this/coords", this.coordinates);
        },
        finishGettingCoordinates() {
            console.log("finishing getting coordinates");
            document.getElementById("counter").innerHTML = 2;
            console.log("window.localStorage", window.localStorage)
        },


    
    mounted() {
        
    },
    created() {
        this.coordinates = [];
        console.log("wls",window.localStorage)
    }    
    }}
</script>

<style scoped>

#counter {
    position: absolute;
    top: 0;
    color: transparent;
}

.mapButton {
    padding: 5px;
    background-color: orange;
    border-radius: 10px;
    width: fit-content;
}

#addDogBtn {
    cursor: pointer;

}
</style>