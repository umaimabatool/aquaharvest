//==================================================
// app.js
// AquaHarvest Main Application
//==================================================

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initScrollReveal();
    initCounterAnimation();
    initBackToTop();
    initProgressBar();
    initRippleButtons();
    initTheme();
    initSmoothScroll();
    initHeroEffects();
    initParallax();
    preloadImages();

});

//==================================================
// Sticky Navbar
//==================================================

function initNavbar(){

    const navbar = document.querySelector(".glass-nav");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 80){

            navbar.classList.add("nav-scrolled");

        }else{

            navbar.classList.remove("nav-scrolled");

        }

    });

}

//==================================================
// Scroll Reveal Animation
//==================================================

function initScrollReveal(){

    const elements=document.querySelectorAll(
        ".feature-card,.product-card,.ai-card,.glass-card,.fade-up,.fade-left,.fade-right,.zoom-in"
    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>observer.observe(el));

}

//==================================================
// Animated Counters
//==================================================

function initCounterAnimation(){

    const counters=document.querySelectorAll(".hero-stats h2");

    counters.forEach(counter=>{

        const target=parseInt(counter.innerText);

        if(isNaN(target)) return;

        let count=0;

        const speed=Math.ceil(target/120);

        const update=()=>{

            count+=speed;

            if(count>=target){

                counter.innerText=target+"+";

                return;

            }

            counter.innerText=count+"+";

            requestAnimationFrame(update);

        };

        update();

    });

}

//==================================================
// Back To Top
//==================================================

function initBackToTop(){

    const btn=document.getElementById("backToTop");

    if(!btn) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            btn.classList.add("show");

        }else{

            btn.classList.remove("show");

        }

    });

    btn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

//==================================================
// Scroll Progress Bar
//==================================================

function initProgressBar(){

    const bar=document.getElementById("progressBar");

    if(!bar) return;

    window.addEventListener("scroll",()=>{

        const total=document.documentElement.scrollHeight-window.innerHeight;

        const progress=(window.scrollY/total)*100;

        bar.style.width=progress+"%";

    });

}

//==================================================
// Ripple Effect
//==================================================

function initRippleButtons(){

    document.querySelectorAll(".btn").forEach(button=>{

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="ripple";

            const rect=this.getBoundingClientRect();

            ripple.style.left=e.clientX-rect.left+"px";
            ripple.style.top=e.clientY-rect.top+"px";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

}

//==================================================
// Dark / Light Mode
//==================================================

function initTheme(){

    const toggle=document.getElementById("themeToggle");

    if(!toggle) return;

    const saved=localStorage.getItem("theme");

    if(saved==="light"){

        document.body.classList.add("light-mode");

    }

    toggle.addEventListener("click",()=>{

        document.body.classList.toggle("light-mode");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("light-mode")

            ? "light"

            : "dark"

        );

    });

}

//==================================================
// Smooth Anchor Scroll
//==================================================

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",(e)=>{

            e.preventDefault();

            const target=document.querySelector(anchor.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}

//==================================================
// Hero Mouse Effect
//==================================================

function initHeroEffects(){

    const hero=document.querySelector(".floating-dashboard");

    if(!hero) return;

    document.addEventListener("mousemove",(e)=>{

        const x=(window.innerWidth/2-e.clientX)/40;

        const y=(window.innerHeight/2-e.clientY)/40;

        hero.style.transform=

        `rotateY(${x}deg) rotateX(${-y}deg)`;

    });

}

//==================================================
// Background Parallax
//==================================================

function initParallax(){

    const video=document.querySelector(".hero-video");

    if(!video) return;

    window.addEventListener("scroll",()=>{

        video.style.transform=

        `translateY(${window.scrollY*.25}px)`;

    });

}

//==================================================
// Lazy Image Loading
//==================================================

function preloadImages(){

    const imgs=document.querySelectorAll("img");

    imgs.forEach(img=>{

        img.loading="lazy";

    });

}

//==================================================
// Toast Notification
//==================================================

function showToast(message,type="success"){

    let toast=document.createElement("div");

    toast.className="toast-notification";

    toast.innerHTML=`

        <i class="bi bi-check-circle-fill"></i>

        <span>${message}</span>

    `;

    toast.style.position="fixed";
    toast.style.top="30px";
    toast.style.right="30px";
    toast.style.padding="16px 24px";
    toast.style.borderRadius="14px";
    toast.style.zIndex="999999";
    toast.style.background=
        type==="success"
        ?"#00c98d"
        :"#ff4d4d";
    toast.style.color="#fff";
    toast.style.fontWeight="600";
    toast.style.boxShadow="0 15px 40px rgba(0,0,0,.25)";

    document.body.appendChild(toast);

    toast.classList.add("toast-show");

    setTimeout(()=>{

        toast.classList.remove("toast-show");
        toast.classList.add("toast-hide");

        setTimeout(()=>{

            toast.remove();

        },500);

    },3000);

}

//==================================================
// Export
//==================================================

window.showToast = showToast;