$(document).ready(function () {
    $(".phone").mask('+7 (999)-999-99-99');
});


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




let becomeSwiper = new Swiper(".become-partner-slider", {
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true,
    speed: 600,
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
            slidesPerView: 1,
            spaceBetween: 12,
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





const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const progress = document.getElementById('progress');
const minVal = document.getElementById('min-val');
const maxVal = document.getElementById('max-val');

function updateSlider() {
    let min = parseInt(rangeMin.value);
    let max = parseInt(rangeMax.value);

    if (min > max - 1) {
        rangeMin.value = max - 1;
        min = max - 1;
    }
    if (max < min + 1) {
        rangeMax.value = min + 1;
        max = min + 1;
    }

    const percentMin = (min / 50) * 100;
    const percentMax = (max / 50) * 100;

    progress.style.left = percentMin + "%";
    progress.style.width = (percentMax - percentMin) + "%";

    minVal.innerText = "От " + min;
    maxVal.innerText = "До " + max;
}

rangeMin.addEventListener("input", updateSlider);
rangeMax.addEventListener("input", updateSlider);

updateSlider();