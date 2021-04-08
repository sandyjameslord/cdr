<template>
    <main>
        
        <template v-if="$auth.$state.loggedIn">
            <div id='firstName' >user {{this.$auth.$state.user.firstName}} is logged in</div>
        </template>

        <template v-else>    
            <div>NOT LOGGED IN??</div>
        </template>



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
        
        <button @click="manualAsyncData()">click to show data</button>

        <div>
            <nuxt-link id='schedAppt' :to="{ path: 'scheduleAppointment', query: { dog: `${$route.query.dog}`}}">Schedule an appointment for {{this.$route.query.dog}}</nuxt-link>
        </div>
        
    </main>
</template>

<script>

export default {
    middleware: "auth",
    async asyncData({ $axios }) {
      try {
        let dogsResponse = await $axios.$get("/api/dogs");

        console.log("inside asyncdata, looking into dogsresponse");
        console.log("dogsResponse", dogsResponse);

        return {
          dogs: dogsResponse.dogs,
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    methods: {
        async manualAsyncData() {
            let dr = await this.$axios.$get("/api/dogs");
            console.log("dog response, dr", dr);
        },
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