const OBSTACLE_SOURCES = [
  "assets/obstacles/nora.png",
  "assets/obstacles/disha.png",
  "assets/obstacles/sam.png",
  "assets/obstacles/tammu.png"
];

const OBSTACLE_IMAGES = OBSTACLE_SOURCES.map(src=>{
  const img=new Image(); img.src=src; return img;
});

class Game{
  constructor(canvas){
    this.canvas=canvas;
    this.ctx=canvas.getContext("2d");
    this.reset();
  }

  reset(){
    this.w=this.canvas.width=window.innerWidth;
    this.h=this.canvas.height=window.innerHeight;

    this.y=this.h/2;
    this.vy=0;

    this.gravity=0.6;
    this.lift=-10;

    this.pipes=[];
    this.score=0;
    this.alive=false;

    this.pipeGap=Math.max(220, this.h*0.32);  
    this.pipeSpeed=4;

    this.character=CHARACTERS[0];
    this.theme=THEMES[0];

    this.spawnTimer=0;
  }

  start(characterId, themeId){
    this.reset();
    this.alive=true;

    this.character = CHARACTERS.find(c=>c.id===characterId);
    this.theme = THEMES.find(t=>t.id===themeId);

    // ⭐ get rarity for pipe glow effect
    this.charRarity = RARITY[this.character.id] || "common";

    requestAnimationFrame(()=>this.loop());
  }

  flap(){
    if(!this.alive) return;
    this.vy=this.lift;
    // playJump();  <-- removed
  }

  update(){
    if(!this.alive) return;

    this.vy+=this.gravity;
    this.y+=this.vy;

    if(this.y>this.h+100 || this.y<-100){
      this.die();
      return;
    }

    this.spawnTimer++;
    if(this.spawnTimer>90){
      this.spawnTimer=0;
      this.spawnPipe();
    }

    for(let i=this.pipes.length-1;i>=0;i--){
      const p=this.pipes[i];
      p.x-=this.pipeSpeed;

      if(!p.scored && p.x+p.w<120){
        p.scored=true;
        this.score++;
        Shop.grantCoins(5);
      }

      if(this.collides(p)){
        this.die();
        return;
      }

      if(p.x+p.w<-80) this.pipes.splice(i,1);
    }
  }

  spawnPipe(){
    const top=Math.random()*(this.h - this.pipeGap - 200) + 80;

    this.pipes.push({
      x:this.w+20,
      yTop:0,
      hTop:top,
      yBottom:top+this.pipeGap,
      hBottom:this.h-(top+this.pipeGap),
      w:70,
      scored:false,
      obsIndex: Math.floor(Math.random()*OBSTACLE_IMAGES.length)
    });
  }

  collides(p){
    const cx=120;
    const cy=this.y;
    const r=25;

    if(cx+r>p.x && cx-r<p.x+p.w){
      if(cy-r<p.hTop) return true;
      if(cy+r>p.yBottom) return true;
    }

    return false;
  }

  die(){
    if(!this.alive) return;
    this.alive=false;

    playDeath();
    pauseBg();   

    if(this.onGameOver) this.onGameOver(this.score);
  }

  drawCharacter(){
    const ctx=this.ctx;
    const img=this.character._img;
    const size=60;

    ctx.save();
    ctx.beginPath();
    ctx.arc(120, this.y, size/2, 0, Math.PI*2);
    ctx.clip();

    if(img.complete){
      const iw=img.width, ih=img.height;
      let sx=0, sy=0, sw=iw, sh=ih;

      if(iw>ih){ sw=ih; sx=(iw-ih)/2; }
      else { sh=iw; sy=(ih-iw)/2; }

      ctx.drawImage(img, sx,sy,sw,sh, 120-size/2, this.y-size/2, size, size);
    }

    ctx.restore();

    ctx.strokeStyle="#0005";
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.arc(120,this.y,size/2,0,Math.PI*2);
    ctx.stroke();
  }

  applyPipeBorder(x, y, w, h) {
    const ctx = this.ctx;

    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    if (this.charRarity === "common") {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
    }

    else if (this.charRarity === "rare") {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#4aa3ff";
    }

    else if (this.charRarity === "epic") {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#d400ff";
      ctx.shadowColor = "#ff00ff";
      ctx.shadowBlur = 15;
    }

    else if (this.charRarity === "legendary") {
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#ffcc00";
      ctx.shadowColor = "#ffdd55";
      ctx.shadowBlur = 25;
    }

    ctx.strokeRect(x, y, w, h);

    ctx.shadowBlur = 0;
  }

  draw(){
    this.w=this.canvas.width=window.innerWidth;
    this.h=this.canvas.height=window.innerHeight;

    const bg=this.theme._img;
    if(bg.complete){
      const rCanvas=this.w/this.h;
      const rImg=bg.width/bg.height;
      let w,h,x,y;

      if(rImg>rCanvas){
        h=this.h; w=h*rImg; x=(this.w-w)/2; y=0;
      } else {
        w=this.w; h=w/rImg; x=0; y=(this.h-h)/2;
      }

      this.ctx.drawImage(bg, x,y,w,h);

      this.ctx.fillStyle = "rgba(0,0,0,0.35)";
      this.ctx.fillRect(0,0,this.w,this.h);
    }

    for(const p of this.pipes){
      const img=OBSTACLE_IMAGES[p.obsIndex];

      if(img.complete){
        this.ctx.drawImage(img, p.x, 0, p.w, p.hTop);
        this.ctx.drawImage(img, p.x, p.yBottom, p.w, p.hBottom);

      } else {
        this.ctx.fillStyle="#2d3748";
        this.ctx.fillRect(p.x,0,p.w,p.hTop);
        this.ctx.fillRect(p.x,p.yBottom,p.w,p.hBottom);
      }

      this.applyPipeBorder(p.x, 0, p.w, p.hTop);
      this.applyPipeBorder(p.x, p.yBottom, p.w, p.hBottom);
    }

    this.drawCharacter();
  }

  loop(){
    if(!this.alive) return;
    this.update();
    this.draw();
    requestAnimationFrame(()=>this.loop());
  }
}

window.Game=Game;
