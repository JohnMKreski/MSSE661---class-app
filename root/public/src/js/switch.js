const toggleSwitch = document.getElementById("toggleAnimation");
const backgroundElement = document.getElementById("backgroundElement");
const audioElement = document.getElementById("audioElement");
// let timeoutDuration = 64000;
let updateRemainingTime;

function updateTimeRemaining() {
    const remainingTime = audioElement.duration - audioElement.currentTime;
    console.log("Time remaining in audio:", remainingTime.toFixed(0), "seconds.");
}

toggleSwitch.addEventListener("change", function() {
    if (this.checked) {
        backgroundElement.classList.add("spin-animation");
        backgroundElement.classList.add("repeating-radial-gradient-animation");
        audioElement.play();
        console.log("Switch Turned On.");

        // Start updating remaining time
        updateRemainingTime = setInterval(updateTimeRemaining, 1000);

        // Listen for the 'ended' event of the audio element
        audioElement.addEventListener("ended", function() {
            toggleSwitch.checked = false; 
            backgroundElement.classList.remove("spin-animation");
            backgroundElement.classList.remove("repeating-radial-gradient-animation");
            audioElement.pause();
            audioElement.currentTime = 0;
            console.log("Audio ended. Turned off.");
            clearInterval(updateRemainingTime); // Stop updating remaining time
        });
        
        // Commented out because the audio time controls the length of the switch being turned on
        /*setTimeout(() => {
            toggleSwitch.checked = false; 
            backgroundElement.classList.remove("spin-animation");
            backgroundElement.classList.remove("repeating-radial-gradient-animation");
            audioElement.pause(); 
            audioElement.currentTime = 0; 
            clearInterval(updateRemainingTime);
            console.log("Timed Out.")         
          }, timeoutDuration); */
    } else {
        console.log("Switch Turned Off."); // Log when the switch is turned off
        backgroundElement.classList.remove("spin-animation");
        backgroundElement.classList.remove("repeating-radial-gradient-animation");
        audioElement.pause();
        audioElement.currentTime = 0;
        clearInterval(updateRemainingTime); // Stop updating remaining time
    }
});



