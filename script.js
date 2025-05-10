// script.js
let currentLang = "en";

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Smooth nav scrolling
  document.querySelectorAll('nav a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(a.getAttribute("href"))
              .scrollIntoView({ behavior: "smooth" });
    });
  });

  // Learn More → Features
  document.querySelector(".hero button")?.addEventListener("click", () => {
    document.querySelector("#features")
            .scrollIntoView({ behavior: "smooth" });
  });

  // Get Started → Contact
  document.querySelector(".price-plan button")?.addEventListener("click", () => {
    document.querySelector("#contact")
            .scrollIntoView({ behavior: "smooth" });
  });

  // Kick off
  setLanguage(currentLang);
});

function setLanguage(lang) {
  currentLang = lang;
  highlightSelectedLanguage(lang);
  updateImagesByLang(lang);
  updateVideoByLang(lang);
  loadContent(lang);
}

function highlightSelectedLanguage(lang) {
  document.getElementById("btn-en")
          .classList.toggle("active", lang === "en");
  document.getElementById("btn-zh")
          .classList.toggle("active", lang === "zh");
}

function updateImagesByLang(lang) {
  document.querySelectorAll("img[data-en-src]").forEach(img => {
    img.src = lang === "en" ? img.dataset.enSrc : img.dataset.zhSrc;
  });
}


function updateVideoByLang(lang) {
  const srcTag = document.getElementById("hero-media-source");
  if (!srcTag) return;

  // pick the right MP4
  srcTag.src = lang === "en"
    ? srcTag.dataset.enSrc
    : srcTag.dataset.zhSrc;

  // reload the <video> so it plays the new file
  document.getElementById("hero-media").load();
}

function loadContent(lang) {
  fetch(`content_${lang}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Language load failed");
      return res.json();
    })
    .then(populateContent)
    .catch(err => {
      console.error(err);
      if (lang !== "en") setLanguage("en");
    });
}

function populateContent(c) {
  // Hero
  document.getElementById("hero-title").textContent       = c.heroTitle;
  document.getElementById("hero-description").textContent = c.heroDescription;

  // Nav
  const nav = document.getElementById("nav-menu");
  nav.innerHTML = "";
  c.navLinks.forEach(l => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href        = `#${l.id}`;
    a.textContent = l.label;
    li.appendChild(a);
    nav.appendChild(li);
  });

  // Features
  document.getElementById("features-heading").textContent = c.featuresHeading;
  c.features.forEach((f,i) => {
    document.getElementById(`feature${i+1}-title`).textContent       = f.title;
    document.getElementById(`feature${i+1}-description`).textContent = f.description;
  });

  // Advantages
  document.getElementById("advantages-heading").textContent = c.advantagesHeading;
  c.advantages.forEach((a,i) => {
    document.getElementById(`advantage${i+1}-title`).textContent       = a.title;
    document.getElementById(`advantage${i+1}-description`).textContent = a.description;
  });

  // Pricing
  document.getElementById("pricing-heading").textContent    = c.pricingHeading;
  document.getElementById("pricing-description").textContent= c.pricingDescription;
  document.getElementById("pricing-title").textContent      = c.pricingTitle;
  document.getElementById("pricing-price").textContent      = c.pricingPrice;
  const pf = document.getElementById("pricing-features");
  pf.innerHTML = "";
  c.pricingFeatures.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    pf.appendChild(li);
  });
  document.getElementById("pricing-button").textContent = c.pricingButton;

  // Contact
  document.getElementById("contact-heading").textContent    = c.contactHeading;
  document.getElementById("contact-description").textContent= c.contactDescription;

  // Email
  document.getElementById("email-label").textContent = c.emailLabel;
  const emL = document.getElementById("email-link");
  emL.href = `mailto:${c.email}`;
  emL.textContent = c.email;

  // Custom method (WeChat / Discord)
  document.getElementById("method-label").textContent = c.contactMethod.label;
  const mL = document.getElementById("method-link");
  mL.href = c.contactMethod.href;
  const mImg = document.getElementById("method-image");
  mImg.src = c.contactMethod.imageSrc;
  mImg.alt = c.contactMethod.imageAlt;
}
