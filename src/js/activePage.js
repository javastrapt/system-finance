const pathname = window.location.pathname;
const navlinks = document.querySelectorAll('.nav-link')

console.log(navlinks[0])

navlinks.forEach((link) => {
    if(link.href.includes(pathname)) {
        link.classList.add('active')
    }
})
