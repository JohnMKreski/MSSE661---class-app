const toggleSwitch = document.getElementById("toggleAnimation");
const backgroundElement = document.getElementById("backgroundElement");
const rainbowElement = document.getElementById("rainbowElement");
const audioElement = document.getElementById("audioElement");
// let timeoutDuration = 64000;
let updateRemainingTime;
let isAnimating = false; // Variable to track whether animations are currently active


function updateTimeRemaining() {
    const remainingTime = audioElement.duration - audioElement.currentTime;
    console.log("Time remaining in audio:", remainingTime.toFixed(0), "seconds.");
}

toggleSwitch.addEventListener("change", function() {
    if (this.checked) {
        // Remove and re-add the class to restart the animation
        backgroundElement.classList.remove("repeating-radial-gradient-animation");
        void backgroundElement.offsetWidth; // Trigger reflow
        backgroundElement.classList.add("repeating-radial-gradient-animation");
        
        
        rainbowElement.classList.add("spin-animation");
        
        if (!isAnimating) {
            //rainbowElement.style.animationPlayState = "running";
            backgroundElement.style.animationPlayState = "running"; // Resume animations if not already running
            isAnimating = true;
        }
        audioElement.play();
        console.log("Switch Turned On.");

        // Start updating remaining time
        updateRemainingTime = setInterval(updateTimeRemaining, 1000);

        // Listen for the 'ended' event of the audio element
        audioElement.addEventListener("ended", function() {
            toggleSwitch.checked = false; 
            rainbowElement.classList.remove("spin-animation");
            //backgroundElement.classList.remove("repeating-radial-gradient-animation");

            audioElement.pause();
            audioElement.currentTime = 0;
            console.log("Audio ended. Turned off.");

            clearInterval(updateRemainingTime); // Stop updating remaining time

            //rainbowElement.style.animationPlayState = "paused"; //NOTWORKING
            backgroundElement.style.animationPlayState = "paused"; // Pause animations
            isAnimating = false;

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
        rainbowElement.classList.remove("spin-animation");
        //backgroundElement.classList.remove("repeating-radial-gradient-animation");

        audioElement.pause();
        audioElement.currentTime = 0;
        clearInterval(updateRemainingTime); 

        rainbowElement.style.animationPlayState = "paused"; //NOT WORKING
        backgroundElement.style.animationPlayState = "paused"; // Pause animations
        isAnimating = false;
    }
});



