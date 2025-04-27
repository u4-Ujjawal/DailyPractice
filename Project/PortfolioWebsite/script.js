// Smooth scrolling for navigation links
$(document).ready(function () {
  $("a.nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 65,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  // Form validation
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Name validation
    const name = $("#name").val().trim();
    if (name === "") {
      $("#name").addClass("is-invalid");
      isValid = false;
    } else {
      $("#name").removeClass("is-invalid");
    }

    // Email validation
    const email = $("#email").val().trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      $("#email").addClass("is-invalid");
      isValid = false;
    } else {
      $("#email").removeClass("is-invalid");
    }

    // Message validation
    const message = $("#message").val().trim();
    if (message === "") {
      $("#message").addClass("is-invalid");
      isValid = false;
    } else {
      $("#message").removeClass("is-invalid");
    }

    if (isValid) {
      // Simulate form submission success
      $("#formMessage")
        .removeClass("text-danger")
        .addClass("text-success")
        .text("Thank you for your message! I will get back to you soon.");

      // Clear form fields
      $("#contactForm")[0].reset();
    } else {
      $("#formMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Please fill out all required fields correctly.");
    }
  });
});
