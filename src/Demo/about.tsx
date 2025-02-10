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
            <div>
                <div className={`bg-image`} >
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 gap-4 p-8">
                            <h1 className="banner-heading">About Us</h1>
                        </div>
                    </div>
                </div>
                {/* bg-image section ends */}
                {/* Section-2 Starts */}
                <div className="bg-image-about">
                    <div className="max-w-7xl mx-auto abouts">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8">
                            {/* first column */}
                            <div>
                                <h3 className="small-blue-heading">About Edunetwork</h3>
                                <h2 className="about-taglines">
                                    Creating pathways to <br /> success through
                                    <span style={{ color: "#006ED9" }}>
                                        <br /> education{" "}
                                    </span>
                                </h2>
                                <p className="about-text">
                                    SKYLINE IMMIGRATION is a leading consulting firm in India. Mr. Sunil
                                    Dudani, who started the organization heads our team. As a pioneer in
                                    the field of overseas education and employment Mr. Sunil Dudani
                                    commands a good market share and has handled corporate and major
                                    clientele in India and abroad. Under his capable guidance, we are
                                    well ranked Internationally, specializing in different aspects of
                                    International Education, works with educational institutions,
                                    Governmental &amp; Non-Governmental organizations. We have forwarded
                                    number of students to various colleges in Canada, United Kingdom,
                                    USA, Australia, Europe and New Zealand.
                                </p>
                            </div>
                            {/* second column */}
                            <div className="bg-images-of-counter">
                                <div className="special-color">
                                    <div className="grid col-end-1 gap-1 p-8">
                                        <h3 className="special-color-heading">98%</h3>
                                        <p className="special-color-txt">
                                            Courses ipsum suspendisse ultrices risus commodo viverra.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Features Section starts */}
                <div className="max-w-7xl mx-auto px-4 ">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* first col */}
                        <div className="flex items-start space-x-4 icon-list">
                            <svg
                                className="icon-list-icons"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_760_7624)">
                                    <path
                                        d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0Z"
                                        fill="#006ED9"
                                    />
                                    <path
                                        d="M18.0823 9.45728L11.5822 15.9572C11.3872 16.1522 11.1312 16.2503 10.8752 16.2503C10.6193 16.2503 10.3633 16.1522 10.1683 15.9572L6.91833 12.7072C6.52722 12.3163 6.52722 11.6842 6.91833 11.2933C7.30927 10.9022 7.94116 10.9022 8.33228 11.2933L10.8752 13.8362L16.6683 8.04333C17.0593 7.65222 17.6912 7.65222 18.0823 8.04333C18.4732 8.43427 18.4732 9.06616 18.0823 9.45728Z"
                                        fill="#FAFAFA"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_760_7624">
                                        <rect width={24} height={24} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="about-text">
                                Till date we have sent over 10000 students on study visa.
                            </p>
                        </div>
                        {/* second col */}
                        <div className="flex items-start space-x-4 icon-list">
                            <svg
                                className="icon-list-icons"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_760_7624)">
                                    <path
                                        d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0Z"
                                        fill="#006ED9"
                                    />
                                    <path
                                        d="M18.0823 9.45728L11.5822 15.9572C11.3872 16.1522 11.1312 16.2503 10.8752 16.2503C10.6193 16.2503 10.3633 16.1522 10.1683 15.9572L6.91833 12.7072C6.52722 12.3163 6.52722 11.6842 6.91833 11.2933C7.30927 10.9022 7.94116 10.9022 8.33228 11.2933L10.8752 13.8362L16.6683 8.04333C17.0593 7.65222 17.6912 7.65222 18.0823 8.04333C18.4732 8.43427 18.4732 9.06616 18.0823 9.45728Z"
                                        fill="#FAFAFA"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_760_7624">
                                        <rect width={24} height={24} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="about-text">
                                Till date we have sent over 10000 students on study visa.
                            </p>
                        </div>
                        {/* third col */}
                        <div className="flex items-start space-x-4 icon-list">
                            <svg
                                className="icon-list-icons"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_760_7624)">
                                    <path
                                        d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0Z"
                                        fill="#006ED9"
                                    />
                                    <path
                                        d="M18.0823 9.45728L11.5822 15.9572C11.3872 16.1522 11.1312 16.2503 10.8752 16.2503C10.6193 16.2503 10.3633 16.1522 10.1683 15.9572L6.91833 12.7072C6.52722 12.3163 6.52722 11.6842 6.91833 11.2933C7.30927 10.9022 7.94116 10.9022 8.33228 11.2933L10.8752 13.8362L16.6683 8.04333C17.0593 7.65222 17.6912 7.65222 18.0823 8.04333C18.4732 8.43427 18.4732 9.06616 18.0823 9.45728Z"
                                        fill="#FAFAFA"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_760_7624">
                                        <rect width={24} height={24} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="about-text">
                                Till date we have sent over 10000 students on study visa.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Features Section ends */}
                {/* Section-2 ends */}
                {/* Section-3 starts */}
                <div className="max-w-7xl mx-auto px-4 py-12 abouts">
                    <div className="grid grid-cols-12 gap-4">
                        {/* first column */}
                        <div className="col-span-12 sm:col-span-4 ">
                            <h3 className="small-blue-heading">About Edunetwork</h3>
                            <h2 className="about-taglines">
                                Our<span style={{ color: "#006ED9" }}>Vision </span>
                            </h2>
                            <img src="imagesss/Group 1000009915 (1).png" />
                            <p className="abouted">
                                Join us over <span style={{ color: "#006ED9" }}> 4000+ </span>{" "}
                                students{" "}
                            </p>
                            <img src="imagesss/Group 1000001613.jpg" />
                        </div>
                        {/* second column */}
                        <div className="col-span-12 sm:col-span-8 ">
                            <p className="about-text">
                                We are currently agents of some established Colleges &amp;
                                Universities like Guildford College, Bell’s college, Oxford College of
                                London, Anniesland College, Bickenhall College, Manchester
                                International College, Birmingham College, Spinnaker College, Blake
                                College.
                                <br />
                                We are also the representative agents of many Australian Institutes
                                like Career College, AICT, CQ University, Charles Darwin University,
                                Charles Stuart University, AUSBATAR, Tuart College, and Meridian
                                Business College.
                                <br />
                                We have already given many quality students to various institutes in
                                New Zealand like Royal Business College, Ais St Helens, Computer Power
                                Institute, IPC, Otago Polytechnic, Natcoll Design Technology, Tasman
                                International Academies, NIS, Whiteria polytechnic, NZSE, SBG, ICL,
                                and CPI
                                <br />
                                We considered as the best study visa consultants and We serve the
                                following cities Moga, Ambala , Jalandhar, Sangrur, Yamunanagar,
                                Nawanshahr, Morinda, Zirakpur, Mohali, Patiala, Amritsar, Batala,
                                Abhoar, Phagwara, Firozpur, Gurdaspur, Fatehgarh, Patra, Ludhiana,
                                Jalandhar, Banga, Zira, Faridkot, Sri Muktsar Sahib, Malout, Bhiwani,
                                Faridabad, Fatehabad, Hisar, Jhajjar, Jind, Kaithal, Karnal,
                                Panchkula, Rohtak, Sirsa, Sonipat.
                                <br />
                                For following countries Canada, USA, UK, Australia, New Zealand,
                                Germany, Europe, Dubai, Singapore, Switzerland, Latvia, Poland,
                                Ireland, Malaysia, Denmark, France, Lithuania, Cyprus, South Korea.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Section-3 ends */}
                {/* section-4 starts */}
                <div className="gradient-bg">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="flex flex-col lg:flex-row items-center ">
                            {/* first col */}
                            <div className="flex flex-col  space-y-2 lg:w-1/4 centered">
                                <h3 className="small-blue-heading">Amazing Works</h3>
                                <h2 className="about-taglines-COUNTER">Achievements So Far</h2>
                            </div>
                            {/* second col */}
                            <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex items-center space-x-4 p-6 countered">
                                    <div className="p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={67}
                                            height={68}
                                            viewBox="0 0 67 68"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_767_11342)">
                                                <path
                                                    d="M33.2359 67.4562C51.5916 67.4562 66.4718 52.576 66.4718 34.2203C66.4718 15.8646 51.5916 0.984375 33.2359 0.984375C14.8802 0.984375 0 15.8646 0 34.2203C0 52.576 14.8802 67.4562 33.2359 67.4562Z"
                                                    fill="#B1E5FC"
                                                />
                                                <path
                                                    d="M27.0042 46.6847H23.2652C22.6041 46.6847 21.97 46.4221 21.5026 45.9546C21.0351 45.4872 20.7725 44.8532 20.7725 44.192V35.4676C20.7725 34.8065 21.0351 34.1725 21.5026 33.705C21.97 33.2376 22.6041 32.9749 23.2652 32.9749H27.0042M27.0042 46.6847V32.9749M27.0042 46.6847H41.063C41.6641 46.6915 42.2475 46.4808 42.7056 46.0915C43.1636 45.7021 43.4655 45.1603 43.5557 44.566L45.2756 33.3488C45.3299 32.9916 45.3058 32.6268 45.205 32.2798C45.1043 31.9328 44.9293 31.6118 44.6922 31.3391C44.4551 31.0664 44.1615 30.8486 43.8318 30.7006C43.5022 30.5527 43.1443 30.4781 42.7829 30.4822H35.7286V25.4969C35.7286 24.5052 35.3347 23.5542 34.6335 22.853C33.9323 22.1517 32.9812 21.7578 31.9896 21.7578L27.0042 32.9749"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_767_11342">
                                                    <rect width={67} height={68} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-4xl">
                                            <span className="counter-number" data-target={2000}>
                                                2K
                                            </span>
                                            +
                                        </h4>
                                        <p className="counter-heading">Dummy Statistics</p>
                                    </div>
                                </div>
                                {/* third col */}
                                <div className="flex items-center space-x-4 p-6 countered">
                                    <div className="p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={68}
                                            height={68}
                                            viewBox="0 0 68 68"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_767_11336)">
                                                <path
                                                    d="M33.9439 67.4562C52.2996 67.4562 67.1798 52.576 67.1798 34.2203C67.1798 15.8646 52.2996 0.984375 33.9439 0.984375C15.5882 0.984375 0.708008 15.8646 0.708008 34.2203C0.708008 52.576 15.5882 67.4562 33.9439 67.4562Z"
                                                    fill="#FFD88D"
                                                />
                                                <path
                                                    d="M39.5527 30.9803L28.3354 24.5117"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M45.1608 39.208V29.2372C45.1604 28.8001 45.045 28.3708 44.8262 27.9923C44.6074 27.6139 44.293 27.2996 43.9145 27.0811L35.19 22.0957C34.8111 21.8769 34.3812 21.7617 33.9437 21.7617C33.5061 21.7617 33.0763 21.8769 32.6973 22.0957L23.9729 27.0811C23.5943 27.2996 23.2799 27.6139 23.0612 27.9923C22.8424 28.3708 22.727 28.8001 22.7266 29.2372V39.208C22.727 39.6451 22.8424 40.0745 23.0612 40.4529C23.2799 40.8314 23.5943 41.1456 23.9729 41.3642L32.6973 46.3496C33.0763 46.5684 33.5061 46.6835 33.9437 46.6835C34.3812 46.6835 34.8111 46.5684 35.19 46.3496L43.9145 41.3642C44.293 41.1456 44.6074 40.8314 44.8262 40.4529C45.045 40.0745 45.1604 39.6451 45.1608 39.208Z"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M23.0635 27.9414L33.9441 34.2355L44.8247 27.9414"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M33.9438 46.7818V34.2188"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_767_11336">
                                                    <rect width={68} height={68} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-4xl">
                                            <span className="counter-number" data-target={9000}>
                                                8K
                                            </span>
                                            +
                                        </h4>
                                        <p className="counter-heading">Dummy Statistics</p>
                                    </div>
                                </div>
                                {/* fourth col */}
                                <div className="flex items-center space-x-4 p-6 countered">
                                    <div className="p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={67}
                                            height={68}
                                            viewBox="0 0 67 68"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_767_11330)">
                                                <path
                                                    d="M33.6519 67.4562C52.0076 67.4562 66.8878 52.576 66.8878 34.2203C66.8878 15.8646 52.0076 0.984375 33.6519 0.984375C15.2962 0.984375 0.416016 15.8646 0.416016 34.2203C0.416016 52.576 15.2962 67.4562 33.6519 67.4562Z"
                                                    fill="#CFF2D1"
                                                />
                                                <path
                                                    d="M39.2606 30.9803L28.0435 24.5117"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M44.8691 39.208V29.2372C44.8686 28.8001 44.7532 28.3708 44.5345 27.9923C44.3157 27.6139 44.0013 27.2996 43.6227 27.0811L34.8983 22.0957C34.5193 21.8769 34.0895 21.7617 33.6519 21.7617C33.2144 21.7617 32.7845 21.8769 32.4056 22.0957L23.6812 27.0811C23.3026 27.2996 22.9882 27.6139 22.7694 27.9923C22.5507 28.3708 22.4353 28.8001 22.4348 29.2372V39.208C22.4353 39.6451 22.5507 40.0745 22.7694 40.4529C22.9882 40.8314 23.3026 41.1456 23.6812 41.3642L32.4056 46.3496C32.7845 46.5684 33.2144 46.6835 33.6519 46.6835C34.0895 46.6835 34.5193 46.5684 34.8983 46.3496L43.6227 41.3642C44.0013 41.1456 44.3157 40.8314 44.5345 40.4529C44.7532 40.0745 44.8686 39.6451 44.8691 39.208Z"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M22.7712 27.9414L33.6518 34.2355L44.5325 27.9414"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M33.6519 46.7818V34.2188"
                                                    stroke="#1D1E25"
                                                    strokeWidth="1.6618"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_767_11330">
                                                    <rect width={67} height={68} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-4xl">
                                            <span className="counter-number" data-target={6000}>
                                                9K
                                            </span>
                                            +
                                        </h4>
                                        <p className="counter-heading">Dummy Statistics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section-4 Ends */}
                {/* section 5 starts */}
                <div className="team-bg">
                    <div className="max-w-7xl mx-auto px-4 py-12 abouts">
                        <div className="grid grid-cols-1 gap-2 p-8 text-center">
                            <h2 className="about-taglines">Amazing Team</h2>
                            <p className="about-text">
                                We provide experienced advisors to help your company become more{" "}
                                <br /> successful in the future.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            {/* first col for team */}
                            <div>
                                <img src="imagesss/Group 1000009920-min.jpg" />
                                <h6 className="member-name">
                                    Rockwell Walter
                                    <p className="member-designation">MBA Professor</p>
                                </h6>
                            </div>
                            {/* second col for team */}
                            <div>
                                <img src="imagesss/Group 1000009921-min.jpg" />
                                <h6 className="member-name">
                                    Rockwell Walter
                                    <p className="member-designation">MBA Professor</p>
                                </h6>
                            </div>
                            {/* third col for team */}
                            <div>
                                <img src="imagesss/Group 1000009922-min.jpg" />
                                <h6 className="member-name">
                                    Rockwell Walter
                                    <p className="member-designation">MBA Professor</p>
                                </h6>
                            </div>
                            {/* third col for team */}
                            <div>
                                <img src="imagesss/Group 1000009923-min.jpg" />
                                <h6 className="member-name">
                                    Rockwell Walter
                                    <p className="member-designation">MBA Professor</p>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section 5 ends */}
                {/* section testimonial starts */}
                <div className="max-w-7xl mx-auto px-4 py-12 spacing-giver">
                    <div className="grid grid-cols-1 gap-2 p-8 text-center">
                        <h3 className="small-blue-heading">Testimonials</h3>
                        <h2 className="about-taglines">
                            What Our{" "}
                            <span style={{ color: "#006ED9" }}> Customers Say About Us </span>
                        </h2>
                        {/* div class="w-full overflow-hidden testimonial-container"> */}
                        {/* Top Row - Sliding Right */}
                        <div className="relative mb-8">
                            <div className="testimonial-track slide-right flex">
                                {/* Testimonial 1 */}
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                                <div className="w-[600px] p-4 flex-shrink-0">
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
                {/* section testimonials end */}
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
                                            className="w-full h-full object-covers"
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
                {/* js starts */}
            </div>
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
                            <a href="#" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="set_footer_icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                Institution
                            </a>
                        </p>
                        <p className="footer_content">
                            <a href="#" >
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