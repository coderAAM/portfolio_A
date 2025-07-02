document.addEventListener("DOMContentLoaded", function () {
  const eduSection = document.querySelector('.education-section');
  const eduBlocks = document.querySelectorAll('.edu-block');
  const eduLines = document.querySelectorAll('.edu-line');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  function playEducationAnimation() {
    eduBlocks.forEach(el => el.style.animation = '');
    eduLines.forEach(el => el.style.animation = '');
    // Force reflow for restart
    void eduBlocks[0].offsetWidth;
    eduBlocks.forEach((el, i) => {
      el.style.animation = `fadeInUp 1s both`;
      el.style.animationDelay = `${0.2 + i * 0.9}s`;
    });
    eduLines.forEach((el, i) => {
      el.style.animation = `growLine 0.7s forwards`;
      el.style.animationDelay = `${0.7 + i * 0.9}s`;
    });
  }

  function resetEducationAnimation() {
    eduBlocks.forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
    });
    eduLines.forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = 0;
      el.style.height = '0';
    });
  }

  function handleScroll() {
    if (isInViewport(eduSection)) {
      playEducationAnimation();
    } else {
      resetEducationAnimation();
    }
  }

  // Initial reset
  resetEducationAnimation();

  window.addEventListener('scroll', handleScroll, { passive: true });
});

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Back to Top button show/hide
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
});

// Skills animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll('.skill-item');
  function showSkillsOnScroll() {
    skillItems.forEach((item, idx) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => {
          item.classList.add('visible');
        }, idx * 120); // Staggered animation
      } else {
        item.classList.remove('visible');
      }
    });
  }
  window.addEventListener('scroll', showSkillsOnScroll, { passive: true });
  showSkillsOnScroll();
});

// Contact form success/error message (Formspree)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        document.querySelectorAll('.form-success, .form-error').forEach(el => el.remove());
        if (response.ok) {
          form.reset();
          form.insertAdjacentHTML('afterend', '<div class="form-success">Thank you! Your message has been sent.</div>');
        } else {
          form.insertAdjacentHTML('afterend', '<div class="form-error">Oops! Something went wrong.</div>');
        }
      }).catch(() => {
        document.querySelectorAll('.form-success, .form-error').forEach(el => el.remove());
        form.insertAdjacentHTML('afterend', '<div class="form-error">Oops! Something went wrong.</div>');
      });
    });
  }
});

// Navbar scroll highlight
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('section, .show-section, .education-section, .skills-section, .services-section, .projects-section, .contact-section');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  window.addEventListener('scroll', function () {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
});

// Light/Dark mode toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById('toggleMode');
  toggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const icon = toggleBtn.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
});

// Page loader hide on load
window.addEventListener('load', function () {

});

// Scroll progress bar
window.addEventListener('scroll', function () {
  const scrollBar = document.getElementById('scrollBar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  scrollBar.style.width = scrolled + "%";
});

// Mobile navbar toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById('navToggle');
  const navUl = document.querySelector('.main-nav ul');
  navToggle.addEventListener('click', function () {
    navUl.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navUl.classList.remove('open'));
  });
});




/**
 * Initialize the scrolling timeline
 */
function initTimeline() {
  // All timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Optional control buttons
  const showAllBtn = document.querySelector('.show-all-btn');
  const resetBtn = document.querySelector('.reset-btn');

  /**
   * Check if an element is in the viewport
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - Whether the element is in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  /**
   * Handle scroll event to reveal timeline items
   */
  function onScroll() {
    timelineItems.forEach(item => {
      if (isInViewport(item)) {
        item.classList.add('active');
      }
    });
  }

  /**
   * Show all timeline items immediately
   */
  function showAllItems() {
    timelineItems.forEach((item, index) => {
      // Stagger the animations slightly
      setTimeout(() => {
        item.classList.add('active');
      }, index * 300);
    });
  }

  /**
   * Reset all timeline items to hidden state
   */
  function resetItems() {
    timelineItems.forEach(item => {
      item.classList.remove('active');
    });

    // Activate the first item after a short delay
    setTimeout(() => {
      if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
      }
    }, 300);
  }

  // Add scroll event listener
  window.addEventListener('scroll', onScroll);

  // Initial check on page load
  window.addEventListener('load', onScroll);

  // Add event listeners to control buttons if they exist
  if (showAllBtn) {
    showAllBtn.addEventListener('click', showAllItems);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetItems);
  }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initTimeline);

// Add this JavaScript to make the accordion functional
document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

