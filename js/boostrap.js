// Bootstrap form validation + toast demo
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      // Pretend submit ok
      const toastEl = document.getElementById('toast');
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
      form.reset();
      form.classList.remove('was-validated');
    }, false);