/* =========================================
   TYPING ANIMATION
========================================= */

const words = [
    "DEVELOPER",
    "DATA ANALYST",
    "PYTHON DEVELOPER",
    "FULL-STACK DEVELOPER",
    "PROBLEM SOLVER"
];

const typingElement = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 90
    );
}


typeEffect();



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function animateCursor() {

    cursorX +=
        (mouseX - cursorX) * 0.15;

    cursorY +=
        (mouseY - cursorY) * 0.15;


    cursor.style.left =
        cursorX + "px";

    cursor.style.top =
        cursorY + "px";


    cursorDot.style.left =
        mouseX + "px";

    cursorDot.style.top =
        mouseY + "px";


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();



/* =========================================
   CURSOR HOVER EFFECT
========================================= */

const interactiveElements =
    document.querySelectorAll(
        "a, button, .skill-card, .project-card"
    );


interactiveElements.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            cursor.style.width = "60px";
            cursor.style.height = "60px";

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            cursor.style.width = "35px";
            cursor.style.height = "35px";

        }
    );

});



/* =========================================
   PARTICLE BACKGROUND
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


document.addEventListener(
    "mousemove",
    (event) => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 1.8 + .5;

        this.speedX =
            (Math.random() - .5) * .4;

        this.speedY =
            (Math.random() - .5) * .4;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x < 0 ||
            this.x > canvas.width) {

            this.speedX *= -1;

        }


        if (this.y < 0 ||
            this.y > canvas.height) {

            this.speedY *= -1;

        }


        if (mouse.x !== null) {

            const dx =
                this.x - mouse.x;

            const dy =
                this.y - mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                this.x +=
                    dx / distance * 1.5;

                this.y +=
                    dy / distance * 1.5;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(140,255,0,0.55)";

        ctx.fill();

    }

}



function createParticles() {

    particles = [];

    const amount =
        Math.min(
            Math.floor(
                window.innerWidth / 10
            ),
            140
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 100) {

                const opacity =
                    1 - distance / 100;


                ctx.strokeStyle =
                    `rgba(140,255,0,${opacity * .12})`;


                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );


    connectParticles();


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =========================================
   PARALLAX HERO
========================================= */

const orb =
    document.querySelector(".orb");


document.addEventListener(
    "mousemove",
    (event) => {

        if (!orb) return;


        const x =
            (window.innerWidth / 2 -
            event.clientX) / 40;


        const y =
            (window.innerHeight / 2 -
            event.clientY) / 40;


        orb.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);

/* =========================================
   MOBILE HAMBURGER MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");

});


/* Close menu when a navigation link is clicked */

const navItems = document.querySelectorAll("#navLinks a");

navItems.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

    });

});