<template>
    <main>
        
        
        <div id="userInfo">               
            <span class='user-class' id='userName'>Name: {{ $auth.$state.user.firstName + " " + $auth.$state.user.lastName }}</span>
            <span class='user-class' id='userEmail'>Email / Login: {{ $auth.$state.user.email }}</span>
            <span class='user-class' id='userAddress'>Address: {{ $auth.$state.user.streetAddress + ", " + $auth.$state.user.cityAddress + ", MA " + $auth.$state.user.zipCode}}</span>
            <span class='user-class' id='userCellNumber'>Cell #: {{ $auth.$state.user.cellNumber }}</span>
            <span class='user-class' id='userlandLine'>Land line: {{ $auth.$state.user.landLine }}</span>
            <span class='horizontalSeparatorBlue'></span>
        </div>

        <hr>
        <br>

        <div v-if="$auth.$state.user.userType == 'client'">
            <div id='topContainer'>
                <div id="myDogOrMyDogs">My Dogs</div>
                <span id="addDog"><nuxt-link to="/addDog"> Add a dog!</nuxt-link></span>
            </div>
            
            <br>
            <div id='dogsPictureAndNameContainer'>
                
                

            </div>
            <br>
            <div id='today'>Today's Appointments</div>
            <div id='todaysDate' style="font-size: 1.2em;">({{getAmericanEnglishDate("")}})</div><br>
            <div id="todaysAppointmentsPerDogContainer"></div><br><br>

            <div id='next'>Future Appointments</div><br>
            <div id="nextAppointmentPerDogContainer"></div><br>

        </div>

            <!-- <div id="upcomingAppointmentsButton"><nuxt-link to='todaysAppointments'> Today's appointments</nuxt-link></div> -->
        
        <div v-else-if="$auth.$state.user.userType == 'employee'">
            
            <div class='title'>Today's Appointments</div>
            <div v-for="(appt) in appointments" :key="appt._id">
                
                <div v-if="appt.date == getNow()">
                    <div v-if="appt.handlerEmail == $auth.$state.user.email">
                        <div>Dog: {{appt.dogName}}</div>
                        <div>Time: {{appt.time}}</div>
                        <div>Location: {{appt.address}}</div>
                        <div>Owner Email:{{appt.ownerEmail}}</div>
                        <div><nuxt-link :to="{ path: 'startAppointment', query: { dogName: `${appt.dogName}`, ownerEmail: `${appt.ownerEmail}`, date: `${appt.date}`, time: `${appt.time}` }}">Start {{appt.dogName}}'s appointment.</nuxt-link></div>
                        <!-- <div>If there is a map of this appointment just below, it has been completed. Great!</div> -->
                        <div v-for="(map) in maps" :key="map._id">
                            <div v-if="map.date == getNow() && map.dogName == appt.dogName">
                                <img :src="map.photo" style="height:75px; width:75px; object-fit: cover;" alt="">
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div class='title'>Future Appointments</div>


            <div v-for="(appt) in appointments" :key="appt._id">
                
                <div v-if="appt.date > getNow()">
                    <div v-if="appt.handlerEmail == $auth.$state.user.email">
                        <div>{{appt.dogName}} at {{appt.time}} at {{appt.address}} on {{appt.date}}.</div>
                    </div>
                </div>
            </div>

            <div class='title'>Previous Appointments</div>
            
            
            
            
            
            <div id='showPrevApptsQ' @click="showPrevAppts()"> Show Previous Appointments?</div>

            <div id='prevApptContainer'>

                <div v-for="(appt) in appointments" :key="appt._id">
                    <div v-if="appt.date < getNow()" >
                        <div v-if="appt.handlerEmail == $auth.$state.user.email">
                            <div class='previAppts'>{{appt.dogName}} at {{appt.time}} at {{appt.address}} on {{appt.date}}.</div>
                            <div v-for="(map) in maps" :key="map._id">
                                <div v-if="map.date == appt.date && map.dogName == appt.dogName">
                                    <img :src="map.photo" style="height:75px; width:75px; object-fit: cover;" alt="">
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        
        </div>  
        <br>
    </main>
</template>

<script>

