export function getFullYear() {
    const year = document.querySelector("#rm-footer-year");

    if (year) year.innerText = new Date().getFullYear();
}