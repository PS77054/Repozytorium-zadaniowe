function PokazUkryjDoswiadczenie() {
    const section = document.getElementById("doswiadczenie");

    if (getComputedStyle(section).display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

function ZmienMotyw() {
    const style = document.getElementById("style");

    if (style.getAttribute("href") === "red.css") {
        style.setAttribute("href", "green.css");
    } else {
        style.setAttribute("href", "red.css");
    }
}