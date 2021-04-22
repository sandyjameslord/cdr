<template>
    <main>
        <div id="noSpaceContainer">
            <div id='noSpaceTime1'></div>
            <div id='noSpaceTime2'></div>
            <div id='noSpaceTime3'></div>
            <div id='noSpaceTime4'></div>
            <div id='noSpaceTime5'></div>
        </div>
        
        <div id='scheduleAppointmentTitle'>Schedule appointment</div>
        
        
            <div v-for="(dog) in dogs" :key="dog._id">
            <!-- <div v-for="(dog, index) in dogs" :key="dog._id">                 -->
                <!-- <div class='dogDisplay' v-if="(dog.ownerID == this.$route.query.ownerID)"> -->
                    <!-- <div v-if="(this.$route.query.dog == dog.dogName)"> -->
                        <div id='dogContainer'>
                            <img class='dogPhoto' :src="dog.photo" alt="">
                            <div class='dogName'>{{dog.dogName}}</div>
                        </div>  
                    <!-- </div>      -->
                <!-- </div> -->
        </div>
        
                   
        <form action="">

            <label>Date: </label>
            <input id='dateField' type="date" v-model="date" required pattern="\d{4}-\d{2}-\d{2}">

            <div id="timesContainer">
                <div id="time1" class='time'>7am - 9am</div>
                <div id="time2" class='time'>9am - 11am</div>
                <div id="time3" class='time'>11am - 1pm</div>
                <div id="time4" class='time'>1pm - 3pm</div>
                <div id="time5" class='time'>3pm - 5pm</div>
            </div>    

            <span id='addAppointmentBtn' @click="onAddAppointment">Add {{ this.$route.query.dog }}'s appointment</span>
        </form>
        
    </main>
</template>

<script>

