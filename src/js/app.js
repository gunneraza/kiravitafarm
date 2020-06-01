import '../scss/app.scss'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import 'animate.css/animate.compat.css'
import WOW from 'wow.js'
import {CountUp} from 'countup.js'
import SmoothScroll from 'smooth-scroll'
import axios from 'axios'
import 'video.js/src/css/video-js.scss'
import videojs from 'video.js'
import 'videojs-youtube/dist/Youtube.min'


new WOW().init();

let scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500
});

window.onload = function () {

    document.body.classList.remove('loader-active');

    let clientsCount = new CountUp('clientsCount', 1500, {
        useGrouping: false
    });
    let distributor = new CountUp('distributor', 24, {
        useGrouping: false
    });
    let production = new CountUp('production', 32000, {
        useGrouping: false
    });
    let frames = new CountUp('frames', 12009, {
        useGrouping: false
    });

    clientsCount.start();
    distributor.start();
    production.start();
    frames.start();
}


window.addEventListener('DOMContentLoaded', () => {
    let products = new Swiper('.products-slider', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.products-slider__button_next',
            prevEl: '.products-slider__button_prev',
        },

        breakpoints: {
            200: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },

            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },

            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }
        }

    })

    let mediaSlider = new Swiper('.media__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        clickable: false,
        loop: true,
        navigation: {
            nextEl: '.media__next',
            prevEl: '.media__prev',
        }
    });

    let clientsSlider = new Swiper('.clients__slider', {
        autoplay: {
            speed: 1000
        },

        navigation: {
            nextEl: '.clients__next',
            prevEl: '.clients__prev'
        }
    })
})

let regionList = document.querySelector('.regions');
let regions = document.querySelectorAll('.region');

regionList.addEventListener('click', (event) => {
    let target = event.target;


    if (target.closest('.region__button')) {
        let region = target.closest('.region');

        if (region.closest('.region-active')) {
            region.classList.remove('region-active');
            region.querySelector('.region__footer').style.height = '0px';

            console.log(region)
        } else {
            regions.forEach(element => {
                element.classList.remove('region-active');
                element.querySelector('.region__footer').style.height = '0px';
            })

            region.classList.add('region-active');
            let contentHeight = getComputedStyle(region.querySelector('.region__content')).height;
            let footer = region.querySelector('.region__footer');
            footer.style.height = contentHeight
        }
    }
})

let menu = document.querySelector('.mobile-menu');

menu.addEventListener('click', (event) => {
    let target = event.target;
    if (target.closest('.burger')) {
        document.body.classList.toggle('menu-active')
    }

    if (target.tagName === 'A') {
        document.body.classList.toggle('menu-active')
    }
})

let forms = document.querySelectorAll('.form-group');
let inputs = document.querySelectorAll('.form-control__number');

inputs.forEach(el => {
    let inp = el.getElementsByTagName('INPUT')[0];
    inp.addEventListener('keypress', event => {
        if(inp.value.length >= 9) {
            event.preventDefault()
        }
    });

})

forms.forEach(element => {
    element.addEventListener('click', (event) => {
        let target = event.target;
        let submit = element.querySelector('.submit');
        let name = element.name;
        let number = element.number;
        let info = element.getAttribute('data-info');
        let complete = element.querySelector('.messages__complete');
        let error = element.querySelector('.messages__error');
        let flag = false;

        event.preventDefault();

        if (target.tagName === 'BUTTON') {
            if (name.value.length === 0) {
                error.classList.add('active');
            } else if (number.value.length === 0) {
                error.classList.add('active');
            } else {
                flag = true;
            }

            if (flag) {
                let date = new FormData();
                date.append('name', name.value);
                date.append('number', `+998${number.value}`);
                date.append('info', info);

                axios.post('/mail.php', date, {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }).then(response => {
                    if (response.status === 200) {
                        name.value = '';
                        number.value = '';
                        if (error.classList.contains('active')) {
                            error.classList.remove('active');
                        }
                        complete.classList.add('active');
                    }
                })
            }
        }
    })
})


