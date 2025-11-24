let deathSound = new Audio("assets/audio/death2.mp3");

const MUSIC_TRACKS = {
  bg_music: { id:"bg_music", name:"Classic", src:"assets/audio/bg_music.mp3", price: 0 },
  shinchan: { id:"shinchan", name:"Shinchan", src:"assets/audio/Shinchan.mp3", price: 1200 },
  ninjahattori: { id:"ninjahattori", name:"Ninja Hattori", src:"assets/audio/ninjahattori.mp3", price: 1500 }
};

let currentMusicId = localStorage.getItem("selectedMusic") || "bg_music";
let bgMusic = new Audio(MUSIC_TRACKS[currentMusicId]?.src || MUSIC_TRACKS.bg_music.src);
bgMusic.loop = true;
bgMusic.preload = "auto";

function setBgMusic(id){
  const track = MUSIC_TRACKS[id] || MUSIC_TRACKS.bg_music;
  currentMusicId = track.id;
  localStorage.setItem("selectedMusic", currentMusicId);
  try { bgMusic.pause(); } catch{}
  bgMusic = new Audio(track.src);
  bgMusic.loop = true;
  bgMusic.preload = "auto";
  bgMusic.load();
}

function playDeath(){ deathSound.currentTime=0; deathSound.play().catch(()=>{}); }
function playBg(){ try { bgMusic.currentTime=0; bgMusic.play().catch(()=>{}); } catch{} }
function pauseBg(){ try { bgMusic.pause(); } catch{} }

window.MUSIC_TRACKS = MUSIC_TRACKS;
window.setBgMusic = setBgMusic;
