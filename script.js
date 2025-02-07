// Переключение мобильного меню
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active'); // Добавляем/удаляем класс 'active'
}

function callNow() {
    window.location.href = "tel:+79367779785"; // Открываем звонок на указанный номер
}

// Закрытие меню при клике на ссылку
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a'); // Все ссылки внутри меню

    // Добавляем обработчик события для каждой ссылки
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active'); // Убираем класс 'active' при клике
            }
        });
    });
});

document.getElementById('phone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});

document.getElementById('phone').addEventListener('focus', function (e) {
    if (e.target.value === '') {
        e.target.value = '+7';
    }
});

document.getElementById('phone').addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && e.target.value === '+7') {
        e.preventDefault();
    }
});

// Добавляем автоматическую подстановку "+7" при фокусе на поле телефона
document.getElementById('phone').addEventListener('focus', function (e) {
    if (e.target.value === '') {
        e.target.value = '+7';
    }
});

// Запрещаем удаление "+7" при нажатии Backspace
document.getElementById('phone').addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && e.target.value === '+7') {
        e.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel li"); // Все слайды
    const totalSlides = slides.length; // Количество слайдов
    let currentSlide = 0; // Текущий слайд

    const prevButton = document.querySelector('label[for="prev"]'); // Левая стрелка
    const nextButton = document.querySelector('label[for="next"]'); // Правая стрелка

    // Функция для показа слайда
    function showSlide(index) {
        const carousel = document.querySelector(".carousel ul");
        carousel.style.transform = `translateX(-${index * 100}%)`; // Перемещаем слайды
        currentSlide = index; // Обновляем текущий слайд
    }

    // Нажатие на правую стрелку
    nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides; // Переход к следующему слайду (циклический)
        showSlide(currentSlide);
    });

    // Нажатие на левую стрелку
    prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Переход к предыдущему слайду (циклический)
        showSlide(currentSlide);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('cta-form');
    const messageDiv = document.querySelector('.form-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Получаем данные формы
        const formData = new FormData(form);

        // Отправляем данные через AJAX
        fetch('send_form.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json()) // Преобразуем ответ в JSON
        .then(data => {
            if (data.success) {
                // При успешной отправке
                messageDiv.innerHTML = `<p style="color: #e6a94c;">${data.message}</p>`;
                form.reset(); // Очищаем форму
            } else {
                // При ошибке
                messageDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
            }
        })
        .catch(error => {
            // При сетевой ошибке
            messageDiv.innerHTML = `<p style="color: red;">Ошибка сервера. Пожалуйста, попробуйте позже.</p>`;
        });
    });
});