<template>
    <main>
        <header>
            <div id='container'>
                <!-- <a href="#">
                    <img src="img/dogTransparency1.png" alt="">
                </a> -->

                <!-- <iframe frameborder="0" height="100%" width="100%"
                    src="https://youtube.com/embed/05sUhlxFBk0?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1">
                </iframe> -->

                <span class='info1'>An outdoor adventure for your dog,</span>
                <span class='info1'>minutes from your home.</span>
                <span class='info1'>Callahan Dog Run. </span>
                <br>
                <!-- <img src="img/dogRunText.png" alt=""> -->
                <template v-if="$auth.$state.loggedIn">
                    <span @click="onLogout" id='logout'>Logout</span>
                </template>

                

                
            </div>

        </header>
    </main>
</template>
<script>

export default {

  methods: {
    async onLogout() {
      await this.$auth.logout();
    }
  }
}

</script>
<style scoped>



#container {
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    /* padding-top: 25px; */
    background: rgb(9,121,86);
    background: linear-gradient(69deg, rgb(2, 142, 170) 50%, rgba(9,121,86,1) 100%);
    border-bottom: 10px solid white;
    color: white;
    height: 150px;
    

}

#logout {
    position: relative;
    bottom: 25px;
    left: 80%;
    cursor: pointer;
    border-radius: 10px;
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-bottom: 2px solid black;
    background: #f7b24a;
    color: black;
    /* padding: 4px 2px; */


    padding-right: 6px;
    padding-left: 6px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid black;
    font-size: 1.3em;
    width: fit-content;
    /* font-size: 3em; */
}


.info1 {
    font-size: 1.4em;
    /* padding-left: 10px; */
    /* align-self: flex-start; */
    text-align: center;
    padding-top: 5px;
}
</style>