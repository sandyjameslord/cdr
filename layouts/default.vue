<template>
  <div>
    <img id="backgroundIMG" src="/img/callahan2PNG.png" alt="">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
export default {
    components: {
      Navbar,
      Footer

    }
}
</script>


<style>
  * {
    /* padding: 1px; */
  }
  body {
    overflow-x: hidden;
    overflow-y: visible;
    
  }
  #backgroundIMG {
    position: absolute;
    top: 0;
    height: 200%;
    width: 200%;
    object-fit: cover;
    z-index: -99;
    opacity: 0.2;
  }
</style>
