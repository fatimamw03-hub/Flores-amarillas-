const intro = document.getElementById("intro");
const garden = document.getElementById("garden");
const crown = document.getElementById("crown");
const message = document.getElementById("message");
const start = document.getElementById("start");

function heartPoints(n=115){
  const pts=[];
  let tries=0;
  while(pts.length<n && tries<n*20){
    tries++;
    const x=Math.random()*2.5-1.25;
    const y=Math.random()*2.35-1.25;
    const inside=Math.pow(x*x+y*y-1,3)-x*x*Math.pow(y,3);
    if(inside<=0){
      const nx=50 + x*27;
      const ny=53 + (-y)*22;
      if(nx>7 && nx<93 && ny>5 && ny<92) pts.push([nx,ny]);
    }
  }
  return pts;
}

function addFlower(x,y,i){
  const f=document.createElement("span");
  f.className="flower small";
  f.innerHTML='<span class="petals"></span><span class="center"></span>';
  f.style.left=x+"%";
  f.style.top=y+"%";
  f.style.animation=`bloom .55s cubic-bezier(.2,.8,.2,1) ${i*32}ms forwards`;
  crown.appendChild(f);
}

start.addEventListener("click",()=>{
  intro.style.display="none";
  garden.classList.remove("hidden");
  garden.setAttribute("aria-hidden","false");
  const pts=heartPoints(125);
  pts.sort((a,b)=>a[1]-b[1]);
  pts.forEach((p,i)=>addFlower(p[0],p[1],i));
  setTimeout(()=>message.classList.add("show"), pts.length*32+900);
});
