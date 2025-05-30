
$(function () {
    let Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        let links = this.el.find('.link');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function (e) {
        let $el = e.data.el;
        $this = $(this),
            $next = $this.next();
        $next.slideToggle();
        if (!e.data.multiple) {

            $el.find('.submenu').not($next).slideUp();
        }
        if (!$this.hasClass('open')) {
            $('.link').each(function () {
                $(this).removeClass('open')
            })
            $this.addClass('open')
        } else {
            $this.removeClass('open')
        }
    }
    let accordion = new Accordion($('#accordion'), false);
});

$('.percentage-box').on('click', function () {
    $('.percentage-box').removeClass('percentage-active');
    $(this).addClass('percentage-active');
});

$('.percentage-count').on('click', function () {
    $('.percentage-box').removeClass('percentage-active');
});


let becomeSwiper = new Swiper(".become-partner-slider", {
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true,
    speed: 600,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    fadeEffect: { crossFade: true },
    virtualTranslate: true,
    effect: "fade",
    pagination: {
        el: ".become-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('text');
    const counter = document.getElementById('charCurrent');

    textarea.addEventListener('input', function () {
        counter.textContent = textarea.value.length;
    });
});


let cooperatingSwiper = new Swiper(".cooperating-slider", {
    slidesPerView: 2,
    spaceBetween: 14,
    loop: true,
    pagination: {
        el: ".cooperating-pagination",
        clickable: true,
    },
    breakpoints: {
        '1024': {
            slidesPerView: 2,
            spaceBetween: 12,
        },
        '767': {
            slidesPerView: 2,
            spaceBetween: 12,
        },
        '430': {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        '320': {
            slidesPerView: 2,
            spaceBetween: 8,
        },
    },
});






$('.open_modal').on('click', function () {
    var videoSrc = $(this).data('src');
    var modalId = $(this).data('val');

    if (videoSrc) {
        // Открыть окно с видео
        var modal = $('#video-modal');
        var container = modal.find('.modal-video-fon');
        container.html('<iframe src="' + videoSrc + '" width="853" height="480" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>');
        modal.removeClass('out').fadeIn();
    } else if (modalId) {
        // Открыть обычное модальное окно (форма, и т.п.)
        var modal = $('#' + modalId);
        modal.removeClass('out').fadeIn();
    }

    $('body').addClass('body_fix');
});

$('.close').on('click', function () {
    var modal = $(this).closest('.modal');
    var container = modal.find('.modal-video-fon');
    if (container.length) {
        container.html(''); // Останавливаем видео
    }
    modal.addClass('out');
    setTimeout(function () {
        modal.fadeOut();
    }, 100);
    $('body').removeClass('body_fix');
});

$(window).on('click', function (event) {
    $('.modal').each(function () {
        var modal = $(this);
        var content = modal.find('.modal-content')[0];

        if (event.target === modal[0] || event.target === content) {
            var container = modal.find('.modal-video-fon');
            if (container.length) {
                container.html('');
            }
            modal.addClass('out');
            setTimeout(function () {
                modal.fadeOut();
            }, 100);
            $('body').removeClass('body_fix');
        }
    });
});



const range = document.getElementById('range-single');
const minVal = document.getElementById('min-val');
const finalPrice = document.getElementById('final-price');
const customPercentInput = document.getElementById('custom-percent'); // добавил

let selectedProject = null;
let selectedType = null;

const commissionTable = {
    "siren": {
        "kvartira": 3,
        "mesto": 1
    },
    "afi-tower": {
        "kvartira": 3.5, // используем 3.5 — можно потом добавить логику выбора
        "mesto": 2
    },
    "afi-vorontsovsky": {
        "kvartira": 2,
        "mesto": 2,
        "klad": 2
    },
    "odinburg": {
        "kvartira": 3, // тоже 3, не 4.5
        "mesto": 2
        // Кладовых нет — не добавляем
    },
    "rezidenty": {
        "kvartira": 3,
        "mesto": 1,
        "klad": 1
    }
};

function updateSliderUI() {
    const val = parseInt(range.value);
    const percent = ((val - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #00AEEF 0%, #00AEEF ${percent}%, #ccc ${percent}%, #ccc 100%)`;
    minVal.innerText = "От " + val;
}

function calculateFinal() {
    const val = parseInt(range.value);
    const customPercent = parseFloat(customPercentInput.value.replace(',', '.'));

    if (!isNaN(customPercent) && customPercentInput.value.trim() !== '') {
        // Показываем именно комиссию (процент от суммы), а не сумму + комиссию
        const commission = val * 1_000_000 * (customPercent / 100);
        finalPrice.innerText = `${Math.round(commission).toLocaleString('ru-RU')}`;
        return;
    }

    if (!selectedProject || !selectedType) {
        finalPrice.innerText = "";
        return;
    }

    const projectData = commissionTable[selectedProject];
    const percent = projectData?.[selectedType];

    if (percent === undefined) {
        const total = val * 1_000_000;
        finalPrice.innerText = `${total.toLocaleString('ru-RU')}`;
        return;
    }

    const commission = val * 1_000_000 * (percent / 100);
    finalPrice.innerText = `${Math.round(commission).toLocaleString('ru-RU')}`;
}


document.querySelectorAll("#projects li").forEach(li => {
    li.addEventListener("click", () => {
        document.querySelectorAll("#projects li").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
        selectedProject = li.getAttribute("data-project");
        calculateFinal();
    });
});

document.querySelectorAll("#types li").forEach(li => {
    li.addEventListener("click", () => {
        document.querySelectorAll("#types li").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
        selectedType = li.getAttribute("data-type");
        calculateFinal();
    });
});

range.addEventListener("input", () => {
    updateSliderUI();
    calculateFinal();
});

// Добавлено: при вводе своего процента
customPercentInput.addEventListener("input", () => {
    calculateFinal();
});

updateSliderUI();
calculateFinal();

function updateTypeVisibility() {
    const kladLi = document.querySelector('#types li[data-type="klad"]');
    if (!kladLi) return;

    if (selectedProject === "siren" || selectedProject === "afi-tower" || selectedProject === "odinburg") {
        kladLi.style.display = "none";

        // Если сейчас выбран "клад" — сбросим выбор
        if (selectedType === "klad") {
            selectedType = null;
            document.querySelectorAll("#types li").forEach(li => li.classList.remove("active"));
        }
    } else {
        kladLi.style.display = "list-item";
    }
}
document.querySelectorAll("#projects li").forEach(li => {
    li.addEventListener("click", () => {
        document.querySelectorAll("#projects li").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
        selectedProject = li.getAttribute("data-project");

        // Очистка кастомного процента при клике по проектам
        customPercentInput.value = '';
        updateTypeVisibility();
        calculateFinal();
    });
});

document.querySelectorAll("#types li").forEach(li => {
    li.addEventListener("click", () => {
        document.querySelectorAll("#types li").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
        selectedType = li.getAttribute("data-type");

        // Очистка кастомного процента при клике по типам
        customPercentInput.value = '';
        calculateFinal();
    });
});












let projectSwiper = new Swiper(".video-project-slider", {
    slidesPerView: 4,
    spaceBetween: 24,

    breakpoints: {
        '1299': {
            slidesPerView: 4,
            spaceBetween: 24,
        },
        '1020': {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        '500': {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        '320': {
            slidesPerView: 1,
            spaceBetween: 12,
        },
    },
    pagination: {
        el: ".video-pagination",
        clickable: true,
    },
});




$('.info-circle-hov').on('click', function () {
    $(this).toggleClass('info-circle-active');
})





$('.myBtn').on('click', function() {
    const newTitle = $(this).data('name'); // получаем значение из data-name
    $('.get-name').text(newTitle); // устанавливаем в заголовок
});




