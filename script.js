const playButton = document.getElementById('play');
const prayerLength = 120;

const backgroundTrack = new Tone.Player('./audio/background-acoustic-strumming-1.mp3').toDestination();
const adorationTrack = new Tone.Player('./audio/adoration-1.mp3').toDestination();
const confessionTrack = new Tone.Player('./audio/confession-1.mp3').toDestination();
const thanksgivingTrack = new Tone.Player('./audio/thanksgiving-1.mp3').toDestination();
const supplicationTrack = new Tone.Player('./audio/supplication-1.mp3').toDestination();

backgroundTrack.set({
    fadeIn: 0.5,
    fadeOut: 0.5,
    loop: true
});

const myTransport = Tone.Transport;

backgroundTrack.sync().start(0);
adorationTrack.sync().start(5);
confessionTrack.sync().start(33);
thanksgivingTrack.sync().start(61);
supplicationTrack.sync().start(89);

function playOrPause() {
    Tone.start();

    if (myTransport.state === 'stopped' || myTransport.state === 'paused') {
        myTransport.start();
        console.info('Prayer Started!');
    } else {
        myTransport.pause();
        console.info('Prayer Paused!');
    }
}

myTransport.stop(prayerLength);

playButton.addEventListener('click', playOrPause);