export default {
    // middleware: "auth",
    data() {
        return {
            dogName: "",
            ownerEmail: "",
            approved: ""
        }
    },
    async asyncData({ $axios }) {
      try {
        let dogsResponse = await $axios.$get("/api/dogs");
        let appointmentsResponse = await $axios.$get("/api/appointments");
        let mapsResponse = await $axios.$get("/api/maps");

        return {
          dogs: dogsResponse.dogs,
          appointments: appointmentsResponse.appointments,
          maps: mapsResponse.maps,
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    methods: {
        showPrevAppts() {
            let showPrevApptsQ = document.getElementById('showPrevApptsQ');
            showPrevApptsQ.style.visibility = "hidden";
            
            let prevApptCont = document.getElementById("prevApptContainer");
            prevApptCont.style.visibility = "visible";

            
            
        },
        showThisClientsDogs() {
            let container = document.getElementById("dogsPictureAndNameContainer");
             
            
            for (let i = 0; i< this.dogs.length; i++) {
                // console.log("clients diogs should be here",this.dogs[i])
                if (this.dogs[i].ownerEmail == this.$auth.$state.user.email){
                    let newNode = document.createElement("div");
                    
                    let newDogName = document.createElement("div");
                    let newDogImage = document.createElement("img");

                    newDogName.innerHTML = this.dogs[i].dogName.slice(0, 12);
                    newDogName.style.color = "green";
                    newDogName.style.fontSize = "1.3em";
                    newDogName.style.textAlign = "center";
                    newDogImage.src = this.dogs[i].photo;
                    
                    newDogImage.style.width = "150px";
                    newDogImage.style.height = "150px";



                    newDogImage.style.objectFit = "cover";
                    newDogImage.style.transform = "translateX(6px)";

                    newDogImage.style.border = "2px solid black";

                    newDogImage.style.flexGrow = "1";
                    newDogImage.style.flexShrink = "1";
                    
                    let dogProfileLink = document.createElement("a");
                    dogProfileLink.appendChild(newDogImage);
                    dogProfileLink.setAttribute('href', `/dogProfile?dog=${this.dogs[i].dogName}`);

                    let newLinkToScheduleAppointmentPage = document.createElement("div");
                    newLinkToScheduleAppointmentPage.className = 'sched';
                    newLinkToScheduleAppointmentPage.innerHTML = `Add Appt for ${(this.dogs[i].dogName).slice(0, 7)}`;
                    newLinkToScheduleAppointmentPage.style.cursor = "pointer"; 
                    newLinkToScheduleAppointmentPage.style.textAlign = "center";
                    newLinkToScheduleAppointmentPage.style.borderRadius = "10px";
                    newLinkToScheduleAppointmentPage.style.border = "2px solid black";
                    newLinkToScheduleAppointmentPage.style.padding = "2px 4px";

                    newLinkToScheduleAppointmentPage.style.marginBottom = "30px";
                    newLinkToScheduleAppointmentPage.style.backgroundColor = "#f7b24a";




    // padding-right: 4px;
    // padding-left: 4px;
    // padding-top: 3px;
    // padding-bottom: 2px;
    // border: 2px solid black;
    // margin: 10px auto;












                    let lnk = document.createElement("a");
                    lnk.appendChild(newLinkToScheduleAppointmentPage);
                    lnk.setAttribute('href', `/scheduleAppointment?dog=${this.dogs[i].dogName}`);
                    








                    // let lnk = document.createElement("nuxt-link");
                    // lnk.appendChild(newLinkToScheduleAppointmentPage);



                    // <div><nuxt-link :to="{ path: 'startAppointment', query: { dogName: `${appt.dogName}`, ownerEmail: `${appt.ownerEmail}`, date: `${appt.date}`, time: `${appt.time}` }}">Start {{appt.dogName}}'s appointment.</nuxt-link></div>

                    // console.log("attempting to go to scheduleAppointment");
                    // lnk.setAttribute(':to', `{ path: 'scheduleAppointment', query: {dogName: ${this.dogs[i].dogName}}}`);
                    //  ")             `/scheduleAppointment?dog=${this.dogs[i].dogName}`);






















                    newNode.appendChild(dogProfileLink);
                    newNode.appendChild(newDogName);
                    newNode.appendChild(lnk);
                    // newNode.appendChild(newDogName);
                    

                    newNode.style.display = "flex";
                    newNode.style.flexDirection = "column";
                    
                    container.appendChild(newNode);
                }
                
                // let newNode = document.createElement("div");
                
                // let newDogName = document.createElement("div");
                // let newDogImage = document.createElement("img");

                // newDogName.innerHTML = this.dogs[i].dogName;
                // newDogImage.src = this.dogs[i].photo;
                // newDogImage.style.minWidth = "100px";
                // newDogImage.style.maxWidth = "150px";

                // newDogImage.style.minHeight = "100px";
                // newDogImage.style.maxHeight = "150px";

                // newDogImage.style.objectFit = "cover";

                // newDogImage.style.flexGrow = "1";
                // newDogImage.style.flexShrink = "1";
                
                // let dogProfileLink = document.createElement("a");
                // dogProfileLink.appendChild(newDogImage);
                // dogProfileLink.setAttribute('href', `/dogProfile?dog=${this.dogs[i].dogName}`);

                // let newLinkToScheduleAppointmentPage = document.createElement("div");
                // newLinkToScheduleAppointmentPage.className = 'sched';
                // newLinkToScheduleAppointmentPage.innerHTML = "-- +AddAppt --";

                // let lnk = document.createElement("a");
                // lnk.appendChild(newLinkToScheduleAppointmentPage);
                // lnk.setAttribute('href', `/scheduleAppointment?dog=${this.dogs[i].dogName}`);
                
                // newNode.appendChild(dogProfileLink);
                // newNode.appendChild(lnk);
                // newNode.appendChild(newDogName);
                

                // newNode.style.display = "flex";
                // newNode.style.flexDirection = "column";
                
                // container.appendChild(newNode);
            }
        },
 

        showTodaysAppointments() {
            let container = document.getElementById("todaysAppointmentsPerDogContainer");

            for (let i = 0; i < this.dogs.length; i++) {
                let dog = this.dogs[i];
                // console.log("dog" + i,dog)
                let newNode = document.createElement("div");
                newNode.style.display = "flex";
                newNode.style.flexDirection = "row";

                for (let j = 0; j < this.appointments.length; j++) {
                    let appointment = this.appointments[j];
                    if (appointment.dogName == dog.dogName) {
                        if (appointment.date == this.getNow()) {
                            if (appointment.ownerEmail == this.$auth.$state.user.email) {
                            // console.log("appt today");
                                let newTodayAppointment = document.createElement("div");
                                let newDogName = document.createElement("div");
                                newTodayAppointment.innerHTML = appointment.time;
                                newDogName.innerHTML = appointment.dogName + " with " + appointment.handlerName + " from " + " ";
                                newDogName.style.whiteSpace = "pre";
                                newDogName.style.marginLeft = "5%";

                                newNode.appendChild(newDogName);
                                newNode.appendChild(newTodayAppointment);
                            }
                        }

                        // console.log(`${dog.dogName} has an appointment on ${appointment.date} at ${appointment.time}`);
                    }
                }
                container.appendChild(newNode);

            }
        },
        showNextAppointments() {
            let container = document.getElementById("nextAppointmentPerDogContainer");
            // let addBreak = document.createElement("br");

            for (let i = 0; i < this.dogs.length; i++) {
                let dog = this.dogs[i];
                
                let newNode = document.createElement("div");
                newNode.style.display = "flex";
                newNode.style.flexDirection = "column";

                for (let j = 0; j < this.appointments.length; j++) {
                    let appointment = this.appointments[j];
                    if (appointment.dogName == dog.dogName) {
                        if (appointment.date > this.getNow()) {
                            if (appointment.ownerEmail == this.$auth.$state.user.email) {
                            // console.log("next appointment", appointment.date);
                                let nextAppointment = document.createElement("div");
                                let newDogName = document.createElement("div");
                                nextAppointment.innerHTML = `${appointment.time} on ${this.getAmericanEnglishDate(appointment.date)}`;
                                nextAppointment.style.marginLeft = "5%";
                                newDogName.innerHTML = appointment.dogName;
                                newDogName.style.marginLeft = "5%";
                                newDogName.style.fontSize = "1.3em";
                                newNode.appendChild(newDogName);
                                // newNode.appendChild(document.createElement("br"));
                                newNode.appendChild(nextAppointment);
                                newNode.appendChild(document.createElement("br"));
                                // newNode.appendChild(addBreak);
                                
                                container.appendChild(newNode);
                                // break
                            }
                        }

                        // console.log(`${dog.dogName} has an appointment on ${appointment.date} at ${appointment.time}`);
                    } 
                    // else {
                    //     let nextAppointment = document.createElement("div");
                    //     let newDogName = document.createElement("div");
                    //     nextAppointment.innerHTML = " " + "has no scheduled upcoming appointments";
                    //     newDogName.innerHTML = dog.dogName;
                    //     newNode.appendChild(newDogName);
                    //     newNode.appendChild(nextAppointment);
                    //     // newNode.appendChild(addBreak);
                        
                    //     container.appendChild(newNode);
                    //     break
                    // }
                }

                // container.appendChild(newNode);

            }
        },

        getAmericanEnglishDate(datum) {
            let date = datum; 
            
            if (date == "") {date= this.getNow();}
            // console.log(date);

            let year = date.substring(0, 4);
            let month = date.substring(5, 7);
            let day = date.substring(8, 10);

            let aeDate = "";

            if (month == "01") {aeDate += "January "}
            else if (month == "02") {aeDate += "February "}
            else if (month == "03") {aeDate += "March "}
            else if (month == "04") {aeDate += "April "}
            else if (month == "05") {aeDate += "May "}
            else if (month == "06") {aeDate += "June "}
            else if (month == "07") {aeDate += "July "}
            else if (month == "08") {aeDate += "August "}
            else if (month == "09") {aeDate += "September "}
            else if (month == "10") {aeDate += "October "}
            else if (month == "11") {aeDate += "November "}
            else if (month == "12") {aeDate += "December "}

            aeDate += day + ", ";
            aeDate += year;

            return aeDate;
        },
        getNow() {
            const today = new Date();
            
            const year  = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            

            if (month < 10) {month = "" + "0" + month}
            if (day < 10) {day = "" + "0" + day}

            const date = year + "-" + month + "-" + day;

            return date;
        },
        determineHowManyDogs(dogs) {
            let count = 0;
            for (let i = 0; i < dogs.length; i++) {

                if (dogs[i].ownerEmail == this.$auth.$state.user.email) {
                    count++;
                }
                
            }
            if (count == 1) {
                let myDogOrMyDogs = document.getElementById("myDogOrMyDogs");
                myDogOrMyDogs.innerHTML = "My Dog"
            }
        },
    },

    mounted() {
        if (this.$auth.$state.user.userType == "client") {this.determineHowManyDogs(this.dogs)}
        if (this.$auth.$state.user.userType == "client") {this.showThisClientsDogs()}
        if (this.$auth.$state.user.userType == "client") {this.showTodaysAppointments()}
        if (this.$auth.$state.user.userType == "client") {this.showNextAppointments()}    
    }

}
</script>

<style scoped>
#todaysDate {
    margin-left: 5%;
}
.user-class {
    padding-left: 10px;
    font-size: 1.3em;
}

.title {
    font-size: 2em;
}

#prevApptContainer {
    visibility: collapse;
}

#topContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#addDog {
    /* box-shadow: 1em 0 .4em black; */
    font-size: 1.5em;
    color: black;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;
    background-color: #f7b24a;
    padding: 2px 4px;
    border: 1px solid black;
    margin-right: 5%;

    /* background-color: rgba(111,111,111,0.2); */
    /* border-radius: 10px; */
    /* text-shadow: -1px 5px 3px rgba(255,255,255,1); */
}

#myDogOrMyDogs {
    font-size: 1.5em;
    border-bottom: 4px solid #f7b24a;
    /* box-shadow: -1em 0 .4em black; */
    margin-left: 5%;
    /* text-shadow: -1px 5px 3px rgba(255,255,255,1); */
}

* {
    margin: 0;
    /* padding: 1px; */

}
body {
    background-color: transparent;
    padding: 1px;
}

#today, #next {
    margin-left: 5%;
    margin-bottom: 10px;
    font-size: 1.5em;
    border-bottom: 4px solid #f7b24a;
    /* box-shadow: -1em 0 .4em black; */
    width:fit-content;
}

main {
    background-color: transparent;
}

nuxt-link {
    cursor: pointer;
    color: black;
}

/* img {
    object-fit: cover;
    height: 340px;
    width:340px;
    max-width: 100%;
    height: auto;
    padding: 0;
} */

#userInfo {
    display: flex;
    flex-direction: column;
}

.smallMap {
    object-fit: cover;
    width: 100px;
    height: 100px;
}

#dogsPictureAndNameContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
}

#todaysAppointmentsPerDogContainer {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    /* flex-wrap: wrap; */
}

a {
    color: black;
    /* margin: auto; */
}

</style>