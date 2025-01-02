function showAlert() {
    alert("This feature cannot be used yet");
}

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    });

    const animatedElements = document.querySelectorAll(".fade-in-right, .fade-in-left, .fade-in-bottom");
    animatedElements.forEach(el => observer.observe(el));
});

const buttons = document.querySelectorAll('.slc-btn');
const defaultBtn = document.querySelector('.default-slc');
const projectsBtn = document.getElementById("projects");
const techBtn = document.getElementById("tech");
const certifBtn = document.getElementById("certif");
const containerOpsi = document.getElementById("container-ops");

const ctrlProjects = document.getElementById("ctrl-projects");
const ctrlTech = document.getElementById("ctrl-tech");
const ctrlCertif = document.getElementById("ctrl-certif");

defaultBtn.classList.add('active');


buttons.forEach(button => {
  button.addEventListener('click', () => {

    buttons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
  });
});


projectsBtn.addEventListener('click', () => {
    ctrlTech.style.display = 'none';
    ctrlCertif.style.display = 'none'
    ctrlProjects.style.display = 'flex'
})

techBtn.addEventListener('click', () => {
    ctrlProjects.style.display = 'none'
    ctrlCertif.style.display = 'none    '
    ctrlTech.style.display = 'flex';
})

certifBtn.addEventListener('click', () => {
    ctrlCertif.style.display = 'flex'
    ctrlProjects.style.display = 'none'
    ctrlTech.style.display = 'none';
})
