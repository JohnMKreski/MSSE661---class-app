const toggleSwitch = document.getElementById("toggleAnimation");
const backgroundElement = document.getElementById("backgroundElement");
const audioElement = document.getElementById("audioElement");

toggleSwitch.addEventListener("change", function() {
    if (this.checked) {
        backgroundElement.classList.add("repeating-radial-gradient-animation");
        audioElement.play();

        setTimeout(() => {
            toggleSwitch.checked = false; 
            backgroundElement.classList.remove("repeating-radial-gradient-animation");
            audioElement.pause(); 
            audioElement.currentTime = 0; 
          }, 64000); 
        console.log("Switch turned on");
    } else {
        backgroundElement.classList.remove("repeating-radial-gradient-animation");
        audioElement.pause();
        audioElement.currentTime = 0;
        console.log("Switch turned off");
    }
});
