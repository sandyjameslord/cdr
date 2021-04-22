<template>
    <main>
        
        <button @click="showDogsInfo()">DOGS info</button>
        
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
        showDogsInfo() {
            console.log("this.dogs, dogs",this.dogs, dogs)
        }
    }

}
</script>

<style scoped>


</style>