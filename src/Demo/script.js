document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                anime({
                    targets: entry.target,
                    innerHTML: [0, target],
                    easing: 'linear',
                    round: 1,
                    duration: 2000
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => observer.observe(counter));
});


function duplicateTestimonials() {
    const tracks = document.querySelectorAll('.testimonial-track');

    tracks.forEach(track => {
        const clone = track.innerHTML;
        track.innerHTML = clone + clone + clone; // Triple the content for smooth infinite scroll
    });
}

document.addEventListener('DOMContentLoaded', duplicateTestimonials);


const testimonialContainer = document.getElementById('testimonial-container');
const dots = [
    document.getElementById('dot-0'),
    document.getElementById('dot-1'),
    document.getElementById('dot-2')
];
let currentSlide = 0;

function showSlide(index) {
    testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-primary', i === index);
        dot.classList.toggle('bg-gray-300', i !== index);
    });
    currentSlide = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

function nextSlide() {
    showSlide((currentSlide + 1) % 3);
}

setInterval(nextSlide, 5000);