
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
    var attr = $(this).attr('data-val');
    var modal = $('#' + attr);
    modal.removeClass('out');
    modal.fadeIn();
});
$('.close').on('click', function () {
    var prt = $(this).parents('.modal');
    prt.addClass('out')
    setTimeout(function () {
        prt.fadeOut();
    }, 100);
});
$(window).on('click', function (event) {
    $('.modal').each(function () {
        var gtattr = $(this).attr('id');
        var new_mod = $('#' + gtattr);
        var md_cnt = $(new_mod).find('.modal-content');
        if (event.target === $(md_cnt)[0]) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)
        }
        if (event.target === this) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)
        }
    })
});



// const projectItems = document.querySelectorAll('#project-list li');
// const typeItems = document.querySelectorAll('#property-type li');
// const range = document.getElementById('range-single');
// const minVal = document.getElementById('min-val');
// const totalPrice = document.getElementById('total-price');
// const percentInput = document.getElementById('custom-percent');
//
// let selectedCommission = 2;
//
// projectItems.forEach(item => {
//     item.addEventListener('click', () => {
//         projectItems.forEach(i => i.classList.remove('active'));
//         item.classList.add('active');
//         selectedCommission = parseFloat(item.dataset.commission);
//         if (!percentInput.value) {
//             calculateTotal();
//         }
//     });
// });
//
// typeItems.forEach(item => {
//     item.addEventListener('click', () => {
//         typeItems.forEach(i => i.classList.remove('active'));
//         item.classList.add('active');
//     });
// });
//
// range.addEventListener('input', () => {
//     const val = parseInt(range.value);
//     minVal.textContent = `От ${val}`;
//     calculateTotal();
// });
//
// function updateSliderBackground() {
//     const min = parseInt(range.min);
//     const max = parseInt(range.max);
//     const val = parseInt(range.value);
//     const percent = ((val - min) / (max - min)) * 100;
//     range.style.background = `linear-gradient(to right, #00AEEF 0%, #00AEEF ${percent}%, rgba(5,5,5,0) ${percent}%, rgba(5,5,5,0) 0%)`;
//
// }
//
// // Добавляем вызов при изменении
// range.addEventListener('input', () => {
//     updateSliderBackground();
// });
//
// // При загрузке страницы
// updateSliderBackground();
//
//
//
// percentInput.addEventListener('input', () => {
//     calculateTotal();
// });
//
// function calculateTotal() {
//     const price = parseInt(range.value) * 1_000_000;
//     const customPercent = parseFloat(percentInput.value.replace(",", "."));
//     const commission = (!isNaN(customPercent) && customPercent > 0) ? customPercent : selectedCommission;
//     const total = price + (price * commission / 100);
//     totalPrice.textContent = total.toLocaleString('ru-RU') + " ₽";
// }
//
// // Установка значений по умолчанию
// projectItems[0].classList.add('active');
// typeItems[0].classList.add('active');
// calculateTotal();







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





