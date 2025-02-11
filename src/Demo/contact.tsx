import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import './../pages/Authentication/style-two.css';
import './css_style/style.css';
import anime from "animejs";
import Signup_header from '../pages/Authentication/Signup_header';
export default function App() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const containerRef: any = useRef(null);
    const dotsRef: any = useRef([]);
    const currentSlideIndex = useRef(0);
    useEffect(() => {
        const container = containerRef.current;
        const slides = container.children;
        const totalSlides = slides.length;

        // Anime.js slider animation
        const slideAnimation = () => {
            anime({
                targets: container,
                translateX: `-${currentSlideIndex.current * 100}%`,
                duration: 500,
                easing: 'easeInOutQuad'
            });

            // Update dot indicators
            dotsRef.current.forEach((dot: any, index: number) => {
                dot.classList.toggle('bg-primary', index === currentSlideIndex.current);
                dot.classList.toggle('bg-gray-300', index !== currentSlideIndex.current);
            });
        };

        // Next slide function
        const nextSlide = () => {
            currentSlideIndex.current =
                (currentSlideIndex.current + 1) % totalSlides;
            slideAnimation();
        };

        // Previous slide function
        const prevSlide = () => {
            currentSlideIndex.current =
                (currentSlideIndex.current - 1 + totalSlides) % totalSlides;
            slideAnimation();
        };

        // Dot navigation
        dotsRef.current.forEach((dot: any, index: number) => {
            dot.addEventListener('click', () => {
                currentSlideIndex.current = index;
                slideAnimation();
            });
        });

        // Optional: Auto slide
        const autoSlideInterval = setInterval(nextSlide, 5000);

        // Cleanup
        return () => {
            clearInterval(autoSlideInterval);
            dotsRef.current.forEach((dot: any) => {
                // dot.removeEventListener('click', () => { });
            });
        };
    }, []);

    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Sora" rel="stylesheet" />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        '\n        .bg-image {\n            background-image: url("imagesss/bg-image-aboutus-min.jpg");\n            background-size: cover;\n            background-repeat: no-repeat;\n            padding: 57px 0px;\n        }\n\n        .banner-heading {\n            color: #FFF;\n            text-align: center;\n            font-family: Sora;\n            font-size: 47.096px;\n            font-style: normal;\n            text-transform: uppercase;\n            font-weight: 600;\n        }\n\n        .bg-image-about {\n            background-image: url("imagesss/Group 1000009912-min.jpg");\n            background-repeat: no-repeat;\n            background-position: center center;\n        }\n\n        .small-blue-heading {\n            color: #0F3595;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: normal;\n            text-transform: capitalize;\n        }\n\n        .about-taglines {\n            color: #000;\n            font-family: Sora;\n            font-size: 47.096px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 64.365px;\n            /* 136.667% */\n            text-transform: capitalize;\n        }\n\n        .about-text {\n            color: #808D9E;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 28px;\n            /* 175% */\n        }\n\n        .container.mx-auto.spacing-top {\n            padding: 80px 0px;\n        }\n\n        .bg-images-of-counter {\n            background-image: url("imagesss/Group 1000009914 (1).png");\n            background-position: center;\n            background-size: contain;\n            background-repeat: no-repeat;\n        }\n\n        .special-color {\n            background-color: #FFA619;\n            padding: 0px;\n            margin: 336px 132px 0px 0px;\n            border-radius: 15px;\n        }\n\n        h3.special-color-heading {\n            color: #FFF;\n            font-family: Sora;\n            font-size: 31.398px;\n            font-style: normal;\n            font-weight: 700;\n            line-height: normal;\n            text-transform: capitalize;\n        }\n\n        p.special-color-txt {\n            color: #FFF;\n            font-family: Sora;\n            font-size: 18.839px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: normal;\n            text-transform: capitalize;\n        }\n\n        .flex.items-start.space-x-4.icon-list {\n            border-radius: 15px;\n            background: #F2F6FE;\n            padding: 20px 43px;\n        }\n\n        .icon-list-icons {\n            width: 37px;\n            height: 34px;\n        }\n\n        .abouted {\n            color: #4D4D4D;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 28px;\n            /* 175% */\n        }\n\n        .gradient-bg {\n            background-image: url("imagesss/Group 1000009919 (1).jpg");\n            background-position: center;\n            background-size: cover;\n            background-repeat: no-repeat;\n        }\n\n        .setup {\n            padding: 60px 0px;\n        }\n\n        .about-taglines-COUNTER {\n            color: #000;\n            font-family: Sora;\n            font-size: 40.096px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 64.365px;\n            /* 136.667% */\n            text-transform: capitalize;\n        }\n\n        .counter-number {\n            color: var(--Black, #1D1E25);\n            font-family: Sora;\n            font-size: 42.47px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 71.457px;\n            /* 144.446% */\n            letter-spacing: -1.979px;\n        }\n\n        .counter-heading {\n            color: var(--Grey, #808D9E);\n            font-family: Sora;\n            font-size: 13.618px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 21.603px;\n            letter-spacing: 0.169px;\n        }\n\n        .team-bg {\n            background-image: url("/Vector 4.jpg");\n            background-position-x: 718px;\n            background-position-y: 58px;\n            background-size: 91px;\n            background-repeat: no-repeat;\n        }\n\n        .member-name {\n            color: #000;\n            text-align: center;\n            font-family: Sora;\n            font-size: 20px;\n            font-style: normal;\n            font-weight: 700;\n            line-height: 26px;\n            /* 130% */\n            letter-spacing: -1px;\n            padding: 10px 0px 0px 0px;\n        }\n\n        .member-designation {\n            color: #006ED9;\n            text-align: center;\n            font-family: Sora;\n            font-size: 14px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 20px;\n            /* 142.857% */\n            letter-spacing: -0.5px;\n        }\n\n        @keyframes slideRight {\n            0% {\n                transform: translateX(-100%);\n            }\n\n            100% {\n                transform: translateX(0);\n            }\n        }\n\n        @keyframes slideLeft {\n            0% {\n                transform: translateX(0);\n            }\n\n            100% {\n                transform: translateX(-100%);\n            }\n        }\n\n        .slide-right {\n            animation: slideRight 30s linear infinite;\n        }\n\n        .slide-left {\n            animation: slideLeft 30s linear infinite;\n        }\n\n        .testimonial-track {\n            display: flex;\n            width: max-content;\n        }\n\n        .testimonial-container:hover .testimonial-track {\n            animation-play-state: paused;\n        }\n\n        .testimonial-name {\n            color: #1E1E1E;\n            font-family: Sora;\n            font-size: 20.44px;\n            font-style: normal;\n            font-weight: 700;\n            line-height: 30.66px;\n            /* 150% */\n            text-align: left;\n        }\n\n        .testimonial-designation {\n            color: #909090;\n            font-family: Sora;\n            font-size: 13.627px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 20.44px;\n            /* 150% */\n            text-align: left;\n        }\n\n        .testimonial-text {\n            color: #1E1E1E;\n            font-family: Sora;\n            font-size: 13.627px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 20.44px;\n            /* 150% */\n            text-align: left;\n        }\n\n        .testimonial-setup {\n            border-radius: 27.253px;\n            background: #F3F3F3;\n            padding: 15px;\n        }\n\n        .testimonial-image {\n            border-radius: 20px;\n        }\n\n        .max-w-7xl.mx-auto.px-4.spacing-giver {\n            display: block;\n        }\n\n        .phone {\n            display: none;\n        }\n\n        /* media query starts */\n\n        /* /laptop css media query/ */\n        @media only screen and (min-width:1280px) and (max-width:1450px) {\n            .phone {\n                display: none;\n            }\n\n            .max-w-7xl.mx-auto.px-4.spacing-giver {\n                display: block;\n            }\n\n            .contact-bg {\n                padding: 0px 100px;\n            }\n\n            .testimonial-above-spacer-phone {\n                padding: 70px 0px 14px 0px;\n            }\n\n            .testimonial-bg {\n                background-color: #f3f3f3;\n                padding: 17.033px;\n                border-radius: 27.253px;\n            }\n\n            p.testimonial-p {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 16.44px;\n                font-style: normal;\n                font-weight: 400;\n                line-height: 26.66px;\n            }\n\n            p.testimonial-names {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 20.44px;\n                font-style: normal;\n                font-weight: 700;\n                line-height: 30.66px;\n                /* 150% */\n                padding: 20px 0px 20px 0px;\n            }\n        }\n\n        /* /laptop css media query/ */\n        @media only screen and (min-width:1100px) and (max-width:1280px) {\n            .phone {\n                display: block;\n            }\n\n            .max-w-7xl.mx-auto.px-4.spacing-giver {\n                display: none;\n            }\n\n            .contact-bg {\n                padding: 0px 39px;\n            }\n        }\n\n        /* /* Laptop CSS media query / */\n        @media only screen and (min-width:1020px) and (max-width:1100px) {\n            .icon-text {\n                font-size: 12px;\n            }\n\n            .icon-text {\n                font-size: 12px;\n            }\n\n            .contact-taglines {\n                font-size: 35px;\n            }\n\n            .contact-text {\n                font-size: 14px;\n            }\n\n            .form-label {\n                font-size: 13px;\n            }\n\n            .grid.grid-cols-1.gap-2.p-8.text-center.spacing-setting {\n                padding: 0px;\n            }\n\n            .about-taglines {\n                font-size: 36.096px;\n                line-height: 49.365px;\n            }\n\n            .sidespace-coverup {\n                overflow: hidden\n            }\n\n            .phone {\n                display: block;\n            }\n\n            .max-w-7xl.mx-auto.px-4.spacing-giver {\n                display: none;\n            }\n\n            .testimonial-above-spacer-phone {\n                padding: 70px 0px 14px 0px;\n            }\n\n            .testimonial-bg {\n                background-color: #f3f3f3;\n                padding: 17.033px;\n                border-radius: 27.253px;\n            }\n\n            p.testimonial-p {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 16.44px;\n                font-style: normal;\n                font-weight: 400;\n                line-height: 26.66px;\n            }\n\n            p.testimonial-names {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 20.44px;\n                font-style: normal;\n                font-weight: 700;\n                line-height: 30.66px;\n                /* 150% */\n                padding: 20px 0px 20px 0px;\n            }\n\n            .small-blue-heading {\n                font-size: 16px;\n                ;\n                line-height: 33PX;\n            }\n\n            .about-taglines {\n                font-size: 30.096px;\n                line-height: 38.365px;\n            }\n\n            .about-text {\n                font-size: 13px;\n                line-height: 26px;\n            }\n\n            .special-color-txt {\n                font-size: 13.839px !important;\n            }\n\n            .special-color-heading {\n                font-size: 27.398px !important;\n            }\n\n            .max-w-7xl.mx-auto.px-4.py-12.abouts {\n                padding: 0px;\n            }\n\n            .about-taglines-COUNTER {\n                font-size: 32.096px;\n                line-height: 41.365px;\n            }\n\n            .counter-number {\n                font-size: 34.47px;\n                line-height: 55.457px;\n            }\n\n            .counter-heading {\n                font-size: 10.618px;\n                line-height: 15.603px;\n            }\n\n            .team-bg {\n                background-size: 0;\n            }\n\n            .member-name {\n                font-size: 17px;\n                letter-spacing: 1px;\n            }\n        }\n\n        /* /tablate css media query/ */\n        @media only screen and (min-width:768px) and (max-width:1023px) {\n            .contact-page-icons {\n                width: 39px;\n                height: 39px;\n            }\n\n            .icon-heading {\n                font-size: 14px;\n                line-height: 146%;\n            }\n\n            .icon-text {\n                font-size: 12px;\n            }\n\n            .icon-box-text {\n                padding: 0px 0px 20px 8px;\n            }\n\n            .sidespace-coverup {\n                overflow: hidden\n            }\n\n            .about-taglines {\n                font-size: 26.096px;\n                line-height: 38.365px;\n                padding-top: 6px;\n            }\n\n            .contact-text {\n                font-size: 13px;\n            }\n\n            .contact-taglines {\n                font-size: 30px;\n                line-height: 50px;\n            }\n\n            .form-label {\n                font-size: 11px;\n            }\n\n            .contact-form {\n                padding: 14px;\n            }\n\n            .form-submit-btn {\n                font-size: 12px;\n                padding: 10px 30px 10px 30px;\n            }\n\n            .phone {\n                display: block;\n            }\n\n            .max-w-7xl.mx-auto.px-4.spacing-giver {\n                display: none;\n            }\n\n            .testimonial-above-spacer-phone {\n                padding: 70px 0px 14px 0px;\n            }\n\n            .testimonial-bg {\n                background-color: #f3f3f3;\n                padding: 17.033px;\n                border-radius: 27.253px;\n            }\n\n            p.testimonial-p {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 16.44px;\n                font-style: normal;\n                font-weight: 400;\n                line-height: 26.66px;\n            }\n\n            p.testimonial-names {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 20.44px;\n                font-style: normal;\n                font-weight: 700;\n                line-height: 30.66px;\n                /* 150% */\n                padding: 20px 0px 20px 0px;\n            }\n\n            .small-blue-heading {\n                font-size: 13px;\n            }\n\n            .about-text {\n                font-size: 13px;\n                line-height: 23px;\n            }\n\n            .special-color-heading {\n                font-size: 25.398px !important;\n            }\n\n            .special-color-txt {\n                font-size: 12.839px !important;\n            }\n\n            .icon-list-icons {\n                width: 55px;\n                height: 37px;\n            }\n\n            .max-w-7xl.mx-auto.px-4.py-12.abouts {\n                padding: 0px;\n            }\n\n            .abouted {\n                font-size: 11px;\n            }\n\n            .centered {\n                text-align: center;\n            }\n\n            .about-taglines-COUNTER {\n                font-size: 29.096px;\n                line-height: 28.365px;\n            }\n\n            .counter-heading {\n                font-size: 10.618px;\n                line-height: 14.603px;\n            }\n\n            .counter-number {\n                font-size: 33.47px;\n                line-height: 51.457px;\n            }\n\n            .member-name {\n                font-size: 16px;\n                letter-spacing: 0px;\n            }\n\n            .member-designation {\n                font-size: 13px;\n            }\n        }\n\n        /* /mobile screens */\n        @media only screen and (min-width:320px) and (max-width:766px) {\n            .sidespace-coverup {\n                overflow: hidden\n            }\n\n            .about-taglines {\n                font-size: 23.096px;\n                line-height: 32.365px;\n                padding: 10px 0px 10px 0px;\n            }\n\n            .small-blue-heading {\n                color: #0F3595;\n                font-family: Sora;\n                font-size: 13px;\n                font-style: normal;\n                font-weight: 600;\n                line-height: normal;\n                text-transform: capitalize;\n            }\n\n            .grid.grid-cols-1.gap-4.text-center.hide {\n                display: none;\n            }\n\n            .contact-taglines {\n                font-size: 30px;\n            }\n\n            .contact-text {\n                font-size: 11px;\n            }\n\n            .blue-tags {\n                font-size: 14px;\n                line-height: 148%;\n                padding-top: 32px;\n            }\n\n            .icon-box-text {\n                padding: 5px 0px 0px 7px;\n            }\n\n            .icon-text {\n                font-size: 12px;\n            }\n\n            .icon-heading {\n                font-size: 14px;\n            }\n\n            .form-label {\n                font-size: 11px;\n            }\n\n            .contact-form {\n                padding: 17px;\n            }\n\n            .form-imput {\n                padding: 6px 0px;\n            }\n\n            .contact-page-icons {\n                width: 50px;\n                height: 50px;\n            }\n\n            .max-w-7xl.mx-auto.px-4.spacing-giver {\n                display: none;\n            }\n\n            .phone {\n                display: block;\n            }\n\n            .testimonial-above-spacer-phone {\n                padding: 70px 0px 14px 0px;\n            }\n\n            .testimonial-bg {\n                background-color: #f3f3f3;\n                padding: 17.033px;\n                border-radius: 27.253px;\n            }\n\n            p.testimonial-p {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 11.44px;\n                font-style: normal;\n                font-weight: 400;\n                line-height: 21.66px;\n            }\n\n            p.testimonial-names {\n                color: #1E1E1E;\n                font-family: Sora;\n                font-size: 16.44px;\n                font-style: normal;\n                font-weight: 700;\n                line-height: 30.66px;\n                padding: 20px 0px 20px 0px;\n            }\n\n            .form-submit-btn {\n                font-size: 14px;\n                padding: 9px 42px 9px 42px;\n            }\n\n            .container {\n                width: 100%;\n                /* max-width: 1140px; */\n                max-width: 1240px;\n                margin-left: auto;\n                margin-right: auto;\n                padding: 0 15px;\n            }\n\n            .section-title {\n                color: var(--primary-text);\n                text-align: center;\n                font-size: 40px;\n                font-family: "Cormorant Garamond";\n                font-weight: bold;\n                font-style: normal;\n                line-height: 48px;\n                position: relative;\n                margin-bottom: 52px;\n            }\n\n            .section-title::before,\n            .section-title::after {\n                content: "";\n                position: absolute;\n                left: 25%;\n                top: 22px;\n                width: 45px;\n                height: 2px;\n                background-color: var(--secondary-text);\n            }\n\n            .section-title::after {\n                left: unset;\n                right: 25%;\n            }\n\n            .testimonial-section {\n                padding-top: 82px;\n                padding-bottom: 72px;\n            }\n\n            .swiper {\n                width: 100%;\n                height: 100%;\n                margin-left: auto;\n                margin-right: auto;\n            }\n\n            .swiper-slide {\n                text-align: center;\n                border-radius: 40px;\n                padding: 30px 23px;\n                background: var(--primary-text);\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                flex-direction: column;\n            }\n\n            .swiper-slide img {\n                display: block;\n                width: 100%;\n                height: 100%;\n                object-fit: cover;\n            }\n\n            .swiper-pagination-bullet {\n                width: var(--swiper-pagination-bullet-width,\n                        var(--swiper-pagination-bullet-size, 15px));\n                height: var(--swiper-pagination-bullet-height,\n                        var(--swiper-pagination-bullet-size, 15px));\n                background: #d9d9d9;\n                background: #504b4b;\n            }\n\n            .swiper-horizontal>.swiper-pagination-bullets,\n            .swiper-pagination-bullets.swiper-pagination-horizontal,\n            .swiper-pagination-custom,\n            .swiper-pagination-fraction {\n                bottom: var(--swiper-pagination-bottom, -4px);\n            }\n\n            .swiper-pagination-bullet-active {\n                background: var(--primary-text);\n            }\n\n            .swiper.testimonial-wrapper {\n                padding-top: 59px;\n                padding-bottom: 60px;\n            }\n\n            .testimonial-items .testimonial-text {\n                color: var(--white-text-white);\n                text-align: center;\n                font-size: 16px;\n                font-family: "Outfit";\n                font-weight: normal;\n                font-style: normal;\n                max-width: 330px;\n                margin-bottom: 45px;\n                overflow: hidden;\n                display: -webkit-box;\n                -webkit-box-orient: vertical;\n                line-clamp: 4;\n                -webkit-line-clamp: 4;\n            }\n\n            .testimonial-items .testimonial-title {\n                color: var(--white-text-white);\n                text-align: center;\n                font-size: 16px;\n                font-family: "Outfit";\n                font-weight: bold;\n                font-style: normal;\n                margin-bottom: 35px;\n                position: relative;\n            }\n\n            .testimonial-items .testimonial-title::before {\n                content: "";\n                position: absolute;\n                left: -23px;\n                top: 9px;\n                width: 20px;\n                height: 1px;\n                background-color: var(--white-text-white);\n            }\n\n            .testimonial-img {\n                position: relative;\n                width: 100px;\n                height: 100px;\n                height: 70px;\n            }\n\n            .testimonial-img::before {\n                content: "";\n                position: absolute;\n                left: 50%;\n                top: -50%;\n                transform: translate(-50%, -50%);\n                width: 100px;\n                height: 100px;\n                border-radius: 50%;\n                background-repeat: no-repeat;\n                background-position: center;\n                background-size: cover;\n            }\n\n            .testimonial-img.tm-img-1::before {\n                background-image: url(https://w7.pngwing.com/pngs/646/829/png-transparent-avatar-man-ico-icon-cartoon-little-boy-avatar-cartoon-character-png-material-child-thumbnail.png);\n            }\n\n            .testimonial-img.tm-img-2::before {\n                background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s);\n            }\n\n            .testimonial-img.tm-img-3::before {\n                background-image: url(https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg);\n            }\n\n            /* media query  */\n            @media screen and (min-width: 768px) {\n                .swiper-pagination-bullet {\n                    width: var(--swiper-pagination-bullet-width,\n                            var(--swiper-pagination-bullet-size, 24px));\n                    height: var(--swiper-pagination-bullet-height,\n                            var(--swiper-pagination-bullet-size, 24px));\n                }\n\n                .section-title::before,\n                .section-title::after {\n                    width: 141px;\n                }\n\n\n            }\n\n            .banner-heading {\n                font-size: 26.096px;\n            }\n\n            .bg-image {\n                padding: 13px 0px;\n            }\n\n            .about-text {\n                font-size: 12px;\n                line-height: 22px;\n            }\n\n            .bg-images-of-counter {\n                background-position: center;\n                background-size: contain;\n                background-repeat: no-repeat;\n                display: none;\n            }\n\n            .py-12 {\n                padding-top: 0;\n                padding-bottom: 0;\n            }\n\n            .p-8 {\n                padding: 1rem;\n            }\n\n            .about-taglines-COUNTER {\n                font-size: 33.096px;\n                line-height: 37.365px;\n            }\n\n            .p-2 {\n                padding: 0px, !important;\n            }\n\n            .p-6 {\n                padding: 0px, !important;\n                ;\n            }\n\n            .flex.items-center.space-x-4.p-6.countered {\n                padding: 10px 0px 0px 0px;\n            }\n\n            .flex.flex-col.space-y-2.lg\\:w-1\\/4.centered {\n                text-align: center;\n            }\n\n            .max-w-7xl.mx-auto.px-4.py-12.abouts {\n                padding: 38px 0px 21px 0px;\n            }\n        }\n\n\n\n        /* media query ends*/\n    '
                }}
            />
            <Signup_header />
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.googleapis.com/css?family=Sora" rel="stylesheet" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
                />
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            '\n        .contact-bg{\n            background-image: url("imagesss/Group 1000009929.png");\n            background-position: center;\n            background-size: cover;\n            background-repeat: no-repeat;\n        }\n        .contact-taglines{\n            color: #000;\n            font-family: Sora;\n            font-size: 44px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 72px;\n        }\n        .contact-text{\n            color: #6E7884;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 160%; /* 25.6px */\n        }\n        .blue-tags {\n            color: #006ED9;\n            font-family: Sora;\n            font-size: 18px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 160%;\n            padding-top: 35px;\n        }\n        .icon-heading{\n            color: #000;\n            font-family: Sora;\n            font-size: 18px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 160%; /* 28.8px */\n        }\n        .icon-text{\n            color: #000;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 160%; /* 25.6px */\n        }\n        .icon-box-text{\n            padding: 0px 0px 0px 15px;\n        }\n        .flex.flex.icon-box-contact {\n            padding: 27px 0px 0px 0px;\n        }\n        .contact-form{\n            border-radius: 28px;\n            background: #FFF;\n            box-shadow: 0px 32px 60px -20px rgba(75, 20, 12, 0.10);\n            padding:30px;\n        }\n        .form-label{\n            color: #0D022B;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 160%; /* 25.6px */\n        }\n        .form-imput {\n            fill: #FFF;\n            border: 1px solid #E6E6E6;\n            padding: 9px 0px;\n            border-radius: 10px;\n            width: 100%;\n        }\n        .form-submit-btn {\n            border-radius: 81px;\n            background: linear-gradient(0deg, #006ED9 0%, #006ED9 100%), #0D022B;\n            box-shadow: 0px 12px 40px -8px rgba(0, 110, 217, 0.25);\n            color: #FEFFFF;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: normal;\n            padding: 13px 50px 13px 50px;\n        }\n        @keyframes slideRight {\n            0% {\n                transform: translateX(-100%);\n            }\n            100% {\n                transform: translateX(0);\n            }\n        }\n        \n        @keyframes slideLeft {\n            0% {\n                transform: translateX(0);\n            }\n            100% {\n                transform: translateX(-100%);\n            }\n        }\n\n        .slide-right {\n            animation: slideRight 30s linear infinite;\n        }\n\n        .slide-left {\n            animation: slideLeft 30s linear infinite;\n        }\n\n        .testimonial-track {\n            display: flex;\n            width: max-content;\n        }\n\n        .testimonial-container:hover .testimonial-track {\n            animation-play-state: paused;\n        }\n        .testimonial-name{\n            color: #1E1E1E;\n            font-family: Sora;\n            font-size: 20.44px;\n            font-style: normal;\n            font-weight: 700;\n            line-height: 30.66px; /* 150% */\n            text-align: left;\n        }\n        .testimonial-designation{\n            color: #909090;\n            font-family: Sora;\n            font-size: 13.627px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 20.44px; /* 150% */\n            text-align: left;\n        }\n        .testimonial-text{\n            color: #1E1E1E;\n            font-family: Sora;\n            font-size: 13.627px;\n            font-style: normal;\n            font-weight: 400;\n            line-height: 20.44px; /* 150% */\n            text-align: left;\n        }\n        .testimonial-setup {\n            border-radius: 27.253px;\n            background: #F3F3F3;\n            padding: 15px;\n        }\n        .testimonial-image{\n            border-radius:20px;\n        }\n        .small-blue-heading {\n            color: #0F3595;\n            font-family: Sora;\n            font-size: 16px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: normal;\n            text-transform: capitalize;\n        }\n\n        .about-taglines {\n            color: #000;\n            font-family: Sora;\n            font-size: 47.096px;\n            font-style: normal;\n            font-weight: 600;\n            line-height: 64.365px;\n            /* 136.667% */\n            text-transform: capitalize;\n        }\n        .max-w-7xl.mx-auto.px-4.spacing-giver {\n            padding: 39px 0px 0px 0px;\n        }\n        .contact-page-icons{\n            width:65px;\n            height:64px;\n        }\n        .max-w-7xl.mx-auto.px-4.spacing-giver {\n            display: block;\n        }\n        .phone{\n            display:none;\n        }\n\n\n                /* media query starts */\n\n               /* /laptop css media query/ */\n               @media only screen and (min-width:1280px) and (max-width:1450px)  { \n                .phone{\n                            display:none;\n                        }\n                .max-w-7xl.mx-auto.px-4.spacing-giver {\n                            display: block;\n                        }\n                .contact-bg {\n                    padding: 0px 100px;\n                            }\n                .testimonial-above-spacer-phone{\n                            padding:70px 0px 14px 0px;\n                           }\n                .testimonial-bg{\n                            background-color: #f3f3f3;\n                            padding: 17.033px;\n                            border-radius: 27.253px;\n                           }\n                p.testimonial-p {\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 16.44px;\n                            font-style: normal;\n                            font-weight: 400;\n                            line-height: 26.66px;\n                          }\n                p.testimonial-names{\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 20.44px;\n                            font-style: normal;\n                            font-weight: 700;\n                            line-height: 30.66px; /* 150% */\n                            padding: 20px 0px 20px 0px;\n                         }\n                }\n\n                /* /laptop css media query/ */\n                @media only screen and (min-width:1100px) and (max-width:1280px) { \n                    .phone{\n                            display:block;\n                    }\n                    .max-w-7xl.mx-auto.px-4.spacing-giver {\n                            display:none;\n                        }\n                        .contact-bg {\n                            padding: 0px 39px;\n                        }\n                  }\n\n                /* /* Laptop CSS media query / */\n                @media only screen and (min-width:1020px) and (max-width:1100px) {  \n\n                        .icon-text {\n                                font-size: 12px;\n                        }\n                        .contact-taglines {\n                                font-size: 35px;\n                        }   \n                        .contact-text {\n                            font-size: 14px;\n                        }\n                        .form-label {\n                            font-size: 13px;\n                        }\n                        .grid.grid-cols-1.gap-2.p-8.text-center.spacing-setting {\n                            padding: 0px;\n                        }\n                        .about-taglines {\n                            font-size: 36.096px;\n                            line-height: 49.365px;\n                        }\n                        .sidespace-coverup{\n                            overflow: hidden\n                        }\n                        .phone{\n                            display:block;\n                        }\n                        .max-w-7xl.mx-auto.px-4.spacing-giver {\n                            display: none;\n                        }\n                        .testimonial-above-spacer-phone{\n                            padding:70px 0px 14px 0px;\n                        }\n                        .testimonial-bg{\n                            background-color: #f3f3f3;\n                            padding: 17.033px;\n                            border-radius: 27.253px;\n                        }\n                        p.testimonial-p {\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 16.44px;\n                            font-style: normal;\n                            font-weight: 400;\n                            line-height: 26.66px;\n                        }\n                        p.testimonial-names{\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 20.44px;\n                            font-style: normal;\n                            font-weight: 700;\n                            line-height: 30.66px; /* 150% */\n                            padding: 20px 0px 20px 0px;\n                        }\n                        \n                }\n\n                /* /tablate css media query/ */\n                @media only screen and (min-width:768px) and (max-width:1023px)  { \n                        .contact-page-icons {\n                            width: 39px;\n                            height: 39px;\n                        }\n                        .icon-heading {\n                            font-size: 14px;\n                            line-height: 146%;\n                        }\n                        .icon-text {\n                            font-size: 12px;\n                        }\n                        .icon-box-text {\n                            padding: 0px 0px 20px 8px;\n                        }\n                        .sidespace-coverup{\n                            overflow: hidden\n                        }\n                        .about-taglines { \n                            font-size: 30.096px;\n                            line-height: 37.365px;\n                        }\n                        .contact-text {\n                            font-size: 13px;\n                        }\n                        .contact-taglines {\n                            font-size: 30px;\n                            line-height: 50px;\n                        }\n                        .form-label {\n                            font-size: 11px;\n                        }\n                        .contact-form {\n                            padding: 14px;\n                        }\n                        .form-submit-btn {\n                            font-size: 12px;\n                            padding: 10px 30px 10px 30px;\n                        }\n                        .phone{\n                            display:block;\n                        }\n                        .max-w-7xl.mx-auto.px-4.spacing-giver {\n                            display: none;\n                        }\n                        .testimonial-above-spacer-phone{\n                            padding:70px 0px 14px 0px;\n                        }\n                        .testimonial-bg{\n                            background-color: #f3f3f3;\n                            padding: 17.033px;\n                            border-radius: 27.253px;\n                        }\n                        p.testimonial-p {\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 16.44px;\n                            font-style: normal;\n                            font-weight: 400;\n                            line-height: 26.66px;\n                        }\n                        p.testimonial-names{\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 20.44px;\n                            font-style: normal;\n                            font-weight: 700;\n                            line-height: 30.66px; /* 150% */\n                            padding: 20px 0px 20px 0px;\n                        }\n                 }\n\n                /* /mobile screens */\n                @media only screen and (min-width:320px) and (max-width:766px)  {\n                        .sidespace-coverup{\n                            overflow: hidden\n                        } \n                        .about-taglines {\n                            font-size: 18.096px;\n                            line-height: 25.365px;\n                        }\n                        .small-blue-heading {\n                            color: #0F3595;\n                            font-family: Sora;\n                            font-size: 13px;\n                            font-style: normal;\n                            font-weight: 600;\n                            line-height: normal;\n                            text-transform: capitalize;\n                        }\n                        .grid.grid-cols-1.gap-4.text-center.hide {\n                            display: none;\n                        }\n                        .contact-taglines {\n                            font-size: 30px;\n                        }\n                        .contact-text {\n                            font-size: 11px;\n                        }\n                        .blue-tags {\n                            font-size: 14px;\n                            line-height: 148%;\n                            padding-top: 32px;\n                        }\n                        .icon-box-text {\n                            padding: 5px 0px 0px 7px;\n                        }\n                        .icon-text {\n                            font-size: 12px;\n                        }\n                        .icon-heading {\n                            font-size: 14px;\n                        }\n                        .form-label {\n                            font-size: 11px;\n                        }\n                        .contact-form {\n                            padding: 17px;\n                        }\n                        .form-imput {\n                            padding: 6px 0px;\n                        }\n                        .contact-page-icons {\n                            width: 50px;\n                            height: 50px;\n                        }\n                        .max-w-7xl.mx-auto.px-4.spacing-giver {\n                            display: none;\n                        }\n                        .phone{\n                            display:block;\n                        }\n                        .testimonial-above-spacer-phone{\n                            padding:70px 0px 14px 0px;\n                        }\n                        .testimonial-bg{\n                            background-color: #f3f3f3;\n                            padding: 17.033px;\n                            border-radius: 27.253px;\n                        }\n                        p.testimonial-p {\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 11.44px;\n                            font-style: normal;\n                            font-weight: 400;\n                            line-height: 21.66px;\n                        }\n                        p.testimonial-names {\n                            color: #1E1E1E;\n                            font-family: Sora;\n                            font-size: 16.44px;\n                            font-style: normal;\n                            font-weight: 700;\n                            line-height: 30.66px;\n                            padding: 20px 0px 20px 0px;\n                        }\n                        .form-submit-btn {\n                            font-size: 14px;\n                            padding: 9px 42px 9px 42px;\n                        }\n                        .container {\n                            width: 100%;\n                            /* max-width: 1140px; */\n                            max-width: 1240px;\n                            margin-left: auto;\n                            margin-right: auto;\n                            padding: 0 15px;\n                            }\n\n                            .section-title {\n                            color: var(--primary-text);\n                            text-align: center;\n                            font-size: 40px;\n                            font-family: "Cormorant Garamond";\n                            font-weight: bold;\n                            font-style: normal;\n                            line-height: 48px;\n                            position: relative;\n                            margin-bottom: 52px;\n                            }\n\n                            .section-title::before,\n                            .section-title::after {\n                            content: "";\n                            position: absolute;\n                            left: 25%;\n                            top: 22px;\n                            width: 45px;\n                            height: 2px;\n                            background-color: var(--secondary-text);\n                            }\n                            .section-title::after {\n                            left: unset;\n                            right: 25%;\n                            }\n                            .testimonial-section {\n                            padding-top: 82px;\n                            padding-bottom: 72px;\n                            }\n\n                            .swiper {\n                            width: 100%;\n                            height: 100%;\n                            margin-left: auto;\n                            margin-right: auto;\n                            }\n\n                            .swiper-slide {\n                            text-align: center;\n                            border-radius: 40px;\n                            padding: 30px 23px;\n                            background: var(--primary-text);\n                            display: flex;\n                            justify-content: center;\n                            align-items: center;\n                            flex-direction: column;\n                            }\n\n                            .swiper-slide img {\n                            display: block;\n                            width: 100%;\n                            height: 100%;\n                            object-fit: cover;\n                            }\n\n                            .swiper-pagination-bullet {\n                            width: var(\n                                --swiper-pagination-bullet-width,\n                                var(--swiper-pagination-bullet-size, 15px)\n                            );\n                            height: var(\n                                --swiper-pagination-bullet-height,\n                                var(--swiper-pagination-bullet-size, 15px)\n                            );\n                            background: #d9d9d9;\n                            background: #504b4b;\n                            }\n\n                            .swiper-horizontal > .swiper-pagination-bullets,\n                            .swiper-pagination-bullets.swiper-pagination-horizontal,\n                            .swiper-pagination-custom,\n                            .swiper-pagination-fraction {\n                            bottom: var(--swiper-pagination-bottom, -4px);\n                            }\n\n                            .swiper-pagination-bullet-active {\n                            background: var(--primary-text);\n                            }\n\n                            .swiper.testimonial-wrapper {\n                            padding-top: 59px;\n                            padding-bottom: 60px;\n                            }\n\n                            .testimonial-items .testimonial-text {\n                            color: var(--white-text-white);\n                            text-align: center;\n                            font-size: 16px;\n                            font-family: "Outfit";\n                            font-weight: normal;\n                            font-style: normal;\n                            max-width: 330px;\n                            margin-bottom: 45px;\n                            overflow: hidden;\n                            display: -webkit-box;\n                            -webkit-box-orient: vertical;\n                            line-clamp: 4;\n                            -webkit-line-clamp: 4;\n                            }\n\n                            .testimonial-items .testimonial-title {\n                            color: var(--white-text-white);\n                            text-align: center;\n                            font-size: 16px;\n                            font-family: "Outfit";\n                            font-weight: bold;\n                            font-style: normal;\n                            margin-bottom: 35px;\n                            position: relative;\n                            }\n\n                            .testimonial-items .testimonial-title::before {\n                            content: "";\n                            position: absolute;\n                            left: -23px;\n                            top: 9px;\n                            width: 20px;\n                            height: 1px;\n                            background-color: var(--white-text-white);\n                            }\n\n                            .testimonial-img {\n                            position: relative;\n                            width: 100px;\n                            height: 100px;\n                            height: 70px;\n                            }\n\n                            .testimonial-img::before {\n                            content: "";\n                            position: absolute;\n                            left: 50%;\n                            top: -50%;\n                            transform: translate(-50%, -50%);\n                            width: 100px;\n                            height: 100px;\n                            border-radius: 50%;\n                            background-repeat: no-repeat;\n                            background-position: center;\n                            background-size: cover;\n                            }\n\n                            .testimonial-img.tm-img-1::before {\n                            background-image: url(https://w7.pngwing.com/pngs/646/829/png-transparent-avatar-man-ico-icon-cartoon-little-boy-avatar-cartoon-character-png-material-child-thumbnail.png);\n                            }\n\n                            .testimonial-img.tm-img-2::before {\n                            background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s);\n                            }\n\n                            .testimonial-img.tm-img-3::before {\n                            background-image: url(https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg);\n                            }\n\n                            /* media query  */\n                            @media screen and (min-width: 768px) {\n                                .swiper-pagination-bullet {\n                                    width: var(\n                                    --swiper-pagination-bullet-width,\n                                    var(--swiper-pagination-bullet-size, 24px)\n                                    );\n                                    height: var(\n                                    --swiper-pagination-bullet-height,\n                                    var(--swiper-pagination-bullet-size, 24px)\n                                    );\n                                }\n                                    .section-title::before,\n                                    .section-title::after {\n                                        width: 141px;\n                                    }\n\n                        \n                                }\n\n                            }\n\n\n                                /* media query ends*/\n\n    '
                    }}
                />
                {/* section 1 starts from here */}
                <div className="contact-bg">
                    <div className="max-w-7xl mx-auto  py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                            {/* first column contact info */}
                            <div>
                                <h2 className="contact-taglines">Contact Us</h2>
                                <p className="contact-text">
                                    Contact us by email, phone, or complete the form to discover how
                                    Bima can effectively address your cloud management and governance
                                    challenges with tailored solutions.
                                </p>
                                <h4 className="blue-tags">Get in touch with Edunetwork</h4>
                                <div className="flex flex icon-box-contact">
                                    {/* 1st col */}
                                    <div className="setup-icons">
                                        <svg
                                            className="contact-page-icons"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 65 64"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_794_5629)">
                                                <path
                                                    d="M32.5 64C50.4493 64 65 49.6731 65 32C65 14.3269 50.4493 0 32.5 0C14.5507 0 0 14.3269 0 32C0 49.6731 14.5507 64 32.5 64Z"
                                                    fill="#CCE2F7"
                                                />
                                                <path
                                                    d="M32.5 58C47.1355 58 59 46.3594 59 32C59 17.6406 47.1355 6 32.5 6C17.8645 6 6 17.6406 6 32C6 46.3594 17.8645 58 32.5 58Z"
                                                    fill="#66A8E8"
                                                />
                                                <path
                                                    d="M32.5 53C44.3741 53 54 43.598 54 32C54 20.402 44.3741 11 32.5 11C20.6259 11 11 20.402 11 32C11 43.598 20.6259 53 32.5 53Z"
                                                    fill="#006ED9"
                                                />
                                                <path
                                                    d="M32.5002 22C28.7059 22 25.6191 25.0868 25.6191 28.881C25.6191 33.5898 31.777 40.5025 32.0392 40.7945C32.2854 41.0687 32.7154 41.0682 32.9612 40.7945C33.2234 40.5025 39.3813 33.5898 39.3813 28.881C39.3812 25.0868 36.2944 22 32.5002 22ZM32.5002 32.3431C30.5912 32.3431 29.0382 30.79 29.0382 28.881C29.0382 26.9721 30.5912 25.419 32.5002 25.419C34.4091 25.419 35.9621 26.9721 35.9621 28.8811C35.9621 30.7901 34.4091 32.3431 32.5002 32.3431Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_794_5629">
                                                    <rect width={65} height={64} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    {/* 2nd col */}
                                    <div className="icon-box-text">
                                        <h5 className="icon-heading">Our Location</h5>
                                        <p className="icon-text">
                                            SCO 43, Sector 42C, Level II, Chandigarh (India) - 160036
                                        </p>
                                    </div>
                                </div>
                                {/* Second icon box */}
                                <div className="flex flex icon-box-contact">
                                    {/* 1st col */}
                                    <div className="setup-icons">
                                        <svg
                                            className="contact-page-icons"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 65 64"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_794_5621)">
                                                <path
                                                    d="M32.5 64C50.4493 64 65 49.6731 65 32C65 14.3269 50.4493 0 32.5 0C14.5507 0 0 14.3269 0 32C0 49.6731 14.5507 64 32.5 64Z"
                                                    fill="#CCE2F7"
                                                />
                                                <path
                                                    d="M32.5 58C47.1355 58 59 46.3594 59 32C59 17.6406 47.1355 6 32.5 6C17.8645 6 6 17.6406 6 32C6 46.3594 17.8645 58 32.5 58Z"
                                                    fill="#66A8E8"
                                                />
                                                <path
                                                    d="M32.5 53C44.3741 53 54 43.598 54 32C54 20.402 44.3741 11 32.5 11C20.6259 11 11 20.402 11 32C11 43.598 20.6259 53 32.5 53Z"
                                                    fill="#006ED9"
                                                />
                                                <path
                                                    d="M41.8326 26.7734L36.0703 32.4986L41.8326 38.2238C41.9368 38.0061 42 37.7654 42 37.5084V27.4889C42 27.2318 41.9368 26.9912 41.8326 26.7734Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M40.3297 25.8203H24.6695C24.4125 25.8203 24.1718 25.8835 23.9541 25.9877L31.3189 33.3154C31.9701 33.9666 33.0291 33.9666 33.6803 33.3154L41.0451 25.9877C40.8274 25.8835 40.5867 25.8203 40.3297 25.8203Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M23.1674 26.7734C23.0632 26.9912 23 27.2318 23 27.4889V37.5084C23 37.7655 23.0632 38.0061 23.1674 38.2238L28.9297 32.4986L23.1674 26.7734Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M35.2828 33.2891L34.4674 34.1045C33.3824 35.1895 31.6168 35.1895 30.5318 34.1045L29.7164 33.2891L23.9541 39.0143C24.1718 39.1184 24.4125 39.1816 24.6695 39.1816H40.3297C40.5867 39.1816 40.8274 39.1184 41.0451 39.0143L35.2828 33.2891Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_794_5621">
                                                    <rect width={65} height={64} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    {/* 2nd col */}
                                    <div className="icon-box-text">
                                        <h5 className="icon-heading">Email Address</h5>
                                        <p className="icon-text">
                                            <a href="mailto:s.dudani@skylineimmigration.com">
                                                s.dudani@skylineimmigration.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                {/* third icon box */}
                                <div className="flex flex icon-box-contact">
                                    {/* 1st col */}
                                    <div className="setup-icons">
                                        <svg
                                            className="contact-page-icons"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 65 64"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_794_5612)">
                                                <path
                                                    d="M32.5 64C50.4493 64 65 49.6731 65 32C65 14.3269 50.4493 0 32.5 0C14.5507 0 0 14.3269 0 32C0 49.6731 14.5507 64 32.5 64Z"
                                                    fill="#CCE2F7"
                                                />
                                                <path
                                                    d="M32.5 58C47.1355 58 59 46.3594 59 32C59 17.6406 47.1355 6 32.5 6C17.8645 6 6 17.6406 6 32C6 46.3594 17.8645 58 32.5 58Z"
                                                    fill="#66A8E8"
                                                />
                                                <path
                                                    d="M32.5 53C44.3741 53 54 43.598 54 32C54 20.402 44.3741 11 32.5 11C20.6259 11 11 20.402 11 32C11 43.598 20.6259 53 32.5 53Z"
                                                    fill="#006ED9"
                                                />
                                                <mask
                                                    id="mask0_794_5612"
                                                    style={{ maskType: "luminance" }}
                                                    maskUnits="userSpaceOnUse"
                                                    x={23}
                                                    y={23}
                                                    width={19}
                                                    height={19}
                                                >
                                                    <path d="M42 23H23V42H42V23Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_794_5612)">
                                                    <path
                                                        d="M40.4754 35.4713C39.3122 35.4713 38.17 35.2894 37.0877 34.9317C36.5573 34.7508 35.9053 34.9168 35.5816 35.2492L33.4453 36.8619C30.9677 35.5394 29.4415 34.0138 28.1371 31.5548L29.7023 29.4741C30.109 29.068 30.2549 28.4747 30.0801 27.9181C29.7209 26.83 29.5384 25.6884 29.5384 24.5247C29.5385 23.684 28.8545 23 28.0139 23H24.5246C23.684 23 23 23.684 23 24.5246C23 34.1607 30.8394 42 40.4754 42C41.3161 42 42 41.316 42 40.4754V36.9959C42 36.1553 41.316 35.4713 40.4754 35.4713Z"
                                                        fill="white"
                                                    />
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_794_5612">
                                                    <rect width={65} height={64} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    {/* 2nd col */}
                                    <div className="icon-box-text">
                                        <h5 className="icon-heading">Phone Number</h5>
                                        <p className="icon-text">
                                            Phone: <a href="tel:+91-172-4014522">+91-172-4014522</a>
                                        </p>
                                        <p className="icon-text">
                                            Mobile: <a href="tel:+91-9872311555">+91-9872311555</a>,
                                            <a href="tel:+91-9023888558"> +91-9023888558</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Second col-form */}
                            <div className="contact-form">
                                <form>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="form-label">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="form-imput"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="form-label">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="form-imput"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="Phone Number" className="form-label">
                                                Phone number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="number"
                                                    name="phone-number"
                                                    type="number"
                                                    autoComplete="number"
                                                    className="form-imput"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="email" className="form-label">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="form-imput"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="Message" className="form-label">
                                                How did you first hear about us
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="message"
                                                    rows={5}
                                                    className="form-imput"
                                                    defaultValue={" "}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <button type="submit" className="form-submit-btn">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section 1 ends here */}
                {/* section map starts */}
                <div className="w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27437.891257027688!2d76.7431586!3d30.7258099!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedd1e7aec40d%3A0x7964fc96e71df42d!2sSkyline%20Immigration%20Consultants!5e0!3m2!1sen!2sin!4v1734431155880!5m2!1sen!2sin"
                        width="100%"
                        height={500}
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                {/* section map ends */}
                {/* section testimonial starts */}
                <div className="max-w-7xl mx-auto px-4 spacing-giver">
                    <div className="grid grid-cols-1 gap-2 p-8 text-center spacing-setting">
                        <h3 className="small-blue-heading">Testimonials</h3>
                        <h2 className="about-taglines">
                            What Our{" "}
                            <span style={{ color: "#006ED9" }}> Customers Say About Us </span>
                        </h2>
                        {/* div class="w-full overflow-hidden testimonial-container"> */}
                        {/* Top Row - Sliding Right */}
                        <div className="relative mb-8 sidespace-coverup">
                            <div className="testimonial-track slide-right flex">
                                {/* Testimonial 1 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="https://i.pravatar.cc/150?img=32"
                                            alt="Natasa Enathr"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">Natasa Enathr</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Testimonial 2 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="https://i.pravatar.cc/150?img=33"
                                            alt="Sara Jonson"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">John Doe</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more testimonials here for the top row */}
                            </div>
                        </div>
                        {/* Bottom Row - Sliding Left */}
                        <div className="relative">
                            <div className="testimonial-track slide-left flex">
                                {/* Testimonial 3 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="https://i.pravatar.cc/150?img=34"
                                            alt="John Doe"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">Arthur</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Testimonial 4 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="https://i.pravatar.cc/150?img=35"
                                            alt="Mike Smith"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">Mike Smith</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* testimonial 5 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="imagesss/Sara Jonson-min.png"
                                            alt="Mike Smith"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">Jonson D.</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* testimonials 6 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="imagesss/natasjha-min.png"
                                            alt="Mike Smith"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">Jack</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* testimonial 7 */}
                                <div className="w-[600px] p-4 flex-shrink-0 overflow-hidden">
                                    <div className="rounded-lg  overflow-hidden flex testimonial-setup">
                                        <img
                                            className="testimonial-image"
                                            src="imagesss/Arthur-min (1).png"
                                            alt="Mike Smith"
                                        />
                                        <div className="p-6 w-2/3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="testimonial-name">Archie</h3>
                                                    <p className="testimonial-designation">
                                                        Traveler Enthusiast
                                                    </p>
                                                </div>
                                                <div className="flex text-yellow-400">★★★★★</div>
                                            </div>
                                            <p className="testimonial-text">
                                                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                                amet, consectetur adipisci velit, sed quia non numquam eius
                                                modi tempora incidunt ut labore et dolore magnam aliquam
                                                quaerat voluptatem."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more testimonials here for the bottom row */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* testimonial section  phone*/}
                {/* Carousel */}
                <div className="relative overflow-hidden phone testimonial-above-spacer-phone"  >
                    <div
                        ref={containerRef}
                        id="testimonial-container"
                        className="flex transition-transform duration-500 ease-in-out"
                    >
                        {/* Testimonial 1 */}
                        <div className="w-full flex-shrink-0 px-4">
                            <div className="testimonial-bg">
                                {/* Avatar */}
                                <div className="imgg-set">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white">
                                        <img
                                            src="https://via.placeholder.com/80"
                                            alt="Amy's avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="mt-12 text-center">
                                    <p className="testimonial-p">
                                        Discovering Be Better was a game-changer! Their unmatched
                                        expertise skyrocketed my online presence and credibility. Highly
                                        recommended
                                    </p>
                                    <p className="testimonial-names">— Amy</p>
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="w-full flex-shrink-0 px-4">
                            <div className="testimonial-bg">
                                {/* Avatar */}
                                <div className="imgg-set">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white">
                                        <img
                                            src="https://via.placeholder.com/80"
                                            alt="Amy's avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="mt-12 text-center">
                                    <p className="testimonial-p">
                                        Thanks to Be Better, I've unlocked my true potential and
                                        transformed how others perceive me. Their tailored strategies are
                                        a must for anyone looking to stand out!
                                    </p>
                                    <p className="testimonial-names">— Jhon</p>
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="w-full flex-shrink-0 px-4">
                            <div className="testimonial-bg">
                                {/* Avatar */}
                                <div className="imgg-set">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white">
                                        <img
                                            src="https://via.placeholder.com/80"
                                            alt="Amy's avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="mt-12 text-center">
                                    <p className="testimonial-p">
                                        Working with Be Better, was one of the best career decisions I've
                                        made. Their dedication resulted in a brand identity that truly
                                        resonates with my audience. Invest in your personal brand with
                                        them!
                                    </p>
                                    <p className="testimonial-names">— Katie</p>
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            ref={(el: any) => dotsRef.current[0] = el}
                            className="w-3 h-3 rounded-full bg-primary transition-colors"
                            aria-label="Go to slide 1"
                        />
                        <button
                            ref={(el) => dotsRef.current[1] = el}
                            className="w-3 h-3 rounded-full bg-gray-300 transition-colors"
                            aria-label="Go to slide 2"
                        />
                        <button
                            ref={(el) => dotsRef.current[2] = el}
                            className="w-3 h-3 rounded-full bg-gray-300 transition-colors"
                            aria-label="Go to slide 3"
                        />
                    </div>
                </div>
                {/* section testimonials end */}
                {/* last section starts */}
                <div className="max-w-7xl mx-auto px-4 ">
                    <div className="grid grid-cols-1 gap-4 text-center hide">
                        {/* first col */}
                        <div>
                            <img src="imagesss/image 23.jpg" />
                        </div>
                    </div>
                </div>
                {/* last section ends */}
            </>

            <footer className={`footer_bg `}>

                <div className="flex justify-between paddingLaptop grid xl:grid-rows-1 xxl:grid-rows-1 lg:grid-rows-1 sm:grid-rows-4 md:grid-rows-2 grid-flow-col gap-4 mx-auto max-w-screen-xl">
                    <div className="there_box21">
                        <img src="/skyline-immigration-logo.png" className="footer_logo" alt="Logo" />
                        <p className="footer_heading">Address</p>
                        <p className="footer_content">
                            SCO 43, Sector 42 C, Level II, <br></br>Chandigarh (India) - 160036
                        </p>
                        <p className="footer_heading">Phone</p>
                        <p className="footer_content">+91-9872311555, +91-172-4014522</p>
                        <p className="footer_heading">Email</p>
                        <p className="footer_content">
                            <a href="mailto:s.dudani@skylineimmigration.com" target="_blank">
                                s.dudani@skylineimmigration.com
                            </a>
                        </p>
                        <p className="footer_icon">
                            <a href="https://www.facebook.com/skylineimmigrationconsultant/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="s_footer_icon" viewBox="0 0 301 301" fill="none">
                                    <path
                                        d="M300.266 150.648C300.266 233.564 233.049 300.781 150.133 300.781C67.2168 300.781 0 233.564 0 150.648C0 67.7324 67.2168 0.515625 150.133 0.515625C233.049 0.515625 300.266 67.7324 300.266 150.648Z"
                                        fill="#3B579D"
                                    />
                                    <path
                                        d="M150.133 227.148C108.166 227.148 74.1328 192.892 74.1328 150.648C74.1328 108.405 108.166 74.1484 150.133 74.1484C192.1 74.1484 226.133 108.405 226.133 150.648C226.133 192.892 192.1 227.148 150.133 227.148Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M169.893 227.148V167.892H189.653L192.617 144.804H169.893V130.055C169.893 123.369 171.732 118.809 181.262 118.809H193.407V98.1694C191.31 97.894 184.09 97.2667 175.699 97.2667C158.189 97.2667 146.196 108.023 146.196 127.79V144.819H126.39V167.907H146.196V227.148H169.893Z"
                                        fill="#3B579D"
                                    />
                                </svg>
                            </a>
                            <a href="https://twitter.com/SkylineImmigra1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="s_footer_icon" viewBox="0 0 301 301" fill="none">
                                    <path
                                        d="M300.721 150.648C300.721 233.564 233.504 300.781 150.588 300.781C67.6718 300.781 0.455078 233.564 0.455078 150.648C0.455078 67.7324 67.6718 0.515625 150.588 0.515625C233.504 0.515625 300.721 67.7324 300.721 150.648Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M150.588 74.1484C108.34 74.1484 74.0879 108.4 74.0879 150.648C74.0879 192.897 108.34 227.148 150.588 227.148C192.836 227.148 227.088 192.897 227.088 150.648C227.088 108.4 192.836 74.1484 150.588 74.1484Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M158.957 143.725L191.706 105.658H183.945L155.51 138.711L132.798 105.658H106.603L140.947 155.641L106.603 195.561H114.364L144.393 160.655L168.378 195.561H194.573L158.955 143.725H158.957ZM117.16 111.5H129.08L183.949 189.984H172.029L117.16 111.5Z"
                                        fill="black"
                                    />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UCfi_sZoA9s9mGDxmrCW6fig?view_as=subscriber">
                                <svg xmlns="http://www.w3.org/2000/svg" className="s_footer_icon" viewBox="0 0 302 311" fill="none">
                                    <path
                                        d="M150.955 310.43C234.074 310.43 301.455 241.034 301.455 155.43C301.455 69.8256 234.074 0.429688 150.955 0.429688C67.8362 0.429688 0.455078 69.8256 0.455078 155.43C0.455078 241.034 67.8362 310.43 150.955 310.43Z"
                                        fill="#FF0000"
                                    />
                                    <path
                                        d="M200.204 97.1211H101.706C97.7697 97.1211 93.872 97.92 90.2356 99.472C86.5993 101.024 83.2955 103.299 80.513 106.166C77.7306 109.034 75.5241 112.438 74.0195 116.184C72.515 119.93 71.742 123.945 71.7446 127.999V182.861C71.742 186.915 72.515 190.929 74.0195 194.675C75.5241 198.422 77.7306 201.826 80.513 204.693C83.2955 207.561 86.5993 209.835 90.2356 211.387C93.872 212.939 97.7697 213.738 101.706 213.738H200.204C204.14 213.738 208.038 212.939 211.674 211.387C215.311 209.835 218.615 207.561 221.397 204.693C224.18 201.826 226.386 198.422 227.891 194.675C229.395 190.929 230.168 186.915 230.166 182.861V127.999C230.168 123.945 229.395 119.93 227.891 116.184C226.386 112.438 224.18 109.034 221.397 106.166C218.615 103.299 215.311 101.024 211.674 99.472C208.038 97.92 204.14 97.1211 200.204 97.1211ZM130.083 180.434V130.426L171.827 155.43L130.083 180.434Z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                            <a href="https://in.pinterest.com/skylineimmigration/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="s_footer_icon" viewBox="0 0 301 301" fill="none">
                                    <path
                                        d="M300.631 150.133C300.631 233.049 233.414 300.266 150.498 300.266C67.582 300.266 0.365234 233.049 0.365234 150.133C0.365234 67.2168 67.582 0 150.498 0C233.414 0 300.631 67.2168 300.631 150.133Z"
                                        fill="#D0272C"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M150.955 73.6328C193.206 73.6328 227.455 107.882 227.455 150.133C227.455 192.384 193.206 226.633 150.955 226.633C108.704 226.633 74.4551 192.384 74.4551 150.133C74.4551 107.882 108.704 73.6328 150.955 73.6328Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M144.727 164.659C142.364 177.048 139.477 188.93 130.928 195.133C128.289 176.406 134.803 162.34 137.828 147.41C132.67 138.727 138.449 121.254 149.326 125.56C162.714 130.855 137.735 157.84 154.502 161.21C172.011 164.728 179.158 130.831 168.302 119.811C152.617 103.895 122.641 119.446 126.329 142.235C127.225 147.805 132.981 149.496 128.627 157.185C118.589 154.959 115.592 147.04 115.977 136.485C116.599 119.204 131.501 107.108 146.452 105.434C165.359 103.318 183.103 112.376 185.553 130.159C188.312 150.231 177.019 171.971 156.803 170.408C151.323 169.984 149.022 167.268 144.727 164.659Z"
                                        fill="url(#paint0_linear_203_50)"
                                    />
                                    <defs>
                                        <linearGradient id="paint0_linear_203_50" x1="150.955" y1="105.131" x2="150.955" y2="195.133" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#D0272C" />
                                            <stop offset="1" stop-color="#E62027" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/skylineimmigrationconsultants/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="s_footer_icon" viewBox="0 0 301 301" fill="none">
                                    <path
                                        d="M300.721 150.648C300.721 233.564 233.504 300.781 150.588 300.781C67.6718 300.781 0.455078 233.564 0.455078 150.648C0.455078 67.7324 67.6718 0.515625 150.588 0.515625C233.504 0.515625 300.721 67.7324 300.721 150.648Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M177.742 150.64C177.742 165.636 165.586 177.793 150.589 177.793C135.592 177.793 123.436 165.636 123.436 150.64C123.436 135.643 135.592 123.486 150.589 123.486C165.586 123.486 177.742 135.643 177.742 150.64Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M211.282 104.731C210.034 101.35 208.044 98.2902 205.458 95.7786C202.946 93.1925 199.888 91.2022 196.506 89.9547C193.762 88.8892 189.641 87.621 182.05 87.2755C173.839 86.901 171.377 86.8203 150.589 86.8203C129.799 86.8203 127.337 86.8989 119.127 87.2734C111.537 87.621 107.413 88.8892 104.672 89.9547C101.29 91.2022 98.2296 93.1925 95.7201 95.7786C93.134 98.2902 91.1437 101.348 89.8941 104.731C88.8286 107.474 87.5604 111.597 87.2149 119.188C86.8405 127.397 86.7598 129.859 86.7598 150.649C86.7598 171.438 86.8405 173.9 87.2149 182.111C87.5604 189.702 88.8286 193.823 89.8941 196.566C91.1437 199.949 93.1319 203.007 95.718 205.518C98.2296 208.104 101.287 210.095 104.67 211.342C107.413 212.41 111.537 213.678 119.127 214.023C127.337 214.398 129.797 214.477 150.587 214.477C171.379 214.477 173.841 214.398 182.048 214.023C189.639 213.678 193.762 212.41 196.506 211.342C203.296 208.723 208.662 203.356 211.282 196.566C212.347 193.823 213.615 189.702 213.963 182.111C214.337 173.9 214.416 171.438 214.416 150.649C214.416 129.859 214.337 127.397 213.963 119.188C213.617 111.597 212.349 107.474 211.282 104.731ZM150.589 190.626C128.508 190.626 110.608 172.729 110.608 150.647C110.608 128.566 128.508 110.668 150.589 110.668C172.668 110.668 190.568 128.566 190.568 150.647C190.568 172.729 172.668 190.626 150.589 190.626ZM192.149 118.431C186.989 118.431 182.806 114.247 182.806 109.088C182.806 103.928 186.989 99.7446 192.149 99.7446C197.308 99.7446 201.492 103.928 201.492 109.088C201.49 114.247 197.308 118.431 192.149 118.431Z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/skyline-immigration-consultants/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="s_footer_icon" viewBox="0 0 302 301" fill="none">
                                    <path
                                        d="M301.176 150.562C301.176 233.479 233.959 300.695 151.043 300.695C68.1269 300.695 0.910156 233.479 0.910156 150.562C0.910156 67.6464 68.1269 0.429688 151.043 0.429688C233.959 0.429688 301.176 67.6464 301.176 150.562Z"
                                        fill="#0077B7"
                                    />
                                    <path
                                        d="M200.188 90.5625H101.898C95.903 90.5625 91.043 95.4225 91.043 101.417V199.707C91.043 205.702 95.903 210.562 101.898 210.562H200.188C206.183 210.562 211.043 205.702 211.043 199.707V101.417C211.043 95.4225 206.183 90.5625 200.188 90.5625ZM128.176 194.178C128.176 195.923 126.762 197.337 125.017 197.337H111.57C109.825 197.337 108.411 195.923 108.411 194.178V137.81C108.411 136.065 109.825 134.651 111.57 134.651H125.017C126.762 134.651 128.176 136.065 128.176 137.81V194.178ZM118.294 129.337C111.238 129.337 105.519 123.617 105.519 116.562C105.519 109.507 111.238 103.788 118.294 103.788C125.349 103.788 131.068 109.507 131.068 116.562C131.068 123.617 125.349 129.337 118.294 129.337ZM198.449 194.433C198.449 196.037 197.149 197.337 195.545 197.337H181.115C179.511 197.337 178.211 196.037 178.211 194.433V167.993C178.211 164.048 179.368 150.709 167.903 150.709C159.01 150.709 157.206 159.839 156.844 163.937V194.433C156.844 196.037 155.544 197.337 153.94 197.337H139.984C138.38 197.337 137.079 196.037 137.079 194.433V137.555C137.079 135.951 138.38 134.651 139.984 134.651H153.94C155.544 134.651 156.844 135.951 156.844 137.555V142.473C160.142 137.524 165.042 133.705 175.476 133.705C198.581 133.705 198.449 155.291 198.449 167.151V194.433Z"
                                        fill="white"
                                    />
                                </svg>
                            </a>
                        </p>
                    </div>

                    <div className="there_box22">
                        <p className="footer_heading footer_heading2">Connect</p>
                        <br></br>
                        <p className="footer_content">
                            <a href="about" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                About us
                            </a>
                        </p>
                        {/* <p className="footer_content">
                            <a href="#" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Institution
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="#" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Countries
                            </a>
                        </p> */}
                        <p className="footer_content">
                            <a href="contact" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Contact us
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="Partner_with_us" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Partner with us
                            </a>
                        </p>
                    </div>
                    <div className="there_box23">
                        <p className="footer_heading footer_heading2">Legal</p>
                        <br></br>
                        <p className="footer_content">
                            <a href="https://skylineimmigration.com/" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Terms of Service & Honor Code
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="https://skylineimmigration.com/" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Privacy Policy
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="https://skylineimmigration.com" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Accessibility Policy
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="https://skylineimmigration.com" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Trademark Policy
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="https://skylineimmigration.com/study-in-canada/" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Sitemap
                            </a>
                        </p>
                    </div>
                    <div className="there_box24">
                        <p className="footer_heading footer_heading2">Location</p>
                        <br></br>
                        <iframe
                            className='mapSize'
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54877.37404780033!2d76.744598!3d30.723014!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedd1e7aec40d%3A0x7964fc96e71df42d!2sSkyline%20Immigration%20Consultants!5e0!3m2!1sen!2sus!4v1721210173439!5m2!1sen!2sus"
                            width="100%"
                            height="350"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <div className="main_footer justify-center grid grid-rows-1 grid-flow-col gap-4">
                    <p>Copyright © {new Date().getFullYear()} Skyline Immigration Consultants, All Rights Reserved.</p>
                </div>
            </footer>
        </>

    )
}