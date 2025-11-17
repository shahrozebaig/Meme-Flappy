let deathSound = new Audio("assets/audio/death2.mp3");
let bgMusic = new Audio("assets/audio/bg_music.mp3");
bgMusic.loop = true;

function playDeath(){ deathSound.currentTime=0; deathSound.play().catch(()=>{}); }
function playBg(){ bgMusic.currentTime=0; bgMusic.play().catch(()=>{}); }
function pauseBg(){ bgMusic.pause(); }
