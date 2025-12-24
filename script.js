<<<<<<< HEAD
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });

    
});
// Open Modal
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

// Close Modal
function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";

  modal.querySelectorAll("video").forEach(v => {
    v.pause();
    v.currentTime = 0;
  });
}


// Close if clicking outside modal
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
=======
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });

    
});
// Open Modal
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

// Close Modal
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// Close if clicking outside modal
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
>>>>>>> 066078b20fa5685e21559c5410da56a81c571fd8
