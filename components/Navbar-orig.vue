<template>
    <main>
        <header>
            <div id="outerContainer">

                <div id='topContainer'>
                    
                    <nuxt-link to='/'>
                        <img id='logo' src="img/callahanDogRunLogo.png" alt="">
                    </nuxt-link>
                    
                    <div id="helloContainer">
                        <template v-if="$auth.$state.loggedIn">
                            
                                <span id='welcome' class='unit1'><nuxt-link to='/profile'>Welcome,</nuxt-link></span>
                                <span id='userFirstName' class='unit2'><nuxt-link to='/profile'>{{ $auth.$state.user.firstName }}</nuxt-link></span>
                            
                        </template>

                        <template v-else>    
                            <span id='login' class='unit1'><nuxt-link to="/login">Log In</nuxt-link></span>
                            <span id='signup' class='unit2'><nuxt-link to="/signup">Sign Up</nuxt-link></span>
                        </template>
                    </div>

                    <span id='hamburger' @click="showOptions">HAM</span>

                </div>

                <div id="bottomContainer">
                    
                    
                    
                    <div id='review' class='linker'>
                        <nuxt-link to='/reviews'>Reviews</nuxt-link>
                    </div>

                    <div id='about' class='linker'>
                        <nuxt-link to='/about'>About</nuxt-link>
                    </div>
                    
                    <div id='features' class='linker'>
                        <nuxt-link to='/features'>Features</nuxt-link>
                    </div>
                    
                    <div id='pricing' class='linker'>
                        <nuxt-link to='/pricing'>Pricing</nuxt-link>
                    </div>

                </div>

            </div>
        </header>
    </main>
</template>
<script>
export default {
    methods: {
        showOptions() {
            let about = document.getElementById('about');
            let review = document.getElementById('review');
            let features = document.getElementById('features');
            let pricing = document.getElementById('pricing');
            
            let outerContainer = document.getElementById('outerContainer');
            let helloContainer = document.getElementById("helloContainer");

            helloContainer.style.flexDirection = "row";

            let logo = document.getElementById("logo");
            logo.style.height = "100px;";
            logo.style.width = "140px";
            logo.style.transform = "translateY(-40px)";
            
            about.style.opacity = 1;
            review.style.opacity = 1;
            features.style.opacity = 1;
            pricing.style.opacity = 1;
        }
    }
}
</script>


<style scoped>

a {
    color: black;
}

#outerContainer {
    height: 115px;
    background: rgb(9,121,86);
    background: linear-gradient(69deg, rgba(9,121,86,0.7) 0%, rgba(0,212,255,0.7) 100%);
}

#bottomContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 40px;
}

#topContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 70px;
}

.linker {
    opacity: 0;
    font-size: 1.5em;
    padding-top: 10px;
    z-index: 2;
}

#helloContainer {
    display: flex;
    flex-direction: column;
    font-size: 1.6em;
    height: 80px;
    padding-top: 5px;
    padding-right: 10px;
}

#helloContainer > span {
    text-align: center;
}

.unit1 {
    width: 150px;
    height: 36px;
    background: #f7b24a;
    color: black;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 2px;
}

.unit2 {
    width: 150px;
    height: 35px;
    background: #f7b24a;
    color: black;
    border-radius: 10px;
    padding: 2px;
}

#logo {
    object-fit: cover;
    height: 140px;
    width: 180px;
    transform: translateY(-19px);
}

</style>