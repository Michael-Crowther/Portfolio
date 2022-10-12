///////////////////The Modal functionality
var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
////////////////End modal functionality




////////////////Sticky navbar
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
/////////////////End sticky nabar






window.addEventListener('load', function() {
    const toggleButton = document.getElementsByClassName('navbar-toggle')[0];
    const navbarLinks  = document.getElementsByClassName('navbar-links');
    toggleButton.addEventListener("click", function() {
        for (var i = 0; i < navbarLinks.length; i++) 
            navbarLinks[i].classList.toggle("active");
    });
});
