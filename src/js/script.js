window.addEventListener('DOMContentLoaded', function () {
    'use strict';

     //////////// slider ///////////////////////
    let slideIndex = 1, 
        slides = document.querySelectorAll('.slider__item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) { 
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;  
        }

        slides.forEach((item) => item.style.display = 'none'); 
        

        slides[slideIndex - 1].style.display = 'block'; 
    }

    function plusSlides(n) { 
        showSlides(slideIndex += n);
    }
    
    prev.addEventListener('click', function () { 
        plusSlides(-1);
    });
    next.addEventListener('click', function () { 
        plusSlides(1);
    });

    ////////// Hamburger ///////////////////////
    const menu = document.querySelector('.header__list'),
          menuItem = document.querySelectorAll('.header__link'),
        hamburger = document.querySelector('.header__hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('header__hamburger_active');
        menu.classList.toggle('header__list_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('header__hamburger_active');
            menu.classList.toggle('header__list_active');
        });
    });

    ////////// Sticky nav ///////////////////////
    const waypoint = new Waypoint({
        element: document.getElementById('advantages'),
        handler: function (direction) {
            if(direction == "down") {
                $(".header__list").attr("id", "sticky-nav");
            } else {
                $(".header__list").removeAttr("id");
            }
        }
    });

    ////////// Class active tab ///////////////////////
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.price__card').eq(i).toggleClass('price__card_active');
                $('.price__item_wrap').eq(i).toggleClass('price__item_wrap_active');
                $('.price__item-list').eq(i).toggleClass('price__item-list_active');
            });
        });
    }

    toggleSlide('.button_more');
    toggleSlide('.price__item_back');

    //////////// Scroll /////////////////////
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });


    $(function () {
        $("a[href^=#]").click(function () {
            const _href = $(this).attr("href");
            $("html, body").animate({ scrollTop: $(_href).offset().top + "px" }, 500);
            return false;
        });
    });

    ////// MODAL ////////
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
        $("html,body").css("overflow", "hidden");
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks').fadeOut();
        $("html,body").css("overflow", "");
    });
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('.modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay').fadeIn();
        });
    });
    
    //////////// Validation form /////////////////////
    function validateForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                tel: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите Ваше имя",
                tel: "Пожалуйста, введите Ваш номер телефона",
                email: {
                    required: "Пожалуйста, введите Вашу почту",
                    email: "Неверный формат почты"
                }
            }
        });
    }
    validateForm('#consultation form');

    $('input[name="tel"]').mask("+38(999)-999-99-99");

    $('#consultation-form').submit(function (e) {
        e.preventDefault();
        $(this).find("input").val("");
        $('.overlay, #thanks').fadeIn();
    });

});