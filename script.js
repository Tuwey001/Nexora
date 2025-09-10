// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNav")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Basic validation
      if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
        showNotification("Please fill in all required fields.", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        showNotification("Please enter a valid email address.", "error")
        return
      }

      // Privacy policy check
      const privacyCheck = document.getElementById("privacy")
      if (!privacyCheck.checked) {
        showNotification("Please accept the Privacy Policy and Terms of Service.", "error")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        showNotification("Thank you for your message! We'll get back to you within 24 hours.", "success")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
})

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        animation: slideInRight 0.3s ease-out;
        font-family: 'Inter', sans-serif;
    `

  // Set colors based on type
  if (type === "success") {
    notification.style.background = "#10b981"
    notification.style.color = "white"
  } else if (type === "error") {
    notification.style.background = "#ef4444"
    notification.style.color = "white"
  } else {
    notification.style.background = "#3b82f6"
    notification.style.color = "white"
  }

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Add notification animations to CSS
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(notificationStyles)

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out forwards"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".feature-card, .service-card, .value-card, .team-card")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    observer.observe(el)
  })
})

// Mobile menu handling
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    const navLinks = navbarCollapse.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      }
    })
  }
})

// Preload images
function preloadImages() {
  const images = document.querySelectorAll('img[src*="placeholder"]')
  images.forEach((img) => {
    const newImg = new Image()
    newImg.onload = function () {
      img.src = this.src
      img.style.opacity = "1"
    }
    newImg.src = img.src
  })
}

// Initialize preloading when page loads
document.addEventListener("DOMContentLoaded", preloadImages)

// Add loading states for buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.type === "submit") return // Skip submit buttons (handled separately)

      // Add loading state
      const originalText = this.textContent
      this.textContent = "Loading..."
      this.disabled = true

      // Remove loading state after a short delay
      setTimeout(() => {
        this.textContent = originalText
        this.disabled = false
      }, 1000)
    })
  })
})

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages)
