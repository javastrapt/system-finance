// DATA

const thisyear = new Date().getFullYear();
const pages = ["Home", "Events", "Apps", "About", "Contact"];
const pathname = window.location.pathname;

const page = [
  {
    hero: {
      title: "CLI-Runner",
      description:
        "Powered by the popular css Framework 'Bootstrap', the CLI-Runner is a small sketch - a snippet - that with the two engines you need to get your media regardless of the source.  Simply get to your 'Network' tab in your DevTools, find the media you need, 'Copy as URL' and paste in the correct form below .  Sign-up free and free to use <em>for downloading your own media materials from the internet</em>",
    },
  },
];

// DOM
const navLinksEl = document.querySelectorAll(".nav-link");
const navLinks = document.querySelectorAll(".nav-links");
const navItemsEl = document.querySelectorAll(".nav-item");
const contentEl = document.querySelector(".content");
const thisYearEl = document.querySelector("#this-year");
const btnForm = document.querySelector("#btn-form");
const formEl = document.querySelector("form");
// LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  getActive();
  loadPage();
});

btnForm.addEventListener("click", () => {
  contentEl.classList.remove("d-none");
});
formEl.addEventListener("submit", async (e) => {
  handleSubmit(e);
});

// FUNCTIONS

function loadPage() {
  //     // copyright
  //     thisYearEl.textContent = new Date().getFullYear();
  //     // nav
  //     pages.forEach((page) => {
  //       const li = document.createElement("li");
  //       li.classList.add("nav-item");
  //       li.textContent = page;
  //       const a = document.createElement('a');
  //       if (page == "Home" || page == "home" || page == "/") {
  //         a.href="/";
  //         a.textContent = "Home"
  //       } else {
  //       a.href =`/${page.toLowerCase()}`;
  //       a.textContent = page;
  //       li.appendChild(a);
  //       navLinks.appendChild(li);
  // }
  // });
}

function getActive() {
  console.log(`navLinks: ${JSON.stringify(navLinks, null, 2)}`);
  navLinks.forEach((link) => {
    const href = link.href;
    const pathname = window.location.pathname;

    console.log(`href = ${href}, pathname = ${pathname}`);

    if (link.href === window.location.href || link.href == "views/form.html") {
      link.setAttribute("aria-current", "page");
      link.classList.add("active");
    }
  });
}
async function handleSubmit(e) {
  e.preventDefault();
  alert("A Default has been prevented...");
}

function showModal() {
  const formModal = new bootstrap.Modal(document.querySelector("#formModal"));
}
