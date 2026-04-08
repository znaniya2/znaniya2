 (function() {
      var burger = document.getElementById('burger');
      var mobileMenu = document.getElementById('mobile-menu');

      burger.addEventListener('click', function() {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });

      mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
        });
      });
    })();

    (function() {
      var phoneInput = document.getElementById('phone');

      function formatPhone(value) {
        var digits = value.replace(/\D/g, '');

        if (digits.startsWith('8')) digits = '7' + digits.slice(1);
        if (!digits.startsWith('7')) digits = '7' + digits;

        digits = digits.substring(0, 11);

        var result = '+7';
        if (digits.length > 1) result += ' (' + digits.substring(1, 4);
        if (digits.length >= 5) result += ') ' + digits.substring(4, 7);
        if (digits.length >= 8) result += '-' + digits.substring(7, 9);
        if (digits.length >= 10) result += '-' + digits.substring(9, 11);

        return result;
      }

      function validatePhone() {
        var digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length !== 11) {
          phoneInput.setCustomValidity('Введите полный номер телефона');
          return false;
        }
        phoneInput.setCustomValidity('');
        return true;
      }

      phoneInput.addEventListener('input', function() {
        phoneInput.value = formatPhone(phoneInput.value);
        validatePhone();
      });

      phoneInput.addEventListener('blur', validatePhone);
    })();

    (function() {
      var SCRIPT_URL = "";
      var FORM_SECRET = "";


      


      var form = document.getElementById('signup-form');
      var btn = document.getElementById('signup-btn');
      var status = document.getElementById('signup-status');

      function cleanName(str, maxLen) {
        return String(str || '')
          .replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, maxLen);
      }

      function cleanPhone(str, maxLen) {
        return String(str || '')
          .replace(/[^\d\+\(\)\-\s]/g, '')
          .trim()
          .slice(0, maxLen);
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        var honeypot = document.getElementById('website').value;
        if (honeypot) {
          status.textContent = 'Ошибка отправки';
          status.style.color = 'red';
          return;
        }

        var name = cleanName(document.getElementById('name').value, 60);
        var phone = cleanPhone(document.getElementById('phone').value, 18);

        var digits = phone.replace(/\D/g, '');

        if (name.length < 2) {
          status.textContent = 'Введите корректное имя';
          status.style.color = 'red';
          return;
        }

        if (digits.length !== 11) {
          status.textContent = 'Введите корректный номер телефона';
          status.style.color = 'red';
          return;
        }


        var agree = document.getElementById('agree').checked;

        if (!agree) {
          status.textContent = 'Подтвердите согласие';
          status.style.color = 'red';
          return;
        }
        
        btn.disabled = true;
        btn.textContent = 'Отправляем...';
        status.textContent = '';
        status.style.color = 'var(--muted)';

        var data = {
          name: name,
          phone: phone,
          subject: 'Математика',
          comment: '',
          secret: FORM_SECRET
        };

        fetch(SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
        .then(function(response) {
          return response.text();
        })
        .then(function() {
          status.textContent = 'Заявка отправлена';
          status.style.color = 'green';
          form.reset();
        })
        .catch(function() {
          status.textContent = 'Ошибка отправки';
          status.style.color = 'red';
        })
        .finally(function() {
          btn.disabled = false;
          btn.textContent = 'Отправить заявку';
        });
      });
    })();
