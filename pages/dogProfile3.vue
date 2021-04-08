<template>
    <main>
        
        <div id="topContainer">            
            <div v-for="(dog, index) in dogs" :key="dog._id">
                <div v-if="dog.ownerEmail == $auth.$state.user.email">
                    <div v-if="($route.query.dog == dog.dogName)">
                        <img class='dogPhoto' :src="dog.photo" alt="">
                        <div class='dogName'>{{dog.dogName}}</div>
                        <div class='dogNotesTitle'>Notes:</div>
                        <div class='dogNotes'>{{dog.notesAboutDog}}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div>
            <nuxt-link id='schedAppt' :to="{ path: 'scheduleAppointment', query: { dog: `${$route.query.dog}`}}">Schedule an appointment for {{this.$route.query.dog}}</nuxt-link>
        </div>
        
    </main>
</template>

<script>

export default {
    async asyncData({ $axios }) {
      try {
        let dogsResponse = await $axios.$get("/api/dogs");
        let appointmentsResponse = await $axios.$get("/api/appointments");
        let mapsResponse = await $axios.$get("/api/maps")

        console.log("inside asyncdata, looking into dogsresponse");
        console.log("dogsResponse", dogsResponse);

        return {
          dogs: dogsResponse.dogs,
          appointments: appointmentsResponse.appointments,
          maps: mapsResponse.maps,
        }
      } catch (err) {
        console.log(err.message)
      }
    },
}
</script>

<style scoped>
#schedAppt {
    padding-top: 20px;
    cursor: pointer;
    margin-left: 5%;
    font-size: 1.2em;
    width: fit-content;
    background: #f7b24a;
    color: black;
    border-radius: 10px;
    padding-right: 4px;
    padding-left: 4px;
    padding-top: 3px;
    padding-bottom: 2px;
    border: 2px solid black;
}

</style>