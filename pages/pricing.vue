<template>
    <main>
    <div id='title'>Pricing</div>
    <br>
    <div>
        <div id='header1' class='hdr'>All CDR sessions, except the initial visit, are for 75 minutes. A base session includes: </div>
        <ul>
            <li>A 1:1 experience with an experienced Trail Dog Runner</li>
            <li>Safe vehicle transportation to and from Callahan State Park</li>
            <li>Warm-up walk and sniff-around</li>
            <li>Approximately 3-5 mile trail experience</li>
            
            <li>Dog-sensitive breaks throughout</li>
            <li>Water (unlimited) and nutrient rich snacks (1)</li>
            <li>Tick check</li>
            <li>Remainder time spent walking in your neighborhood.</li>
            <li>CDR Map of your dog's experience</li>
            <li>$40 (all taxes and fees inclusive)</li>
        </ul>
        <div id='header2' class='hdr'>Extras: </div>
        <ul>
            <li>Add 5 minutes of running for $4, up to 25 minutes for $20</li>
            <li>Extra protein snack: $2</li>
            <li>End of walk foot bath and dry: $5</li>
            <li>End of walk hose rinse and dry: $10</li>
            **Rinses are to remove dirt, mud, and debris only.
        </ul>
        <template v-if="!$auth.$state.loggedIn">
            <div id='signupBtn'><nuxt-link to='/signup'>Sign up today</nuxt-link></div>
        </template>
    </div>
    
    </main>    
</template>
<script>
export default {
    
}
</script>

<style scoped>

.hdr {
    font-size: 1.5em;
    padding: 2px;
}

ul {
    /* list-style-image: url('/img/dogBullet1.png'); */
}

li {
    padding-bottom: 2px;
    font-size: 1.1em;
}

#title {
    font-size: 2em;
    padding-top: 5px;
    margin-left: 5%;
    border-bottom: 4px solid #f7b24a;
    /* box-shadow: -1em 0 .4em black; */
    width: fit-content;

}

#signupBtn {
    padding-top: 20px;
    cursor: pointer;
    margin-left: 5%;
    font-size: 2em;
    
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
    margin: 10px auto;
    /* margin-bottom: 2px; */

}
</style>