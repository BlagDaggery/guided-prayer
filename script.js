const audioContext = new AudioContext();
const audioElement = document.getElementById('background');
const track = audioContext.createMediaElementSource(audioElement);
const playButton = document.querySelector('button');

let desiredDuration = 120;
let currDuration = 0;

track.connect(audioContext.destination);

playButton.addEventListener('click', () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === 'false') {
        audioElement.play();
        playButton.dataset.playing = 'true';
    } else if (playButton.dataset.playing === 'true') {
        audioElement.pause();
        playButton.dataset.playing = 'false';
    }

});

audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
});

