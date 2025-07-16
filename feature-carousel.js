document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let interval = null;

  // Touch/drag variables
  let startX = 0;
  let isDragging = false;
  let lastDirection = 'right'; // Track direction for animation

  function showSlide(idx, direction = 'right') {
    slides.forEach((slide, i) => {
      slide.classList.remove('slide-in-left', 'slide-in-right', 'fade-in');
      if (i === idx) {
        slide.classList.add('active');
        slide.classList.add('fade-in');
        if (direction === 'left') slide.classList.add('slide-in-left');
        else if (direction === 'right') slide.classList.add('slide-in-right');
        setTimeout(() => {
          slide.classList.remove('slide-in-left', 'slide-in-right', 'fade-in');
        }, 1200);
      } else {
        slide.classList.remove('active');
      }
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next, 'right');
    lastDirection = 'right';
  }

  function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev, 'left');
    lastDirection = 'left';
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 3500);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      let direction = idx > current ? 'right' : 'left';
      showSlide(idx, direction);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // Touch events for mobile
  const carousel = document.querySelector('.feature-carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        isDragging = true;
      }
    });
    carousel.addEventListener('touchmove', function(e) {
      if (isDragging) e.preventDefault();
    }, { passive: false });
    carousel.addEventListener('touchend', function(e) {
      if (!isDragging) return;
      let endX = e.changedTouches[0].clientX;
      let diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        stopAutoSlide();
        startAutoSlide();
      }
      isDragging = false;
    });
    // Mouse drag for desktop
    carousel.addEventListener('mousedown', function(e) {
      startX = e.clientX;
      isDragging = true;
    });
    carousel.addEventListener('mousemove', function(e) {
      if (isDragging) e.preventDefault();
    });
    carousel.addEventListener('mouseup', function(e) {
      if (!isDragging) return;
      let endX = e.clientX;
      let diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        stopAutoSlide();
        startAutoSlide();
      }
      isDragging = false;
    });
    carousel.addEventListener('mouseleave', function(e) {
      isDragging = false;
    });
  }

  showSlide(0);
  startAutoSlide();
}); 