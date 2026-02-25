function showprizes() {
    document.getElementById("prizes").setAttribute("style", "visibility:visible;display:block");
    document.getElementById("points-content").setAttribute("style", "visibility:hidden;display:none");
}

function hideprizes() {
    document.getElementById("prizes").setAttribute("style", "visibility:hidden;display:none");
    document.getElementById("points-content").setAttribute("style", "visibility:visible;display:block");
}
