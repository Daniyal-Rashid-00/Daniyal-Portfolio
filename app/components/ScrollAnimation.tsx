"use client";

import { useEffect } from "react";

export function ScrollAnimation() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, observerOptions);

    // Observe all animated elements
    document
      .querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .scale-in")
      .forEach((el) => observer.observe(el));

    const sections = Array.from(document.querySelectorAll("section"));
    const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
    const nav = document.querySelector("nav");
    const scrollTopBtn = document.querySelector(".scroll-top");

    const handleScroll = () => {
      // Update nav background
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      }

      // Update scroll to top button visibility
      if (scrollTopBtn) {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      }

      // Update active nav link
      const current = sections.find((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        return (
          window.scrollY >= sectionTop - 200 &&
          window.scrollY < sectionTop + sectionHeight - 200
        );
      });

      if (current) {
        const id = current.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // Add stagger effect to grid items
    document
      .querySelectorAll(
        ".services-grid .service-card, .skills-grid .skill-item, .projects-grid .project-card"
      )
      .forEach((card, index) => {
        (card as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
