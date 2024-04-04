let speech = new SpeechSynthesisUtterance();
let voiceselect = document.querySelector("select");
let textarea = document.querySelector("textarea");
let specchtoText=document.querySelector(".voice");

// Initialize speech recognition
let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

// Event listener to start speech recognition when the ".voice" element is clicked
specchtoText.addEventListener("click", e => {
    e.preventDefault();
    recognition.start();
});

// Event listener for speech recognition result
recognition.onresult = event => {
    let transcript = Array.from(event.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
    textarea.value = transcript;
};

// Function to populate voices for speech synthesis
let addVoices = () => {
    let voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    
    voiceselect.innerHTML = ''; 

    voices.forEach((voice, i) => {
        voiceselect.options[i] = new Option(voice.name, i);
    });
};

// Trigger the function to populate voices when voices change
window.speechSynthesis.onvoiceschanged = addVoices;

// Event listener for the change event of the select element
voiceselect.addEventListener("change", () => {
    let voices = window.speechSynthesis.getVoices();
    speech.voice = voices[voiceselect.value];
});

// Event listener for the button click to start text-to-speech
document.querySelector("button").addEventListener("click", () => {
    speech.text = textarea.value;
    window.speechSynthesis.speak(speech);
});

specchtoText[2].addEventListener("click",()=>{
    specchtoText.stop();
})