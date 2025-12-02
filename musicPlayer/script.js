// Track list
const tracks = [
    {
        name: "Let me down slowly",
        artist: "Alec Benjamin",
        cover: "alec.jpg",
        source: "Let me down slowly.mp3",
    },
    {
        name: "Let me love you",
        artist: "DJ Snake/Justin Beiber",
        cover: "dj.jpg",
        source: "Let me love you.mp3",
    },
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        cover: "ed.jpg",
        source: "Perfect.mp3",
    },
];

// Select all HTML elements
const audio = new Audio();
const coverImg = document.querySelector("img");     // <-- this was missing
const title = document.querySelector(".audio-title");
const artist = document.querySelector(".audio-singer");
const progress = document.querySelector(".progress");
const progressHead=document.querySelector(".progress-head")
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const playBtn = document.querySelector(".play i");
const nextBtn = document.querySelector(".skip-forward");
const prevBtn = document.querySelector(".skip-back");
const audioImgWrapper = document.querySelector(".audio-img");
let trackIndex = 0;
let isPlaying = false;




// Load track function
function loadTrack(index) {
    const track = tracks[index];

    // coverImg.src = track.cover;          // <-- No error now
    title.textContent = track.name;
    artist.textContent = track.artist;

    audio.src = track.source;
}

loadTrack(trackIndex);


// Play / Pause function
function playTrack() {
    audio.play();
    isPlaying = true;
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
     audioImgWrapper.classList.add("spin"); 
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
     audioImgWrapper.classList.remove("spin"); 
}

playBtn.parentElement.addEventListener("click", () => {
    isPlaying ? pauseTrack() : playTrack();
});


// Update progress bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        let progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progressPercent + "%";
        progressHead.style.left = progressPercent + "%"; // move the dot

        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

// Click to seek
progress.addEventListener("click", (e) => {
    let width = progress.clientWidth;
    let clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});


// Skip forward
nextBtn.addEventListener("click", () => {
    trackIndex++;
    if (trackIndex >= tracks.length) trackIndex = 0;
    loadTrack(trackIndex);
    playTrack();
});

// Skip backward
prevBtn.addEventListener("click", () => {
    trackIndex--;
    if (trackIndex < 0) trackIndex = tracks.length - 1;
    loadTrack(trackIndex);
    playTrack();
});


// Format time function
function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}
