const backgroundTrack = document.getElementById('background');
const welcomeTrack = document.getElementById('welcome');


const audioContext = new AudioContext();
const track = audioContext.createMediaElementSource(backgroundTrack);

const playButton = document.querySelector('button');


track.connect(audioContext.destination);

playButton.addEventListener('click', () => {
    let backgroundDuration = backgroundTrack.duration;
    let backgroundDurationMs = backgroundDuration / 1000;
    console.log('variable version' ,backgroundDuration);
    console.log('direct access', backgroundTrack.duration);

    // whatt?
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === 'false') {
        backgroundTrack.play();
        playButton.dataset.playing = 'true';
        
        function playWelcome() {
            welcomeTrack.play();
        }

        setTimeout(playWelcome,1000);
    } else if (playButton.dataset.playing === 'true') {
        backgroundTrack.pause();
        playButton.dataset.playing = 'false';
    }

});

backgroundTrack.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
});

