const loader = document.getElementById("loader");

const galleryPhotos = [
  { src: "assets/Main.jpeg", caption: "My favorite main memory ♥" },
  { src: "assets/Centree.jpeg", caption: "The center of my whole world." },
  { src: "assets/anoushka-1.jpeg", caption: "That smile I could look at forever." },
  { src: "assets/anoushka-2.jpeg", caption: "Beautiful, effortlessly." },
  { src: "assets/anoushka-3.jpeg", caption: "My birthday girl ♥" },
  { src: "assets/us-1.jpeg", caption: "One of my favourite us moments." },
  { src: "assets/us-2.jpeg", caption: "Us. That's my favourite place." },
  { src: "assets/WhatsApp Image 2026-09-25 at 12.50.51 PM.jpeg", caption: "More reasons to keep smiling." },
  { src: "assets/WhatsApp Image 2026-09-25 at 4.00.15 PM.jpeg", caption: "Soft hearts, warm memories." },
  { src: "assets/WhatsApp Image 2026-09-25 at 4.00.18 PM.jpeg", caption: "Our beautiful little world." }
];

const memoryPhotos = [
  { src: "assets/Main.jpeg", label: "01 Main memory" },
  { src: "assets/Centree.jpeg", label: "02 Centree moment" },
  { src: "assets/anoushka-1.jpeg", label: "03 My favorite girl" },
  { src: "assets/us-1.jpeg", label: "04 Us in the best moments" },
  { src: "assets/anoushka-2.jpeg", label: "05 Pure light and beauty" },
  { src: "assets/us-2.jpeg", label: "06 Forever kind of love" },
  { src: "assets/anoushka-3.jpeg", label: "07 The smile I never get tired of" },
  { src: "assets/WhatsApp Image 2026-09-25 at 4.00.15 PM.jpeg", label: "08 Our little universe" }
];

const momentsGallery = document.getElementById("momentsGallery");
if (momentsGallery) {
  momentsGallery.innerHTML = galleryPhotos.map((photo, index) => `
    <figure class="gallery-card ${index === 0 ? "big" : ""}">
      <img src="${photo.src}" alt="${photo.caption}">
      <figcaption>${photo.caption}</figcaption>
    </figure>
  `).join("");
}

const memoryScreen = document.getElementById("memoryScreen");
if (memoryScreen) {
  memoryScreen.innerHTML = memoryPhotos.map((photo, index) => `
    <div class="memory-slide ${index === 0 ? "active" : ""}">
      <img src="${photo.src}" alt="${photo.label}">
      <div class="memory-caption"><span>${String(index + 1).padStart(2, "0")}</span> ${photo.label.replace(/^\d+\s/, "")}</div>
    </div>
  `).join("");
}

window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 900));

const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");
const playHero = document.getElementById("playHero");
const openLetterBtn = document.getElementById("openLetterBtn");
const letterRevealBtn = document.getElementById("letterRevealBtn");
const shareWhatsAppBtn = document.getElementById("shareWhatsAppBtn");
const shareHeroBtn = document.getElementById("shareHeroBtn");
const letterPanel = document.getElementById("letterPanel");
const audioSource = song.querySelector("source");

function shareOnWhatsApp() {
  const text = "Happy Birthday, Anoushka! ❤️ I made this for you. " + window.location.href;
  const shareUrl = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(shareUrl, "_blank", "noopener,noreferrer");
}

