<template>
    <main>
        <template v-if="$auth.$state.loggedIn">
            <br>
            <div id='firstName' ><nuxt-link to='/profile'>Hi {{$auth.$state.user.firstName}}, click to view your profile.</nuxt-link></div>
            <br>
        </template>

        <template v-else>
            <div id='outerContainer'>
            
            <div id='title'>Callahan Dog Run</div>
            
                <div id='innerContainer'>
                    <div id='line1' class='line'>Exercise is important to your dog's physical and mental health.</div>
                    <div id='line2' class='line'>The woods and trails at Callahan State Park in Framingham, Mass. provide a safe location where a dog can be a dog.</div>
                    <div id='line3' class='line'>CDR would love to give your four-footed friend the opportunity to have</div>
                    <div id='line4' class='line'>...dirt under its feet</div>
                    <div id='line5' class='line'>...the wind in its face</div>
                    <div id='line6' class='line'>...the smell of wild animals in its nose</div>
                    <div id='line7' class='line'>...miles behind it and miles to come</div>
                    <div id='line7a' class='line'>...an individually catered truly athletic experience</div>
                    <div id='line8' class='line'>...and a friendly human to share with, the way dogs love to do.</div>
                    
                    <br>
                    <div id='line9' class='line'><nuxt-link to='/signup'>Sign up for a free account and register your dogs today!</nuxt-link></div>
                    <br>
                </div>
        
            </div>  
        </template>

        
    </main>
</template>

<script>

export default {
    // middleware: "auth",
    auth: "guest",
}
</script>

<style scoped>
@keyframes becomeVisible1 {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* @keyframes becomeVisible2 {
    0% {
        transform: translateX(-100vw);
        opacity: 0;
    }
    70% {
        opacity: 0;
    }
    100% {
        transform: translateX(calc(50vw - 150px));
        opacity: 1;
    }
}

@keyframes moveLeft {
    0% {
        transform: translateX(100vw);
        opacity: 0;
    }
    70% {
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
} */

#firstName > a {
    color: black;
}

#firstName {
    text-align: center;
    font-size: 1.4em;
    border-radius: 10px;
    border: 2px solid black;
    background-color: #f7b24a;
    
    padding: 5px 10px;

    /* margin-bottom: 10px;
    margin-top: 10px; */
    margin: auto;
    max-width: 300px;
    cursor: pointer;
    color: black;
}

#line1 {
    
}

#line2 {
    
}

#line3 {
    animation-delay: 5000ms;
}

#line4 {
    animation: becomeVisible1 1000ms linear forwards;
    animation-delay: 7000ms;
}

#line5 {
    animation: becomeVisible1 1000ms linear forwards;
    animation-delay: 9000ms;
}

#line6 {
    /* transform: translateX(100vw); */
    animation: becomeVisible1 1000ms linear forwards;
    animation-delay: 11000ms;
}

#line7 {
    /* transform: translateX(100vw); */
    animation: becomeVisible1 1000ms linear forwards;
    animation-delay: 13000ms;
}

#line7a {
    /* transform: translateX(100vw); */
    animation: becomeVisible1 1000ms linear forwards;
    animation-delay: 15000ms;
}

#line8 {
    /* transform: translateX(100vw); */
    animation: becomeVisible1 1000ms linear forwards;
    animation-delay: 17000ms;
}

#line9 {
    margin: auto;
    /* transform: translateX(-100vw); */
    /* animation: becomeVisible1 1000ms linear forwards; */
    font-size: 1.4em;
    border-radius: 10px;
    border: 2px solid black;
    background-color: #f7b24a;
    text-align: center;
    padding-bottom: 10px;
    animation-delay: 16000ms;
    max-width: 300px;
    cursor: pointer;
}
.line {
    font-size: 1.2em;
    /* box-shadow: -1em 0 .4em black; */
    
    /* padding-right: 3px; */
}

#outerContainer {
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
}

#innerContainer {
    display: flex;
    flex-direction: column;
}

#innerContainer > div {
    padding: 5px;
}


#title {
    margin-left: 5%;
    font-size: 2em;
    text-align: center;
    border-bottom: 4px solid #f7b24a;
    width: fit-content;
    
}

a {
    color: black;
}

</style>
