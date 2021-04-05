<template>
    <main>
    <div id='a1'>About</div>
    <br>
    <div id='a2'>Sandy Lord, dog-runner, owner and CTO of Callahan Dog Run, has lived and exercised with dogs his entire life.</div>
    <br>
    <div id='a3'>He has also logged thousands of miles of walking, running, hiking, and biking through Callahan State Park.</div>
    <br>
    <div id='a4'>Combining the two, Sandy and dogs like Chester, Molly, Kaba Inu and Peggy Sue have put in some serious miles together.</div>
    <br>
    <div id='a5'>To make CDR possible, Sandy designed and implemented this web-app using JavaScript, Vue, Nuxt, Node, AWS, HTML5, CSS3, JS libraries such as jsonwebtoken and bcrypt, a MongoDB database, a custom server and full CRUD capability.</div>
    <br>
    <div id='a6'><a href="https://www.linkedin.com/in/sandy-lord-engineer/" target="_blank">Contact Sandy for more information on dog walking and running, fresh, clean web development and anything Python.</a> </div>
    </main>    
</template>
<script>
export default {
    
}
</script>
<style scoped>
a {
    text-decoration: underline;
}



#a1 {
    font-size: 2em;
    padding-top: 5px;
    margin-left: 5%;
    border-bottom: 4px solid #f7b24a;
    width: fit-content;
    
}

#a2 {
    font-size: 1.5em;
    padding: 2px;
}

#a3, #a4, #a5, #a6 {
    background-color: rgba(215,215,215,0.7);
    width: fit-content;
    padding: 2px;
    font-size: 1.3em;
}

#a6 {
    margin-bottom: 10px;
}

main {
    /* padding: 2px; */
}
</style>
