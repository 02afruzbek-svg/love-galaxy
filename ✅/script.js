
const home = document.getElementById("home");
const universe = document.getElementById("universe");

const enterBtn = document.getElementById("enterBtn");
const magicBtn = document.getElementById("magicBtn");
const backBtn = document.getElementById("backBtn");

const portal = document.getElementById("portal");
const flash = document.getElementById("flash");
const magicMessage = document.getElementById("magicMessage");

// Sahifalarni almashtirish
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}

// Portalni ochish
enterBtn.addEventListener("click", () => {
    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");

    portal.style.transform = "scale(1.5)";

    setTimeout(() => {
        showScreen(universe);
        portal.style.transform = "";
    }, 450);
});

// Mo'jiza tugmasi
magicBtn.addEventListener("click", () => {
    magicMessage.classList.add("show");
    magicBtn.textContent = "✨ MO‘JIZA RO‘Y BERDI ✨";

    createHearts();
});

// Orqaga qaytish
backBtn.addEventListener("click", () => {
    magicMessage.classList.remove("show");
    magicBtn.textContent = "MO‘JIZANI KO‘R ✨";
    showScreen(home);
});

// Yulduzlar yaratish
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resize() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;

    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = [];

    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            size: Math.random() * 1.8,
            alpha: Math.random(),
            speed: Math.random() * 0.015 + 0.003
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    stars.forEach(star => {
        star.alpha += star.speed;

        if (star.alpha > 1 || star.alpha < 0.1) {
            star.speed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 180, 245, ${star.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ed65ff";
        ctx.fill();
    });

    ctx.shadowBlur = 0;

    requestAnimationFrame(drawStars);
}

resize();
drawStars();

window.addEventListener("resize", resize);

// Yurakchalar animatsiyasi
function createHearts() {
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");

        heart.textContent = "♥";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";
        heart.style.color = "#ff73ce";
        heart.style.fontSize = (15 + Math.random() * 25) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "5";

        document.body.appendChild(heart);

        const duration = 2500 + Math.random() * 2000;

        const animation = heart.animate([
            {
                transform: "translateY(0) rotate(0deg)",
                opacity: 1
            },
            {
                transform: `translateY(-${innerHeight + 100}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: "ease-out"
        });

        animation.onfinish = () => heart.remove();
    }
}