function revealLetter() {
  if (!letterPanel) return;
  letterPanel.classList.add("open");

  setTimeout(() => {
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

if (openLetterBtn) openLetterBtn.addEventListener("click", revealLetter);
if (letterRevealBtn) letterRevealBtn.addEventListener("click", revealLetter);
if (shareWhatsAppBtn) shareWhatsAppBtn.addEventListener("click", shareOnWhatsApp);
if (shareHeroBtn) shareHeroBtn.addEventListener("click", shareOnWhatsApp);

function setMusicUI(isPlaying) {
  musicBtn.innerHTML = isPlaying ? "<span>Ⅱ</span> Our Song" : "<span>▶</span> Our Song";
  playHero.textContent = isPlaying ? "Ⅱ Our Song" : "♥ Play Our Song";
}

let musicAutoplayAttempted = false;

function startMusicAutoplay() {
  if (!audioSource || !audioSource.src || !song || musicAutoplayAttempted) return;
  musicAutoplayAttempted = true;

  song.volume = 0.8;
  song.muted = true;
  song.autoplay = true;

  const beginPlayback = () => {
    song.play().then(() => {
      setMusicUI(true);
      setTimeout(() => {
        song.muted = false;
        song.volume = 0.8;
      }, 500);
    }).catch(() => {
      setMusicUI(false);
      song.muted = false;
      song.volume = 0.8;
    });
  };

  if (song.readyState >= 2) {
    beginPlayback();
  } else {
    song.addEventListener("canplay", beginPlayback, { once: true });
    song.load();
  }
}

function toggleMusic() {
  if (!audioSource || !audioSource.src) {
    musicBtn.title = "Add assets/until-i-found-you.mp3 to enable music";
    return;
  }

  if (song.paused) {
    song.muted = false;
    song.play().then(() => {
      setMusicUI(true);
    }).catch(() => {});
  } else {
    song.pause();
    setMusicUI(false);
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    startMusicAutoplay();
  }, 300);
});

window.addEventListener("pointerdown", () => {
  if (song && !song.paused && song.muted) {
    song.muted = false;
  }
}, { once: true });

musicBtn.addEventListener("click", toggleMusic);
playHero.addEventListener("click", toggleMusic);

const memorySlides = Array.from(document.querySelectorAll(".memory-slide"));
const reelToggle = document.getElementById("reelToggle");
const reelPrev = document.getElementById("reelPrev");
const reelNext = document.getElementById("reelNext");
let currentMemoryIndex = 0;
let memoryTimer = null;

function showMemorySlide(index) {
  if (!memorySlides.length) return;

  currentMemoryIndex = (index + memorySlides.length) % memorySlides.length;

  memorySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentMemoryIndex);
  });
}

function startMemoryReel() {
  if (!memorySlides.length) return;

  clearInterval(memoryTimer);
  memoryTimer = setInterval(() => {
    showMemorySlide(currentMemoryIndex + 1);
  }, 1800);

  if (reelToggle) {
    reelToggle.textContent = "Pause reel";
  }
}

function pauseMemoryReel() {
  clearInterval(memoryTimer);
  if (reelToggle) {
    reelToggle.textContent = "Play reel";
  }
}

if (memorySlides.length) {
  showMemorySlide(0);
  startMemoryReel();

  reelToggle?.addEventListener("click", () => {
    if (memoryTimer) {
      pauseMemoryReel();
      memoryTimer = null;
    } else {
      startMemoryReel();
    }
  });

  reelPrev?.addEventListener("click", () => {
    showMemorySlide(currentMemoryIndex - 1);
    startMemoryReel();
  });

  reelNext?.addEventListener("click", () => {
    showMemorySlide(currentMemoryIndex + 1);
    startMemoryReel();
  });
}

const surpriseModal = document.getElementById("surpriseModal");
document.getElementById("surpriseBtn").addEventListener("click", () => {
  surpriseModal.classList.add("open");
  burstConfetti();
});
document.getElementById("closeModal").addEventListener("click", () => surpriseModal.classList.remove("open"));
surpriseModal.addEventListener("click", e => {
  if (e.target === surpriseModal) surpriseModal.classList.remove("open");
});

function createHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > .35 ? "♥" : "♡";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = (10 + Math.random() * 18) + "px";
  h.style.animationDuration = (7 + Math.random() * 7) + "s";
  h.style.animationDelay = Math.random() * 2 + "s";
  document.getElementById("hearts").appendChild(h);
  setTimeout(() => h.remove(), 16000);
}
setInterval(createHeart, 650);

function burstConfetti() {
  const wrap = document.getElementById("confetti");
  const chars = ["♥","✦","✧","•"];
  for (let i=0;i<90;i++) {
    const c = document.createElement("div");
    c.textContent = chars[Math.floor(Math.random()*chars.length)];
    c.style.position = "absolute";
    c.style.left = "50%";
    c.style.top = "50%";
    c.style.color = ["#ff7f96","#ffd7a8","#fff0ea","#d9a6ff"][Math.floor(Math.random()*4)];
    c.style.fontSize = (8+Math.random()*18)+"px";
    c.style.transition = "transform 1.7s cubic-bezier(.2,.8,.2,1), opacity 1.7s";
    wrap.appendChild(c);
    requestAnimationFrame(() => {
      const x = (Math.random()-.5)*window.innerWidth*1.3;
      const y = (Math.random()-.5)*window.innerHeight*1.1;
      c.style.transform = `translate(${x}px,${y}px) rotate(${Math.random()*720-360}deg)`;
      c.style.opacity = "0";
    });
    setTimeout(()=>c.remove(),1800);
  }
}

// If the audio file is not present, keep the UI graceful.
song.addEventListener("error", () => {
  musicBtn.title = "Add assets/until-i-found-you.mp3 to enable music";
});
