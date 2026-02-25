function showPrizes() {
    document.getElementById("prizes").setAttribute("style", "visibility:visible;display:block");
    document.getElementById("showBtn").setAttribute("style", "visibility:hidden");
    document.getElementById("hideBtn").setAttribute("style", "visibility:visible");
}

function hidePrizes() {
    document.getElementById("prizes").setAttribute("style", "visibility:hidden;display:none");
    document.getElementById("showBtn").setAttribute("style", "visibility:visible");
    document.getElementById("hideBtn").setAttribute("style", "visibility:hidden");
}