const introOffestSeconds = 5;
const prayerLengthSelect = document.getElementById('prayerLengthSelect');

let prayerLength = prayerLengthSelect.value * 60;
let prayerSegmentLength = (prayerLength - introOffestSeconds) / 4;

const beginText = 'Begin Your Guided Prayer';
const pauseText = 'Pause Your Guided Prayer';
const resumeText = 'Resume Your Guided Prayer';

const playButton = document.getElementById('play');

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

function playOrPause() {
    Tone.start();

    switch (Tone.Transport.state) {
        case 'stopped':
            prayerLength = getNewPrayerLength();
            prayerSegmentLength = getNewSegmentLength();
            backgroundTrack.sync().start(0);
            adorationTrack.sync().start(introOffestSeconds);
            confessionTrack.sync().start(introOffestSeconds + prayerSegmentLength);
            thanksgivingTrack.sync().start(introOffestSeconds + (prayerSegmentLength * 2));
            supplicationTrack.sync().start(introOffestSeconds + (prayerSegmentLength * 3));
            Tone.Transport.start(0);
            Tone.Transport.stop(prayerLength);
            playButton.textContent = pauseText;
            break;
        case 'paused':
            Tone.Transport.start();
            playButton.textContent = pauseText;
            break;
        case 'started':
            Tone.Transport.pause();
            playButton.textContent = resumeText;
            break;
    }
}

function getNewPrayerLength() {
    return document.getElementById('prayerLengthSelect').value * 60;
}

function getNewSegmentLength() {
    return ((document.getElementById('prayerLengthSelect').value * 60) - introOffestSeconds) / 4;
}

function resetPlayButtonText() {
    playButton.remove();
    document.getElementById('refreshText').classList.remove('hidden');
}

playButton.addEventListener('click', playOrPause);
Tone.Transport.on('stop', resetPlayButtonText);
