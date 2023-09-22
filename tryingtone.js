const playButton = document.getElementById('play');

const backgroundTrack = new Tone.Player('./audio/background-acoustic-strumming-1.mp3').toDestination();
const adorationTrack = new Tone.Player('./audio/adoration-1.mp3').toDestination();
const confessionTrack = new Tone.Player('./audio/confession-1.mp3').toDestination();
const thanksgivingTrack = new Tone.Player('./audio/thanksgiving-1.mp3').toDestination();
const supplicationTrack = new Tone.Player('./audio/supplication-1.mp3').toDestination();

backgroundTrack.set({
    fadeIn: 2,
    fadeOut: 2,
    loop: true
});

const myTransport = Tone.Transport;

backgroundTrack.sync().start(0);
adorationTrack.sync().start(5);
confessionTrack.sync().start(17);
thanksgivingTrack.sync().start(29);
supplicationTrack.sync().start(41);

function playOrPause() {
    Tone.start();
    if (myTransport.state === 'stopped' || myTransport.state === 'paused') {
        console.log('I should start');
        myTransport.start();
    } else {
        console.log('I should pause');
        myTransport.pause();
    }
}

myTransport.stop(60);

playButton.addEventListener('click', playOrPause);

