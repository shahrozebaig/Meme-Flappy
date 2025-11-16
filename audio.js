let jumpSound = new Audio("assets/audio/jump1.mp3");
let deathSound = new Audio("assets/audio/death2.mp3");
let bgMusic = new Audio("assets/audio/bg_music.mp3");
bgMusic.loop = true;

function playJump(){ jumpSound.currentTime=0; jumpSound.play().catch(()=>{}); }
function playDeath(){ deathSound.currentTime=0; deathSound.play().catch(()=>{}); }

function playBg(){ bgMusic.currentTime=0; bgMusic.play().catch(()=>{}); }
function pauseBg(){ bgMusic.pause(); }
