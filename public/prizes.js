let lstPrizes = [];

const readPrizes = async function() {
    const response = await fetch('/prize');
    lstPrizes = await response.json(); // extract JSON from response
    let out = `<table class="table table-striped table-hover">
                 <tr>
                   <th>Name</th>
                   <th>Description</th>
                   <th>Category</th>
                   <th>Points Cost</th>
                   <th>Stock</th>
                 </tr>`;
    for (let i = 0; i < lstPrizes.length; i++) {
        out += `<tr>
                  <td>${lstPrizes[i].name}</td>
                  <td>${lstPrizes[i].description}</td>
                  <td>${lstPrizes[i].category}</td>
                  <td>${lstPrizes[i].pointsCost} pts</td>
                  <td>${lstPrizes[i].stock}</td>
                </tr>`;
    }
    out += `</table>`;
    document.getElementById('prizesData').innerHTML = out;
}

function showPrizes() {
    document.getElementById("prizes").setAttribute("style", "visibility:visible;display:block");
    document.getElementById("showBtn").setAttribute("style", "visibility:hidden");
    document.getElementById("hideBtn").setAttribute("style", "visibility:visible");
    readPrizes();
}

function hidePrizes() {
    document.getElementById("prizes").setAttribute("style", "visibility:hidden;display:none");
    document.getElementById("showBtn").setAttribute("style", "visibility:visible");
    document.getElementById("hideBtn").setAttribute("style", "visibility:hidden");
}