export default {
    
    // middleware: "auth",
    updated() {
        this.timesTakenThisDate(this.date);
        // this.makeToday();
    },
    mounted() {
        this.makeToday();
    },
    created() {
        this.setInitialDate();
        // this.makeToday();
    },
    async asyncData({ $axios }) {
      try {
        let dogsResponse = await $axios.$get("/api/dogs");
        let appointmentsResponse = await $axios.$get("/api/appointments");

        return {
          dogs: dogsResponse.dogs,
          appointments: appointmentsResponse.appointments
        }
      } catch (err) {
        console.log(err.message)
      }
    },

    data() {      
        return {
            date: "",
            time: "",
        }
    },

    methods: {
        makeToday() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            today = yyyy+'-'+mm+'-'+dd;
            document.getElementById("dateField").setAttribute("min", today);
        },

        timesTakenThisDate(date) {
            try {
                this.time = "";
            } catch (err) {
                console.log(err);
            }
            let timesTaken = [];
            for (let i=0; i < this.appointments.length; i++) {
                let appt = this.appointments[i];
                if (appt.date == date) {
                    timesTaken.push(appt.time);
                }
            }
            let time1 = document.getElementById("time1");
            let time2 = document.getElementById("time2");
            let time3 = document.getElementById("time3");
            let time4 = document.getElementById("time4");
            let time5 = document.getElementById("time5");
            let times = [time1, time2, time3, time4, time5];
            for (let i = 0; i < times.length; i++) {
                times[i].innerHTML = "";
                times[i].style.cursor = "default";
                times[i].style.textDecoration = "initial";
                times[i].style.backgroundColor = "rgb(247, 173, 76)";
                times[i].style.border = "";
                try {
                    let x = i + 1;
                    times[i].removeEventListener("click", setTime(x))
                } catch (err) {
                    console.log(err);
                }
            }

            for (let i=0; i < timesTaken.length; i++) {
                let time = timesTaken[i];
                if (time.startsWith("7")) {
                    
                    time1.innerHTML = time
                    time1.style.textDecoration = "line-through";
                    time1.style.backgroundColor = "lightgray";
                    
                } else if (time.startsWith("9")) {
                    time2.innerHTML = time
                    time2.style.textDecoration = "line-through";
                    time2.style.backgroundColor = "lightgray";

                } else if (time.startsWith("11")) {
                    time3.innerHTML = time
                    time3.style.textDecoration = "line-through";
                    time3.style.backgroundColor = "lightgray";

                } else if (time.startsWith("1p")) {
                    time4.innerHTML = time
                    time4.style.textDecoration = "line-through";
                    time4.style.backgroundColor = "lightgray";

                } else if (time.startsWith("3")) {
                    time5.innerHTML = time
                    time5.style.textDecoration = "line-through";  
                    time5.style.backgroundColor = "lightgray";

                } 
            }

            for (let i = 0; i < times.length; i++) {
                console.log("times[i].innerHTML.length", times[i].innerHTML.length)
                
                if ((times[i].innerHTML == "") && (i == 0)) {
                    times[i].innerHTML = "7am - 9am";
                    times[i].style.cursor = "pointer";
                    // times[i].style.border = "2px solid black";
                    times[i].addEventListener("click", () => {this.setTime(1)})
                }
                if ((times[i].innerHTML == "") && (i == 1)) {
                    times[i].innerHTML = "9am - 11am";
                    times[i].style.cursor = "pointer";
                    // times[i].style.border = "2px solid black";
                    times[i].addEventListener("click", () => {this.setTime(2)})
                }
                if (times[i].innerHTML == "" && i == 2) {
                    times[i].innerHTML = "11am - 1pm";
                    times[i].style.cursor = "pointer";
                    // times[i].style.border = "2px solid black";
                    times[i].addEventListener("click", () => {this.setTime(3)})
                }
                if (times[i].innerHTML == "" && i == 3) {
                    times[i].innerHTML = "1pm - 3pm";
                    times[i].style.cursor = "pointer";
                    // times[i].style.border = "2px solid black";
                    times[i].addEventListener("click", () => {this.setTime(4)})
                }
                if (times[i].innerHTML == "" && i == 4) {
                    times[i].innerHTML = "3pm - 5pm";
                    times[i].style.cursor = "pointer";
                    // times[i].style.border = "2px solid black";
                    times[i].addEventListener("click", () => {this.setTime(5)})
                }
            }
            
            

        },
        setInitialDate() {
            this.date = " ";
            return this.date;
        },
        async onAddAppointment({ $axios }) {
            if (this.date == "" || this.time == "") {alert("Choose a date and time"); return}
            
            
            let data = new FormData();
            data.append("dogName", this.$route.query.dog);
            data.append("ownerEmail", this.$auth.$state.user.email);
            data.append("address", this.$auth.$state.user.streetAddress + ", " + this.$auth.$state.user.cityAddress + " " + this.$auth.$state.user.zipCode);
            data.append("cellNumber", this.$auth.$state.user.cellNumber);
            
            data.append("date", this.date);
            data.append("time", this.time);
            data.append("initialAppointment", false);

            data.append("confirmed", false);
            data.append("completed", false);
            data.append("handlerEmail", "employee@gmail.com");
            data.append("handlerName", "Sandy Lord");
            data.append("handlerCellNumber", "339-910-0000");
            
            let button =  document.getElementById("addAppointmentBtn");
            button.style.opacity = "0";
            button.style.position = "absolute";
            button.style.top = "0";
            button.style.height = "0";
            button.style.width = "0";


            let result = await this.$axios.$post("/api/appointments", data);

            // let button =  document.getElementById("addAppointmentBtn");
            // button.disabled = "disabled";



            this.$router.push("/profile"); 
        },
        setTime(buttonNumber) {
            let time1 = document.getElementById("time1");
            let time2 = document.getElementById("time2");
            let time3 = document.getElementById("time3");
            let time4 = document.getElementById("time4");
            let time5 = document.getElementById("time5");

            let times = [time1, time2, time3, time4, time5];
            for (let i = 0; i < times.length; i++) {
                times[i].style.border = "";
            }

// textDecoration = "line-through";

            if (buttonNumber == 1 && times[0].style.textDecoration != "line-through") {
                times[0].style.border = "2px solid black";
                this.time = "7am - 9am"; 
            }
            if (buttonNumber == 2 && times[1].style.textDecoration != "line-through") {
                times[1].style.border = "2px solid black";
                this.time = "9am - 11am";
            }
            if (buttonNumber == 3 && times[2].style.textDecoration != "line-through") {
                times[2].style.border = "2px solid black";
                this.time = "11am - 1pm"; 
            }
            if (buttonNumber == 4 && times[3].style.textDecoration != "line-through") {
                times[3].style.border = "2px solid black";
                this.time = "1pm - 3pm"; 
            }
            if (buttonNumber == 5 && times[4].style.textDecoration != "line-through") {
                times[4].style.border = "2px solid black";
                this.time = "3pm - 5pm"; 
            }
        },
    },
    mounted() {
        // let email = this.$route.query.ownerEmail;
        // // this.confirmedEmail = email;
        // console.log("in mounted, this.$route.query.ownerEmail", email);

        // let ownerEmails = [];

        // console.log("this.dogs", this.dogs)

        // for (let i = 0; i < this.dogs.length; i++) {
        //     let email = this.dogs[i].ownerEmail;
        //     ownerEmails.push(email);
        // }
        
        // let emailToPass = "";

        // for (let i = 0; i < ownerEmails.length; i++) {
        //     if (ownerEmails[i] == email) { 
        //         emailToPass = ownerEmails[i]
        //     }
        // }
        // this.emailToPass = emailToPass;

    },    
}
</script>

<style scoped>

body {
    padding: 1px;
}

.time {
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 1.0em;
    z-index: 2;
    height: 45px;
    background-color: rgb(247, 173, 76);
    width: 60px;
    box-sizing: border-box;
    border: 2px solid transparent;
    
}

.timeClosed {
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.0em;
    z-index: 2;
    height: 45px;
    background-color: rgb(247, 173, 76);
    width: 60px;
}

.timeOpen {
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.0em;
    z-index: 2;
    height: 45px;
    background-color: rgb(247, 173, 76);
    width: 60px;
}

#timesContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

#dogContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.dogPhoto {
    /* align-self: center; */
    /* padding-left: 10px; */
    /* padding-top: 10px; */
    /* margin-left: 50%; */
    /* margin-right: 50%; */
    flex-grow: 1;
    flex-shrink: 1;
    
    /* max-width: 700px; */
    /* margin: auto; */
}

.dogName {
    position: relative;
    top: -55px;
    left: 20px;
    background-color: rgb(247, 173, 76);
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.8em;
    z-index: 2;
    width: fit-content;
    height: 45px;
    white-space: pre;
}

#addAppointmentBtn {
    padding-top: 20px;
    cursor: pointer;
    margin-left: 5%;
    font-size: 1.4em;
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

#scheduleAppointmentTitle {
    margin: auto;
    text-align: center;
    font-size: 2em;
}

label {
    font-size: 1.2em;
    margin-left: 5%;
}

input {
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
}


form {
    display: flex;
    flex-direction: column;
}

#addAppointmentBtn {
    cursor: pointer;
}
</style>