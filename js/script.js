// Select heart elements and reveal content
const grayHeart = document.querySelector(".gray-heart");
const redHeart = document.querySelector(".red-heart");
const responseContainer = document.getElementById("responseContainer");
const typedText = document.getElementById("typedText");

const noButton = document.getElementById("noButton");

// Function to move the button to a random position
function moveNoButtonRandomly() {
    // Remove the reveal animation class so the inline transform takes effect
    noButton.classList.remove("button-reveal");

    // Calculate random offsets. Adjust the multiplier for more/less movement.
    const randomX = (Math.random() - 0.5) * 800; // roughly -200px to 200px
    const randomY = (Math.random() - 0.5) * 800; // roughly -200px to 200px

    // Apply a smooth transition and update the transform
    noButton.style.transition = "transform 0.1s ease";
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Function to reset the button to its original position
function resetNoButtonPosition() {
    noButton.style.transition = "transform 0.3s ease";
    noButton.style.transform = "translate(0, 0)";
}

// Mouse events for desktop
noButton.addEventListener("mouseenter", moveNoButtonRandomly);
noButton.addEventListener("mouseleave", resetNoButtonPosition);

// Touch events for mobile devices
noButton.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent unwanted default behaviors
    moveNoButtonRandomly();
});
noButton.addEventListener("touchend", (e) => {
    e.preventDefault();
    resetNoButtonPosition();
});


// When the gray heart is clicked:
grayHeart.addEventListener("click", () => {
    console.log("Gray heart clicked");
    // Trigger the red heart animation and add fill effect on the gray heart
    redHeart.classList.add("animation");
    grayHeart.classList.add("fill-color");

    // Reveal the response container and start the typing effect immediately
    responseContainer.classList.remove("hidden");
    typedText.classList.remove("hidden");
    typeEffect();

    // Fade out the heart container instead of abruptly hiding it
    setTimeout(() => {
        const heartContainer = document.querySelector(".heart-container");
        heartContainer.style.transition = "opacity 0.5s ease";
        heartContainer.style.opacity = "0";
        // Optionally, after the fade-out, remove it completely
        setTimeout(() => {
            heartContainer.style.display = "none";
        }, 800);
    }, 100);
});

// (Optional) Reset the hearts if the red heart is clicked
redHeart.addEventListener("click", () => {
    redHeart.classList.remove("animation");
    grayHeart.classList.remove("fill-color");
});

// Typing effect function to reveal the question letter-by-letter with a delay between words.
async function typeEffect() {
    const text = "Tia Ashley,\nWill You Be My Valentine and Forever Stay?";
    const words = text.split(" ");
    typedText.innerHTML = ""; // Clear any existing text

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        // Process each character in the word.
        for (let j = 0; j < word.length; j++) {
            const char = word[j];
            if (char === "\n") {
                // Insert a line break if the character is a newline.
                typedText.innerHTML += "<br>";
            } else {
                typedText.innerHTML += char;
            }
            // Delay between each letter.
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        // After each word, insert a space.
        typedText.innerHTML += " ";
        // Delay between words.
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
    // After finishing typing the question, reveal the buttons sequentially.
    revealButtonsSequentially();
}

// Function to reveal each button one after another with animation
function revealButtonsSequentially() {
    const buttons = document.querySelectorAll("#responseButtons button");
    buttons.forEach((button, index) => {
        setTimeout(() => {
            // Remove the hidden class to allow the button to display
            button.classList.remove("hidden");
            // Add the class that triggers the fadeInUp animation
            button.classList.add("button-reveal");
        }, index * 1000); // Adjust 500ms for delay between each button reveal
    });
}

// Add event listeners for the response buttons
document.getElementById("yesButton").addEventListener("click", function () {
    spawnConfetti("❤️", 30);

    setTimeout(() => {
        alert("Tia Ashley, buckle up because our Love adventure is about to take off!\nThis Love has no layovers—only nonstop, first-class romance! ❤️✈️");
    }, 100);
});

document.getElementById("noButton").addEventListener("click", function () {
    spawnConfetti("😢", 30);

    setTimeout(() => {
    alert("Tia Ashley Campos...Try again.\nDisappointed you even made the effort to choose this response.");
    }, 100);
});
document.getElementById("maybeButton").addEventListener("click", function () {
    spawnConfetti("🤔", 30);

    setTimeout(() => {
    alert("Maybe? Really, Tia Ashley?\nI thought you mentioned you'd have no problem going all in with us...guess I was wrong.");
    }, 100);
});

// Generic confetti function that spawns confetti elements with a given emoji
function spawnConfetti(emoji, count = 30) {
    for (let i = 0; i < count; i++) {
        let conf = document.createElement("div");
        conf.classList.add("confetti");
        conf.innerText = emoji;
        // Set a random horizontal position within the viewport
        conf.style.left = Math.random() * window.innerWidth + "px";
        // Randomize font size for variability
        conf.style.fontSize = (20 + Math.random() * 20) + "px";
        // Randomize animation duration between 2 and 5 seconds
        conf.style.animationDuration = (2 + Math.random() * 3) + "s";
        // Randomize a slight animation delay for a staggered effect
        conf.style.animationDelay = Math.random() + "s";
        document.body.appendChild(conf);
        // Remove the confetti after its animation finishes (5 seconds)
        setTimeout(() => {
            conf.remove();
        }, 5000);
    }
}
