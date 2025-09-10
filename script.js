// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".card, .hero-content, .lifestyle-img")
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Mobile Navigation Enhancement
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
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

  // Active Navigation Highlighting
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Enhanced validation
      const requiredFields = ["firstName", "lastName", "email", "services", "message"]
      const missingFields = requiredFields.filter((field) => !data[field] || data[field].trim() === "")

      if (missingFields.length > 0) {
        alert("Please fill in all required fields: " + missingFields.join(", "))
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission with better UX
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you within 24 hours.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Lazy Loading for Images
  const images = document.querySelectorAll("img")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
        }
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img)
    }
  })
})

// Image hover effects
document.querySelectorAll(".hero-images img, .lifestyle-img").forEach((img) => {
  img.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  img.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Button click animations with ripple effect
document.querySelectorAll(".btn").forEach((btn) => {
  btn.style.position = "relative"
  btn.style.overflow = "hidden"

  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")

    // Ripple styles
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255, 255, 255, 0.6)"
    ripple.style.transform = "scale(0)"
    ripple.style.animation = "ripple 0.6s linear"
    ripple.style.pointerEvents = "none"

    this.appendChild(ripple)

    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height)

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x - size / 2 + "px"
    ripple.style.top = y - size / 2 + "px"

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Scroll to Top Button
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`

document.body.appendChild(scrollToTopBtn)

// Show/hide scroll to top button
let scrollTimeout
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  }, 10)
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Performance: Debounced resize handler
let resizeTimeout
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    // Recalculate any layout-dependent features
    console.log("[v0] Window resized, recalculating layouts")
  }, 250)
})

// Add CSS animation for ripple effect
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
