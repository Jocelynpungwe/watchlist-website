let watchlistArray = JSON.parse(localStorage.getItem("wishlist"))

displaytest = [...watchlistArray]

console.log(displaytest.join(""))

document.getElementById("section-b").innerHTML = displaytest.join("")