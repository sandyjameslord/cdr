<template>
    <main>
        <div v-if="$auth.$state.user.userType == 'client'">
            
            <div id="clientInfo">               
                <span class='client-class' id='clientName'>Name: {{ $auth.$state.user.firstName + " " + $auth.$state.user.lastName }}</span>
                <span class='client-class' id='clientEmail'>Email / Login: {{ $auth.$state.user.email }}</span>
                <span class='client-class' id='clientAddress'>Address: {{ $auth.$state.user.streetAddress + ", " + $auth.$state.user.cityAddress + " " + $auth.$state.user.zipCode}}</span>
                <span class='client-class' id='clientCellNumber'>Cell #: {{ $auth.$state.user.cellNumber }}</span>
                <span class='client-class' id='clientlandLine'>Land line: {{ $auth.$state.user.landLine }}</span>
                <span class='horizontalSeparatorOrange'></span>
            </div>

            <span class='client-class' id="myDogOrMyDogs">My dogs</span>
            
            <br>


            <div v-for="(dog) in dogs" :key="dog._id">
                
                <div class='dogDisplay' v-if="dog.ownerEmail == $auth.$state.user.email">
                    
                    <img class='dogPhoto' :src="dog.photo" alt="">
                    <span class='dogName'>{{ dog.dogName }}</span>
                    
                    
                    <span class='dogLicNum'>Massachusetts Dog Lic. #: {{ dog.dogLicNum }}</span>
                    <div v-if="dog.approved == true" class='dogApproved'>{{ dog.dogName }} has been approved for runs.</div>
                    
                    <div v-else class='dogApproved'>
                        <div><nuxt-link id='initialVisitBtn' :to="{ path: 'scheduleAppointment', query: { dog: `${dog.dogName}`}}">Schedule {{ dog.dogName }}'s first visit.</nuxt-link></div>
                    </div>                    
                    
                    <div>Visits:</div>
                    
                    <div v-for="(appointment) in appointments" :key="appointment.ownerEmail">
                        
                        <div v-if="appointment.dogName == dog.dogName">

                            <div v-for="(map) in maps" :key="map._id">
                                
                                <div v-if="map.date == appointment.date">
                                
                                    <div>{{ appointment.date }} {{ appointment.time }} </div>
                                    <img :src="map.photo" alt="" style="height: 50px; width: 50px; object-fit: cover;"> 
                                
                                </div>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                   
                    <span class='horizontalSeparatorBlue'></span>
                    <hr>               
                
                </div>
            
            </div>  

            <br>

           
        </div>
        
        <div v-else-if="$auth.$state.user.userType == 'employee'">
            
            <div id="employeeInfo">               
                <span class='client-class' id='clientName'>Name: {{ $auth.$state.user.firstName + " " + $auth.$state.user.lastName }}</span><br>
                <span class='client-class' id='clientEmail'>Email / Login: {{ $auth.$state.user.email }}</span><br>
                <span class='client-class' id='clientAddress'>Address: {{ $auth.$state.user.streetAddress + ", " + $auth.$state.user.cityAddress + " " + $auth.$state.user.zipCode}}</span><br>

                <span class='client-class' id='clientCellNumber'>Cell #: {{ $auth.$state.user.cellNumber }}</span><br>
                <span class='client-class' id='clientlandLine'>Land line: {{ $auth.$state.user.landLine }}</span><br>
                <span class='client-class' id='clientUserType'>User type: {{ $auth.$state.user.userType }}</span><br>
                <br>
                <span class='horizontalSeparatorOrange'></span><br>
            </div>
            <hr>
            <div id="upcomingAppointmentsButton"><nuxt-link to='profile'>Profile</nuxt-link></div>
            <div id='previousAppointmentsButton'><nuxt-link to='previousAppointments'>Previous appointments</nuxt-link></div>
            <div id='previousAppointmentsButton'><nuxt-link to='todaysAppointments'>Today's appointments</nuxt-link></div>
            <hr>
            <h2>Upcoming Appointments</h2>
            <div v-for="(appt, index) in appointments" :key="index">
                
                <!-- <div v-if="appt.date > this.timestamp"> -->
                <div v-if="appt.date > getNow()">
                <!-- <div v-if="appt.date"> -->
                    
                    <div>-------------------------------------</div>
                    <div>appt date: {{appt.date}} </div>
                    <div>appt owner email: {{appt.ownerEmail}}</div>
                    <div>appt dog name: {{appt.dogName}}</div>
                    
                    <!-- <nuxt-link id='addAMap' :to="{ path: 'makeMap', query: { dogName: `${appt.dogName}`, ownerEmail: `${appt.ownerEmail}`, date: `${appt.date}`, time: `${appt.time}`}}">Start Appointment</nuxt-link> -->
                </div>
            </div>
            
            
            
            <!-- <div v-for="(map) in maps" :key="map._id">
                
                <div class='dogDisplay' v-if="map.handler == $auth.$state.user.email">
                    
                    <img class='dogPhoto' :src="map.photo" alt="">
                    <span class='dogName'>{{ map.dogName }}</span>
                    <span class='dogName'>{{ map.ownerEmail }}</span>
                  
                    <span class='horizontalSeparatorBlue'></span>
                    <hr>               

                </div>

            </div>   -->

            <br>
        
            <!-- <nuxt-link id='addAMap' to='/makeMap'>Add a map</nuxt-link> -->
           
        </div>

        <!-- <hr> -->
    </main>
