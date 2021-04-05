<template>
    <main>
         <span id='title'>Add a Dog</span>
        
        <form id='container'>
            <label for="dogName">Dog's name</label><br>
            <input type="text" name='dogName' v-model="dogName"><br>

            <label>Dog's Mass. licence number</label><br>
            <input type="text" v-model="dogLicNum"><br>

            <label for="photo">Photo of {{this.dogName}}</label><br>
            <input type="file" name="photo" @change="onFileSelected"><br>

            <label for="dogNotes">Notes about {{this.dogName}}</label><br>
            <textarea type="text" name='dogNotes' v-model="notesAboutDog"></textarea><br>

            <label for="dogQuestions">Questions about services for {{this.dogName}}</label><br>
            <textarea type="text" name='dogQuestions' v-model="questionsAboutDog"></textarea><br>

            <span id='signupDogBtn' @click="onAddDog">Add your dog to your account</span>
        </form>
        
    </main>
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            dogName: "",
            dogLicNum: "",
            selectedFile: null,
            notesAboutDog: "",
            questionsAboutDog: ""
        }
    },

    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;

        },
        async onAddDog({ $axios }) {
            let data = new FormData();
            data.append("dogName", this.dogName);
            data.append("dogLicNum", this.dogLicNum);
            data.append("ownerEmail", this.$auth.$state.user.email);
            data.append("approved", false);
            data.append("photo", this.selectedFile, this.selectedFile.name);
            data.append("notesAboutDog", this.notesAboutDog);
            data.append("questionsAboutDog", this.questionsAboutDog);

            let button =  document.getElementById("signupDogBtn");
            button.style.opacity = "0";
            button.style.position = "absolute";
            button.style.top = "0";
            button.style.height = "0";
            button.style.width = "0";

            let result = await this.$axios.$post("/api/dogs", data);

            this.$router.push("/profile"); 
        }
    }    
}
</script>

<style scoped>
#container {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
}

label {
    font-size: 1.2em;
    margin-left: 5%;

}

#title {
    font-size: 2em;
    padding-top: 5px;
    margin-left: 5%;
    /* text-shadow: .1em .1em 2em #f7b24a; */
    width: fit-content;
    border-bottom: 4px solid #f7b24a;
    /* margin: auto; */
    
}

#youNotDog {
    padding-bottom: 10px;
}
input, textarea {
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
}



#signupDogBtn {
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
    text-align: center;
    /* margin-bottom: 2px; */

}

</style>