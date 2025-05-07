let currentLang = "en";
// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

// Optional: Add any other simple interactions here if needed.
// For example, a simple animation on scroll, or handling the 'Learn More' button.

// Example for 'Learn More' button scroll
const learnMoreButton = document.querySelector(".hero button");
if (learnMoreButton) {
    learnMoreButton.addEventListener("click", function () {
        const featuresSection = document.querySelector("#features");
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// Example for 'Get Started' button scroll (in pricing)
const getStartedButton = document.querySelector(".price-plan button");
if (getStartedButton) {
    getStartedButton.addEventListener("click", function () {
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);
});

function setLanguage(lang) {
    currentLang = lang;
    loadContent(lang);
    highlightSelectedLanguage(lang);
}

function highlightSelectedLanguage(lang) {
    document.getElementById("btn-en").classList.toggle("active", lang === "en");
    document.getElementById("btn-zh").classList.toggle("active", lang === "zh");
}

function loadContent(lang) {
    fetch(`content_${lang}.json`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load language file");
            return res.json();
        })
        .then((content) => populateContent(content))
        .catch((err) => {
            console.error(`Error loading ${lang} content:`, err);
            if (lang !== "en") {
                console.log("Falling back to English...");
                loadContent("en");
            }
        });
}

function populateContent(content) {
    document.getElementById("hero-title").textContent = content.heroTitle;
    document.getElementById("hero-description").textContent =
        content.heroDescription;

    const navMenu = document.getElementById("nav-menu");
    navMenu.innerHTML = ""; // Clear existing items

    content.navLinks.forEach((link) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${link.id}`;
        a.textContent = link.label;
        li.appendChild(a);
        navMenu.appendChild(li);
    });

    document.getElementById("features-heading").textContent =
        content.featuresHeading;
    content.features.forEach((f, i) => {
        document.getElementById(`feature${i + 1}-title`).textContent = f.title;
        document.getElementById(`feature${i + 1}-description`).textContent =
            f.description;
    });

    document.getElementById("advantages-heading").textContent =
        content.advantagesHeading;
    content.advantages.forEach((a, i) => {
        document.getElementById(`advantage${i + 1}-title`).textContent =
            a.title;
        document.getElementById(`advantage${i + 1}-description`).textContent =
            a.description;
    });

    document.getElementById("pricing-heading").textContent =
        content.pricingHeading;
    document.getElementById("pricing-description").textContent =
        content.pricingDescription;
    document.getElementById("pricing-price").textContent = content.pricingPrice;

    document.getElementById("contact-heading").textContent =
        content.contactHeading;
    document.getElementById("contact-description").textContent =
        content.contactDescription;

    const emailLink = document.getElementById("email-link");
    emailLink.href = `mailto:${content.email}`;
    emailLink.textContent = content.email;

    document.getElementById("pricing-heading").textContent =
        content.pricingHeading;
    document.getElementById("pricing-description").textContent =
        content.pricingDescription;
    document.getElementById("pricing-title").textContent = content.pricingTitle;
    document.getElementById("pricing-price").textContent = content.pricingPrice;

    const featuresList = document.getElementById("pricing-features");
    featuresList.innerHTML = ""; // Clear existing items
    content.pricingFeatures.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    document.getElementById("pricing-button").textContent =
        content.pricingButton;

    document.getElementById("contact-heading").textContent =
        content.contactHeading;
    document.getElementById("contact-description").textContent =
        content.contactDescription;
    document.getElementById("email-label").textContent = content.emailLabel;
    document.getElementById("email-link").href = `mailto:${content.email}`;
    document.getElementById("email-link").textContent = content.email;
    document.getElementById("wechat-label").textContent = content.wechatLabel;
}