</template>

<script>

export default {
    middleware: "auth",
    async asyncData({ $axios }) {
      try {
        let dogsResponse = await $axios.$get("/api/dogs");
        let appointmentsResponse = await $axios.$get("/api/appointments");
        let mapsResponse = await $axios.$get("/api/maps");
        // let response = await $axios.$get("http://localhost:3000/api/dogs");
        // console.log(response);

        return {
          dogs: dogsResponse.dogs,
          appointments: appointmentsResponse.appointments,
          maps: mapsResponse.maps
        //   dogs: response.dogs
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    methods: {
        getNow() {
            const today = new Date();
            
            const year  = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            

            if (month < 10) {month = "" + "0" + month}
            if (day < 10) {day = "" + "0" + day}
            // return month;
            

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
                myDogOrMyDogs.innerHTML = "My dog"
            }
            console.log(count)
        },
    },
    created() {
        // this.getNow();
    },

    mounted() {
        console.log("mounted now");
        console.log("trying to access timestamp before:", this.timestamp)
        this.getNow();
        console.log("trying to access timestamp after:", this.timestamp)
        if (this.$auth.$state.user.userType == "client") {this.determineHowManyDogs(this.dogs)}
        
        // this.determineHowManyDogs(this.dogs)
    }

}
</script>

<style>

#initialVisitBtn {
    padding-top: 20px;
    cursor: pointer;
    /* margin-left: 10%; */
    font-size: 1.4em;
    
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
    /* margin: 10px auto; */
    /* margin-bottom: 2px; */

}


.horizontalSeparatorBlue {
    width: 100%;
    height: 10px;
    background-color: cadetblue;
}

.horizontalSeparatorOrange {
    width: 100%;
    height: 10px;
    background-color: rgb(247, 173, 76);
}


#addADog {
    font-size: 2em;
    text-align: center;
    padding-right: 50%;
}

.dogApproved {
    padding-left: 10px;
    transform: translateY(-10px);
    cursor: pointer;
    width: fit-content;
}

.dogDisplay {
    display: flex;
    flex-direction: column;
}

.dogPhoto {
    padding-left: 10px;
    padding-top: 10px;
}

.dogLicNum {
    padding-left: 10px;
    transform: translateY(-35px);
    font-size: 1.1em;
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
.client-class {
    padding-left: 10px;
}

#clientInfo {
    display: flex;
    flex-direction: column;
}

main {
    background-color: white;
}

img {
    object-fit: cover;
    width: 340px;
    height: 340px;
}

nuxt-link {
    cursor: pointer;
    color: black;
}

#clientName {
    font-size: 1.2em;
    padding-bottom: 4px;
}

h6 {
    padding-left: 10px;
}

#myDogOrMyDogs {
    font-size: 2em;
}
</style>