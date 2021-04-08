<template>
    <main>

        <button @click="makeThisDogsProfileInformationAppear()">make this info appear</button>
        <div id="topContainer">
            <div id='title'>{{$route.query.dog}}'s Profile</div>
            <img class='dogPhoto' alt="">
            <div class="dogName">{{$route.query.dog}}</div>
            <div class="dogNotesTitle">Notes:</div>
            <div class="dogNotes"></div>
            
            
            
            <!-- <div v-for="(dog, index) in dogs" :key="dog._id">
                <div v-if="dog.ownerEmail == $auth.$state.user.email">
                    <div v-if="($route.query.dog == dog.dogName)">
                        <img class='dogPhoto' :src="dog.photo" alt="">
                        <div class='dogName'>{{dog.dogName}}</div>
                        <div class='dogNotesTitle'>Notes:</div>
                        <div class='dogNotes'>{{dog.notesAboutDog}}</div>
                    </div>
                </div>
            </div> -->
        </div>
        
        <div>
            <nuxt-link id='schedAppt' :to="{ path: 'scheduleAppointment', query: { dog: `${$route.query.dog}`}}">Schedule an appointment for {{this.$route.query.dog}}</nuxt-link>
        </div>
        <!-- dogProfileLink.setAttribute('href', `/dogProfile?dog=${this.dogs[i].dogName}`); -->
        <br>
        <hr>
        <div id='todaysAppointmentContainer'>
            
            <div class='appointmentsLabel'> Today's Appointments</div>
            <div v-for="(appt) in appointments" :key="appt._id">
                <div v-if="appt.date == getNow() && appt.dogName == $route.query.dog">
                    <div>With {{appt.handlerName}} from {{appt.time}}.</div>
                </div>    
            </div>  
        </div>
        <br>
        <div id='futureAppointmentContainer'>
            <div class='appointmentsLabel'> Future Appointments</div>
            <div v-for="(appt) in appointments" :key="appt._id">
                <div v-if="appt.date > getNow() && appt.dogName == $route.query.dog">
                    <div>{{getAmericanEnglishDate(appt.date)}} at {{appt.time}} with {{appt.handlerName}}</div>
                </div>    
            </div>  
        </div>
        <br>
        <div id='pastAppointmentContainer'>
            <div class='appointmentsLabel'> Past Appointments</div>
            <div v-for="(appt) in appointments" :key="appt._id">
                <div v-if="appt.date < getNow() && appt.dogName == $route.query.dog">
                    <!-- <div>{{appt.dogName}} had  an appointment on {{getAmericanEnglishDate(appt.date)}} at {{appt.time}} with {{appt.handler}}</div> -->
                    <div v-for="(map) in maps" :key="map._id">
                        
                        <div v-if="map.date == appt.date && appt.time == map.time && map.ownerEmail == appt.ownerEmail">
                            <div id='mapContainer'>
                                <img :src="map.photo" alt="">
                                <div id='mapDataContainer'>
                                    <div>Date: {{getAmericanEnglishDate(appt.date)}}</div>
                                    <div>Time Range: {{appt.time}} </div>
                                    <div>Pick-up - Drop-off: {{map.pickUpTime}} - {{map.dropOffTime}}</div>
                                    <div>{{map.handler}}</div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>    
            </div>  
        </div>
        
        
    </main>
</template>

<script>

export default {
    // middleware: "auth",
    updated() {

    },
    created() {
        // this.makeThisDogsProfileInformationAppear();
    },
    async asyncData({ $axios }) {
      try {
        let dogsResponse = await $axios.$get("/api/dogs");
        let appointmentsResponse = await $axios.$get("/api/appointments");
        let mapsResponse = await $axios.$get("/api/maps")

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
        makeThisDogsProfileInformationAppear() {
            for (let i = 0; i < dogs.length; i++) {
                let dog = dogs[i];
                if (dog.dogName == this.$route.query.dog) {
                    console.log('right dog: ', dog.dogName);
                }
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
    }    
}
</script>

<style scoped>
#schedAppt {
    padding-top: 20px;
    cursor: pointer;
    margin-left: 5%;
    font-size: 1.2em;
    
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
    /* margin-bottom: 12px; */

}

.dogNotes {
    transform: translateY(-40px);
}

.dogNotesTitle {
    font-size: 1.5em;
    transform: translateY(-40px);
}

.appointmentsLabel {
    font-size: 1.5em;
}

#futureAppointmentContainer {
    font-size: 1.0em;
}

#pastAppointmentContainer {
    /* font-size: 1.5em; */
}

#mapDataContainer{
    /* font-size: 1.5em; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}


#mapContainer {
    font-size: 1.0em;
    display: flex;
    flex-direction: row;
}

#todaysAppointmentContainer {
    font-size: 1.0em;
}

#title {
    font-size: 2em;
    padding-bottom: 10px;
}

#topContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dogPhoto {
    /* padding-left: 10px;
    padding-top: 10px; */
    flex-grow: 1;
    /* flex-shrink: 1; */
    max-width: 340px;
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

</style>