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
                <link href="https://fonts.googleapis.com/css?family=Sora" rel="stylesheet" />
                {/* section-1 starts */}
                <div className="bg-color">
                    <div className="max-w-7xl mx-auto px-4 py-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8">
                            {/* first col */}
                            <div>
                                <h1 className="about-taglines">
                                    Your Successis Our Success - We're Here to See You{" "}
                                    <span style={{ color: "#006ED9" }}>Grow</span>
                                </h1>
                                <p className="partner-text">
                                    Edunetwork is more than a platform. It’s your trusted partner to
                                    help you do what you do best: help as many students as possible
                                    fulfill their international education dreams.&nbsp;
                                </p>
                                <button className="partner-btn" type="button">
                                    Become a partner
                                </button>
                            </div>
                            {/* second col */}
                            <div className="pt-10">
                                <img src="imagesss/Partner Vector (1).png" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* section 1 ends */}
                {/* Section 2 starts */}
                <div className="max-w-7xl mx-auto px-4 py-1 hide-on-phone">
                    <div className="grid grid-cols-1 gap-4 p-8 text-center">
                        <h2 className="about-taglines">
                            How It <span style={{ color: "#006ED9" }}>Works</span>
                        </h2>
                        <p className="about-text">
                            Try variety of benefits when using our services
                        </p>
                    </div>
                </div>
                {/* features section starts */}
                <div className="max-w-7xl mx-auto px-4 py-1">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* first feature box */}
                        <div className="flex flex-row feature-boxes">
                            {/* first col */}
                            <div className="grid grid-cols-1 gap-4 ">
                                <div>
                                    <svg
                                        className=" icon-wh"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 70 70"
                                        fill="none"
                                    >
                                        <path
                                            d="M20.5699 16.9582C19.385 16.9582 18.4024 15.9756 18.4024 14.7907V6.12063C18.4024 4.93573 19.385 3.95312 20.5699 3.95312C21.7548 3.95312 22.7374 4.93573 22.7374 6.12063V14.7907C22.7374 15.9756 21.7548 16.9582 20.5699 16.9582Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M43.69 16.9582C42.5051 16.9582 41.5225 15.9756 41.5225 14.7907V6.12063C41.5225 4.93573 42.5051 3.95312 43.69 3.95312C44.8749 3.95312 45.8575 4.93573 45.8575 6.12063V14.7907C45.8575 15.9756 44.8749 16.9582 43.69 16.9582Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M58.1401 24.9071V49.4721C58.1401 58.1422 53.8051 63.9222 43.69 63.9222H20.57C10.4549 63.9222 6.11993 58.1422 6.11993 49.4721V24.9071C6.11993 16.237 10.4549 10.457 20.57 10.457H43.69C53.8051 10.457 58.1401 16.237 58.1401 24.9071Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M37.91 34.2959H20.5699C19.385 34.2959 18.4024 33.3133 18.4024 32.1284C18.4024 30.9435 19.385 29.9609 20.5699 29.9609H37.91C39.0949 29.9609 40.0775 30.9435 40.0775 32.1284C40.0775 33.3133 39.0949 34.2959 37.91 34.2959Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M29.2399 48.7491H20.5699C19.385 48.7491 18.4024 47.7665 18.4024 46.5816C18.4024 45.3967 19.385 44.4141 20.5699 44.4141H29.2399C30.4248 44.4141 31.4074 45.3967 31.4074 46.5816C31.4074 47.7665 30.4248 48.7491 29.2399 48.7491Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M61.03 39.7306C58.4579 37.6787 55.1922 36.4648 51.6375 36.4648C48.0828 36.4648 44.7593 37.7075 42.1583 39.8172C38.6614 42.5627 36.465 46.8689 36.465 51.6374C36.465 54.4696 37.2742 57.1862 38.6614 59.4404C39.7307 61.2033 41.1179 62.735 42.7652 63.9199C45.2506 65.7406 48.314 66.8099 51.6375 66.8099C55.4812 66.8099 58.9493 65.3938 61.6081 63.024C62.793 62.0414 63.8044 60.8276 64.6136 59.4404C66.0008 57.1862 66.81 54.4696 66.81 51.6374C66.81 46.8111 64.5558 42.505 61.03 39.7306ZM51.6375 58.8624C51.6375 54.8742 48.4007 51.6374 44.4125 51.6374C48.4007 51.6374 51.6375 48.4006 51.6375 44.4124C51.6375 48.4006 54.8743 51.6374 58.8625 51.6374C54.8743 51.6374 51.6375 54.8742 51.6375 58.8624Z"
                                            fill="#006ED9"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* second-col */}
                            <div className="grid grid-cols-1 gap-4 spaced">
                                <div>
                                    <h3 className="heading-feature">Grow Quicker with Lower Costs</h3>
                                    <p className="feature-txt">
                                        Edunetwork Recruitment Partners have grown more than 5X in the
                                        last 5 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* second feature box */}
                        <div className="flex flex-row feature-boxes">
                            {/* first col */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <svg
                                        className=" icon-wh"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 70 70"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M25.028 9.99219V51.406C24.0454 51.4349 23.0628 51.6661 22.3403 52.0996L15.5487 55.9722C10.8091 58.6888 6.90762 56.4346 6.90762 50.9436V22.8238C6.90762 21.0031 8.20813 18.7489 9.82653 17.8241L22.3403 10.6569C23.0628 10.2523 24.0454 10.0211 25.028 9.99219Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M45.7486 18.6325V60.0463C44.7371 60.0752 43.7545 59.9018 42.9742 59.5261L27.8017 51.9254C27.0214 51.5497 26.0388 51.3763 25.0273 51.4052V9.99138C26.0388 9.96248 27.0214 10.1359 27.8017 10.5116L42.9742 18.1123C43.7545 18.488 44.7371 18.6614 45.7486 18.6325Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M63.87 19.0943V47.2141C63.87 49.0348 62.5695 51.289 60.9511 52.2138L48.4373 59.3811C47.7148 59.7857 46.7322 60.0169 45.7496 60.0458V18.6319C46.7322 18.603 47.7148 18.3718 48.4373 17.9383L55.2288 14.0657C59.9685 11.3491 63.87 13.6033 63.87 19.0943Z"
                                            fill="#006ED9"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* second-col */}
                            <div className="grid grid-cols-1 gap-4 spaced">
                                <div>
                                    <h3 className="heading-feature">
                                        Trusted and Transparent Payments
                                    </h3>
                                    <p className="feature-txt">
                                        Edunetwork Recruitment Partners have grown more than 5X in the
                                        last 5 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* third feature box */}
                        <div className="flex flex-row feature-boxes">
                            {/* first col */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <svg
                                        className=" icon-wh"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 70 70"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.6"
                                            d="M51.7024 30.6005V35.0222H6.06915V30.6005C6.06915 23.8957 11.5313 18.4336 18.2361 18.4336H39.5354C46.2403 18.4336 51.7024 23.8957 51.7024 30.6005Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M51.7024 35.0195V51.7527C51.7024 58.4575 46.2403 63.9196 39.5354 63.9196H18.2361C11.5313 63.9196 6.06915 58.4575 6.06915 51.7527V35.0195H51.7024Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M16.1843 15.1386C14.9994 15.1386 14.0168 14.156 14.0168 12.9711V7.9136C14.0168 6.7287 14.9994 5.74609 16.1843 5.74609C17.3692 5.74609 18.3518 6.7287 18.3518 7.9136V12.9711C18.3518 14.1849 17.3692 15.1386 16.1843 15.1386Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M27.7451 15.1386C26.5601 15.1386 25.5775 14.156 25.5775 12.9711V7.9136C25.5775 6.7287 26.5601 5.74609 27.7451 5.74609C28.93 5.74609 29.9126 6.7287 29.9126 7.9136V12.9711C29.9126 14.1849 28.93 15.1386 27.7451 15.1386Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M39.3039 15.1386C38.119 15.1386 37.1364 14.156 37.1364 12.9711V7.9136C37.1364 6.7287 38.119 5.74609 39.3039 5.74609C40.4889 5.74609 41.4715 6.7287 41.4715 7.9136V12.9711C41.4715 14.1849 40.4889 15.1386 39.3039 15.1386Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M62.8581 41.7242C62.8581 47.9377 57.8295 52.9663 51.616 52.9663V30.4531C57.8006 30.4531 62.8581 35.5106 62.8581 41.7242Z"
                                            fill="#006ED9"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* second-col */}
                            <div className="grid grid-cols-1 gap-4 spaced">
                                <div>
                                    <h3 className="heading-feature">Grow Quicker with Lower Costs</h3>
                                    <p className="feature-txt">
                                        Edunetwork Recruitment Partners have grown more than 5X in the
                                        last 5 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* second feature row strats */}
                {/* fourth f box */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                        <div className="flex flex-row feature-boxes-added">
                            {/* first col */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <svg
                                        className=" icon-wh"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 70 70"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M25.028 9.99219V51.406C24.0454 51.4349 23.0628 51.6661 22.3403 52.0996L15.5487 55.9722C10.8091 58.6888 6.90762 56.4346 6.90762 50.9436V22.8238C6.90762 21.0031 8.20813 18.7489 9.82653 17.8241L22.3403 10.6569C23.0628 10.2523 24.0454 10.0211 25.028 9.99219Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M45.7486 18.6325V60.0463C44.7371 60.0752 43.7545 59.9018 42.9742 59.5261L27.8017 51.9254C27.0214 51.5497 26.0388 51.3763 25.0273 51.4052V9.99138C26.0388 9.96248 27.0214 10.1359 27.8017 10.5116L42.9742 18.1123C43.7545 18.488 44.7371 18.6614 45.7486 18.6325Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M63.87 19.0943V47.2141C63.87 49.0348 62.5695 51.289 60.9511 52.2138L48.4373 59.3811C47.7148 59.7857 46.7322 60.0169 45.7496 60.0458V18.6319C46.7322 18.603 47.7148 18.3718 48.4373 17.9383L55.2288 14.0657C59.9685 11.3491 63.87 13.6033 63.87 19.0943Z"
                                            fill="#006ED9"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* second-col */}
                            <div className="grid grid-cols-1 gap-4 spaced 7-spaced">
                                <div>
                                    <h3 className="heading-feature">
                                        Trusted and Transparent Payments
                                    </h3>
                                    <p className="feature-txt">
                                        Edunetwork Recruitment Partners have grown <br /> more than 5X in
                                        the last 5 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row feature-boxes-add">
                            {/* first col */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <svg
                                        className=" icon-wh"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 70 70"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M25.028 9.99219V51.406C24.0454 51.4349 23.0628 51.6661 22.3403 52.0996L15.5487 55.9722C10.8091 58.6888 6.90762 56.4346 6.90762 50.9436V22.8238C6.90762 21.0031 8.20813 18.7489 9.82653 17.8241L22.3403 10.6569C23.0628 10.2523 24.0454 10.0211 25.028 9.99219Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            d="M45.7486 18.6325V60.0463C44.7371 60.0752 43.7545 59.9018 42.9742 59.5261L27.8017 51.9254C27.0214 51.5497 26.0388 51.3763 25.0273 51.4052V9.99138C26.0388 9.96248 27.0214 10.1359 27.8017 10.5116L42.9742 18.1123C43.7545 18.488 44.7371 18.6614 45.7486 18.6325Z"
                                            fill="#006ED9"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M63.87 19.0943V47.2141C63.87 49.0348 62.5695 51.289 60.9511 52.2138L48.4373 59.3811C47.7148 59.7857 46.7322 60.0169 45.7496 60.0458V18.6319C46.7322 18.603 47.7148 18.3718 48.4373 17.9383L55.2288 14.0657C59.9685 11.3491 63.87 13.6033 63.87 19.0943Z"
                                            fill="#006ED9"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* second-col */}
                            <div className="grid grid-cols-1 gap-4 spaced 7-spaced">
                                <div>
                                    <h3 className="heading-feature">
                                        Trusted and Transparent Payments
                                    </h3>
                                    <p className="feature-txt">
                                        Edunetwork Recruitment Partners have grown <br />
                                        more than 5X in the last 5 years.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* fifth f box */}
                {/* Section 2 Ends */}
                {/* section 3 starts */}
                <div className="bg-color">
                    <div className="max-w-7xl mx-auto px-4 py-1">
                        <div className="grid grid-cols-1 gap-4 p-8 text-center">
                            <h3 className="about-taglines">
                                Access More{" "}
                                <span style={{ color: "#006ED9" }}>
                                    Institutions,
                                    <br /> Perks,
                                </span>{" "}
                                and <span style={{ color: "#006ED9" }}>Faster Commissions</span>
                            </h3>
                            <p className="about-text">
                                Here to help you grow your business by offering the best opportunities
                                and support.
                            </p>
                        </div>
                        {/* col-1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 below-border  ">
                            <div>
                                <img className="acess-vectors" src="imagesss/Group223 (1).png" />
                                <h4 className="head-across">Best Commissions</h4>
                                <p className="about-text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s.
                                </p>
                            </div>
                            <div>
                                <img className="desk-img" src="imagesss/across-1-min.jpg" />
                                <img
                                    className="tablet-image"
                                    src="imagesss/tablet-across-1-min.jpg"
                                />
                            </div>
                        </div>
                        {/* col-2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 below-border  ">
                            <div>
                                <img className="desk-img" src="imagesss/across-2-min.jpg" />
                                <img
                                    className="tablet-image"
                                    src="imagesss/tablet-across-2-min.jpg"
                                />
                            </div>
                            <div>
                                <img
                                    className="acess-vectors"
                                    src="imagesss/Group 1000009910 (1).png"
                                />
                                <h4 className="head-across">Best Commissions</h4>
                                <p className="about-text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s.
                                </p>
                            </div>
                        </div>
                        {/* col-3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 below-border ">
                            <div>
                                <img
                                    className="acess-vectors"
                                    src="imagesss/Group 1000009909 (1).png"
                                />
                                <h4 className="head-across">Best Commissions</h4>
                                <p className="about-text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s.
                                </p>
                            </div>
                            <div>
                                <img className="desk-img" src="imagesss/across-3-min.jpg" />
                                <img
                                    className="tablet-image"
                                    src="imagesss/tablet-across-3-min.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* section 3 ends */}
                {/* section-4 starts */}
                <div className="max-w-7xl mx-auto px-4 py-1">
                    <div className="grid grid-cols-1 gap-4 p-8 text-center">
                        <h3 className="about-taglines">
                            An Easy-to-Use Platform that <br />
                            Connects You to the <span style={{ color: "#006ED9" }}>Right</span>{" "}
                            Programs
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 ">
                        <div className="centered-set text-center">
                            <img className="imag-set" src="imagesss/18953923_6048731 1 (1).png" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
                            <div className="flex flex-row setted">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={53}
                                            height={53}
                                            viewBox="0 0 53 53"
                                            fill="none"
                                        >
                                            <circle cx="26.5" cy="26.5" r="26.5" fill="#BBDDFF" />
                                            <path
                                                d="M20.5146 27.4482V24.0892L21.7358 25.3104C21.8903 25.4649 22.1407 25.4649 22.2952 25.3104C22.3724 25.2332 22.411 25.132 22.411 25.0308C22.411 24.9296 22.3724 24.8283 22.2952 24.7511L20.3987 22.8547C20.2442 22.7002 19.9938 22.7002 19.8394 22.8547L17.943 24.7511C17.7885 24.9056 17.7885 25.156 17.943 25.3104C18.0975 25.4649 18.3478 25.4649 18.5023 25.3104L19.7235 24.0892V27.4482C19.7235 27.6667 19.9006 27.8438 20.119 27.8438C20.3375 27.8438 20.5146 27.6667 20.5146 27.4482Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M20.5147 38.6045V29.0287C20.5147 28.8103 20.3376 28.6332 20.1192 28.6332C19.9007 28.6332 19.7236 28.8103 19.7236 29.0287V38.6045C19.7236 38.8229 19.9007 39 20.1192 39C20.3376 39 20.5147 38.8229 20.5147 38.6045Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M15.6875 38.6045V30.943L16.9087 32.1643C17.0632 32.3188 17.3136 32.3188 17.468 32.1643C17.5452 32.0871 17.5838 31.9858 17.5838 31.8846C17.5838 31.7834 17.5452 31.6822 17.468 31.605L15.5716 29.7086C15.4171 29.5541 15.1667 29.5541 15.0122 29.7086L13.1158 31.605C12.9614 31.7595 12.9614 32.0099 13.1158 32.1643C13.2703 32.3188 13.5207 32.3188 13.6752 32.1643L14.8964 30.943V38.6045C14.8964 38.8229 15.0734 39 15.2919 39C15.5104 39 15.6875 38.8229 15.6875 38.6045Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M30.7047 24.7495C30.5503 24.904 30.5503 25.1544 30.7047 25.3088C30.8593 25.4633 31.1096 25.4633 31.2641 25.3088L32.4853 24.0875V38.6045C32.4853 38.8229 32.6624 39 32.8808 39C33.0993 39 33.2763 38.8229 33.2763 38.6045V24.0875L34.4976 25.3088C34.6521 25.4633 34.9025 25.4633 35.0569 25.3088C35.1341 25.2316 35.1727 25.1304 35.1727 25.0292C35.1727 24.928 35.1341 24.8267 35.0569 24.7495L33.1605 22.8531C33.006 22.6986 32.7556 22.6986 32.6011 22.8531L30.7047 24.7495Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M35.5319 31.605C35.3775 31.7595 35.3775 32.0099 35.5319 32.1643C35.6865 32.3188 35.9368 32.3188 36.0913 32.1643L37.3125 30.943V38.6045C37.3125 38.8229 37.4896 39 37.708 39C37.9265 39 38.1035 38.8229 38.1035 38.6045V30.943L39.3248 32.1643C39.4793 32.3188 39.7297 32.3188 39.8841 32.1643C39.9613 32.0871 39.9999 31.9858 39.9999 31.8846C39.9999 31.7834 39.9613 31.6822 39.8841 31.605L37.9877 29.7086C37.8332 29.5541 37.5828 29.5541 37.4283 29.7086L35.5319 31.605Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M25.6606 12.346L20.8819 17.1248C20.4728 17.5338 20.4118 18.1331 20.7298 18.6163C21.0479 19.0994 21.6227 19.2802 22.1601 19.066L24.3743 18.1836V35.8076C24.3743 36.026 24.5513 36.2031 24.7698 36.2031C24.9882 36.2031 25.1653 36.026 25.1653 35.8076V17.6002C25.1653 17.4691 25.1003 17.3464 24.9917 17.2728C24.8831 17.1992 24.7451 17.1842 24.6234 17.2328L21.8673 18.3313C21.5893 18.4421 21.432 18.2445 21.3904 18.1814C21.3489 18.1182 21.2296 17.8957 21.4412 17.6842L26.22 12.9054C26.2946 12.8307 26.394 12.7896 26.4996 12.7896C26.6052 12.7896 26.7046 12.8307 26.7793 12.9054L31.5581 17.6842C31.7695 17.8958 31.6503 18.1182 31.6088 18.1814C31.5672 18.2446 31.4099 18.4421 31.132 18.3313L28.3439 17.2201C28.2221 17.1716 28.0841 17.1866 27.9756 17.2602C27.867 17.3338 27.802 17.4564 27.802 17.5875V19.9172C27.802 20.1356 27.9791 20.3127 28.1976 20.3127C28.416 20.3127 28.5931 20.1356 28.5931 19.9172V18.1709L30.8392 19.0661C31.3765 19.2802 31.9514 19.0995 32.2694 18.6164C32.4053 18.4101 32.472 18.1827 32.472 17.9578C32.4719 17.6562 32.3519 17.3592 32.1175 17.1249L27.3387 12.3461C27.1145 12.1219 26.8166 11.9985 26.4997 11.9985C26.1827 11.9985 25.8847 12.1219 25.6606 12.346Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M27.8027 21.5007V38.209H25.166V37.3911C25.166 37.1727 24.989 36.9956 24.7705 36.9956C24.552 36.9956 24.375 37.1727 24.375 37.3911V38.6045C24.375 38.8229 24.552 39 24.7705 39H28.1982C28.4167 39 28.5938 38.8229 28.5938 38.6045V21.5007C28.5938 21.2822 28.4167 21.1051 28.1982 21.1051C27.9798 21.1051 27.8027 21.2822 27.8027 21.5007Z"
                                                fill="#222222"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="sided">
                                    <h4 className="head-across">Central Platform</h4>
                                    <p className="about-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row setted ">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={53}
                                            height={53}
                                            viewBox="0 0 53 53"
                                            fill="none"
                                        >
                                            <circle cx="26.5" cy="26.5" r="26.5" fill="#BBDDFF" />
                                            <path
                                                d="M20.5146 27.4482V24.0892L21.7358 25.3104C21.8903 25.4649 22.1407 25.4649 22.2952 25.3104C22.3724 25.2332 22.411 25.132 22.411 25.0308C22.411 24.9296 22.3724 24.8283 22.2952 24.7511L20.3987 22.8547C20.2442 22.7002 19.9938 22.7002 19.8394 22.8547L17.943 24.7511C17.7885 24.9056 17.7885 25.156 17.943 25.3104C18.0975 25.4649 18.3478 25.4649 18.5023 25.3104L19.7235 24.0892V27.4482C19.7235 27.6667 19.9006 27.8438 20.119 27.8438C20.3375 27.8438 20.5146 27.6667 20.5146 27.4482Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M20.5147 38.6045V29.0287C20.5147 28.8103 20.3376 28.6332 20.1192 28.6332C19.9007 28.6332 19.7236 28.8103 19.7236 29.0287V38.6045C19.7236 38.8229 19.9007 39 20.1192 39C20.3376 39 20.5147 38.8229 20.5147 38.6045Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M15.6875 38.6045V30.943L16.9087 32.1643C17.0632 32.3188 17.3136 32.3188 17.468 32.1643C17.5452 32.0871 17.5838 31.9858 17.5838 31.8846C17.5838 31.7834 17.5452 31.6822 17.468 31.605L15.5716 29.7086C15.4171 29.5541 15.1667 29.5541 15.0122 29.7086L13.1158 31.605C12.9614 31.7595 12.9614 32.0099 13.1158 32.1643C13.2703 32.3188 13.5207 32.3188 13.6752 32.1643L14.8964 30.943V38.6045C14.8964 38.8229 15.0734 39 15.2919 39C15.5104 39 15.6875 38.8229 15.6875 38.6045Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M30.7047 24.7495C30.5503 24.904 30.5503 25.1544 30.7047 25.3088C30.8593 25.4633 31.1096 25.4633 31.2641 25.3088L32.4853 24.0875V38.6045C32.4853 38.8229 32.6624 39 32.8808 39C33.0993 39 33.2763 38.8229 33.2763 38.6045V24.0875L34.4976 25.3088C34.6521 25.4633 34.9025 25.4633 35.0569 25.3088C35.1341 25.2316 35.1727 25.1304 35.1727 25.0292C35.1727 24.928 35.1341 24.8267 35.0569 24.7495L33.1605 22.8531C33.006 22.6986 32.7556 22.6986 32.6011 22.8531L30.7047 24.7495Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M35.5319 31.605C35.3775 31.7595 35.3775 32.0099 35.5319 32.1643C35.6865 32.3188 35.9368 32.3188 36.0913 32.1643L37.3125 30.943V38.6045C37.3125 38.8229 37.4896 39 37.708 39C37.9265 39 38.1035 38.8229 38.1035 38.6045V30.943L39.3248 32.1643C39.4793 32.3188 39.7297 32.3188 39.8841 32.1643C39.9613 32.0871 39.9999 31.9858 39.9999 31.8846C39.9999 31.7834 39.9613 31.6822 39.8841 31.605L37.9877 29.7086C37.8332 29.5541 37.5828 29.5541 37.4283 29.7086L35.5319 31.605Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M25.6606 12.346L20.8819 17.1248C20.4728 17.5338 20.4118 18.1331 20.7298 18.6163C21.0479 19.0994 21.6227 19.2802 22.1601 19.066L24.3743 18.1836V35.8076C24.3743 36.026 24.5513 36.2031 24.7698 36.2031C24.9882 36.2031 25.1653 36.026 25.1653 35.8076V17.6002C25.1653 17.4691 25.1003 17.3464 24.9917 17.2728C24.8831 17.1992 24.7451 17.1842 24.6234 17.2328L21.8673 18.3313C21.5893 18.4421 21.432 18.2445 21.3904 18.1814C21.3489 18.1182 21.2296 17.8957 21.4412 17.6842L26.22 12.9054C26.2946 12.8307 26.394 12.7896 26.4996 12.7896C26.6052 12.7896 26.7046 12.8307 26.7793 12.9054L31.5581 17.6842C31.7695 17.8958 31.6503 18.1182 31.6088 18.1814C31.5672 18.2446 31.4099 18.4421 31.132 18.3313L28.3439 17.2201C28.2221 17.1716 28.0841 17.1866 27.9756 17.2602C27.867 17.3338 27.802 17.4564 27.802 17.5875V19.9172C27.802 20.1356 27.9791 20.3127 28.1976 20.3127C28.416 20.3127 28.5931 20.1356 28.5931 19.9172V18.1709L30.8392 19.0661C31.3765 19.2802 31.9514 19.0995 32.2694 18.6164C32.4053 18.4101 32.472 18.1827 32.472 17.9578C32.4719 17.6562 32.3519 17.3592 32.1175 17.1249L27.3387 12.3461C27.1145 12.1219 26.8166 11.9985 26.4997 11.9985C26.1827 11.9985 25.8847 12.1219 25.6606 12.346Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M27.8027 21.5007V38.209H25.166V37.3911C25.166 37.1727 24.989 36.9956 24.7705 36.9956C24.552 36.9956 24.375 37.1727 24.375 37.3911V38.6045C24.375 38.8229 24.552 39 24.7705 39H28.1982C28.4167 39 28.5938 38.8229 28.5938 38.6045V21.5007C28.5938 21.2822 28.4167 21.1051 28.1982 21.1051C27.9798 21.1051 27.8027 21.2822 27.8027 21.5007Z"
                                                fill="#222222"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="sided">
                                    <h4 className="head-across">Central Platform</h4>
                                    <p className="about-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row setted">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={53}
                                            height={53}
                                            viewBox="0 0 53 53"
                                            fill="none"
                                        >
                                            <circle cx="26.5" cy="26.5" r="26.5" fill="#FFD88D" />
                                            <path
                                                d="M26.5909 27.4182C30.4905 27.4182 33.663 24.1843 33.663 20.2091C33.663 16.234 30.4905 13 26.5909 13C22.6912 13 19.5187 16.234 19.5187 20.2091C19.5187 24.1843 22.6913 27.4182 26.5909 27.4182ZM26.5909 13.7925C30.0617 13.7925 32.8854 16.671 32.8854 20.2091C32.8854 23.7472 30.0617 26.6257 26.5909 26.6257C23.12 26.6257 20.2962 23.7472 20.2962 20.2091C20.2962 16.671 23.12 13.7925 26.5909 13.7925Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M26.5911 25.4235C29.4113 25.4235 31.7057 23.0846 31.7057 20.2098C31.7057 17.335 29.4113 14.9961 26.5911 14.9961C25.318 14.9961 24.098 15.4759 23.1557 16.3472C22.9967 16.4943 22.9848 16.7449 23.129 16.907C23.2733 17.0691 23.5191 17.0814 23.6781 16.9342C24.477 16.1955 25.5115 15.7886 26.5911 15.7886C28.9826 15.7886 30.9282 17.772 30.9282 20.2098C30.9282 22.6476 28.9826 24.6309 26.5911 24.6309C24.1996 24.6309 22.254 22.6476 22.254 20.2098C22.254 19.4736 22.4349 18.745 22.7773 18.1027C22.8797 17.9103 22.8099 17.6698 22.6212 17.5653C22.4326 17.4608 22.1966 17.5321 22.0941 17.7244C21.6901 18.4824 21.4766 19.3419 21.4766 20.2098C21.4766 23.0846 23.7709 25.4235 26.5911 25.4235Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M26.443 22.0763C25.8324 22.0384 25.6647 21.6638 25.6336 21.5758C25.5891 21.4064 25.438 21.2815 25.2578 21.2815C25.0427 21.2815 24.8683 21.4593 24.8683 21.6786C24.8683 21.7105 24.8724 21.7412 24.8793 21.7709L24.8792 21.771C24.8795 21.7724 24.8803 21.7752 24.8812 21.7786C24.886 21.7973 24.8916 21.8157 24.8989 21.8332C24.9708 22.0354 25.2589 22.6627 26.108 22.8303V23.3576C26.108 23.5764 26.282 23.7538 26.4967 23.7538C26.7115 23.7538 26.8855 23.5765 26.8855 23.3576V22.8422C27.2576 22.7762 27.5076 22.6104 27.6639 22.4604C27.9546 22.1815 28.1283 21.7598 28.1283 21.3325C28.1283 20.9309 27.9738 19.9796 26.5427 19.8186C26.2592 19.7867 26.057 19.6947 25.9416 19.5453C25.8397 19.4133 25.8287 19.2675 25.8287 19.2109C25.8287 19.1412 25.8475 18.5299 26.4967 18.5299C26.9227 18.5299 27.0947 18.8061 27.127 18.8662C27.1847 19.012 27.3245 19.1151 27.4882 19.1151C27.7033 19.1151 27.8777 18.9373 27.8777 18.718C27.8777 18.6529 27.862 18.5915 27.8347 18.5372L27.8349 18.5371C27.7253 18.2943 27.4159 17.9145 26.8854 17.7837V17.2518C26.8854 17.0329 26.7114 16.8555 26.4967 16.8555C26.282 16.8555 26.1079 17.0329 26.1079 17.2518V17.782C25.3406 17.9677 25.0511 18.6975 25.0511 19.2108C25.0511 19.7816 25.4194 20.4895 26.4574 20.6063C27.3507 20.7068 27.3507 21.1777 27.3507 21.3324C27.3507 21.4968 27.293 21.7278 27.131 21.8832C26.9778 22.0302 26.7464 22.0951 26.443 22.0763Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M19.9943 31.3513C19.9209 31.2717 19.8184 31.2266 19.7112 31.2266C19.6039 31.2266 19.5015 31.2717 19.428 31.3513L16.7872 34.2131C16.681 34.3283 16.652 34.4968 16.7136 34.6418C16.7751 34.787 16.9153 34.8809 17.0704 34.8809H17.8337V36.32C17.8337 36.5388 18.0077 36.7163 18.2224 36.7163C18.4371 36.7163 18.6112 36.5388 18.6112 36.32V34.4846C18.6112 34.2657 18.4371 34.0883 18.2224 34.0883H17.9698L19.7111 32.2011L21.4525 34.0883H21.1998C20.9851 34.0883 20.811 34.2657 20.811 34.4846V39.2075H18.6111V37.9051C18.6111 37.6862 18.437 37.5088 18.2223 37.5088C18.0076 37.5088 17.8336 37.6862 17.8336 37.9051V39.6038C17.8336 39.8226 18.0076 40.0001 18.2223 40.0001H21.1997C21.4144 40.0001 21.5885 39.8226 21.5885 39.6038V34.8809H22.3518C22.5068 34.8809 22.647 34.787 22.7086 34.6418C22.7701 34.4968 22.7412 34.3282 22.6349 34.2131L19.9943 31.3513Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M26.874 28.6248C26.8005 28.5451 26.698 28.5 26.5908 28.5C26.4836 28.5 26.3811 28.5451 26.3076 28.6248L23.6669 31.4866C23.5607 31.6018 23.5317 31.7703 23.5932 31.9153C23.6548 32.0605 23.795 32.1544 23.9501 32.1544H24.7133V39.6036C24.7133 39.8224 24.8874 39.9999 25.1021 39.9999H28.0795C28.2943 39.9999 28.4683 39.8224 28.4683 39.6036V32.1544H29.2316C29.3867 32.1544 29.5268 32.0605 29.5884 31.9153C29.6499 31.7703 29.6209 31.6017 29.5147 31.4866L26.874 28.6248ZM28.0795 31.3618C27.8648 31.3618 27.6908 31.5393 27.6908 31.7581V39.2073H25.4908V31.7581C25.4908 31.5392 25.3167 31.3618 25.1021 31.3618H24.8494L26.5907 29.4746L28.3321 31.3618L28.0795 31.3618Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M33.7541 26.1013C33.6807 26.0217 33.5782 25.9766 33.471 25.9766C33.3638 25.9766 33.2612 26.0217 33.1878 26.1013L30.547 28.9631C30.4408 29.0782 30.4118 29.2468 30.4733 29.3918C30.5349 29.537 30.6751 29.6309 30.8302 29.6309H31.5934V32.0492C31.5934 32.2681 31.7674 32.4455 31.9822 32.4455C32.1969 32.4455 32.3709 32.2681 32.3709 32.0492V29.2346C32.3709 29.0158 32.1969 28.8383 31.9822 28.8383H31.7296L33.4709 26.9512L35.2122 28.8383H34.9596C34.7449 28.8383 34.5708 29.0158 34.5708 29.2346V39.2064H32.3709V33.6344C32.3709 33.4155 32.1969 33.2381 31.9821 33.2381C31.7674 33.2381 31.5934 33.4155 31.5934 33.6344V39.6027C31.5934 39.8215 31.7674 39.999 31.9821 39.999H34.9596C35.1743 39.999 35.3484 39.8215 35.3484 39.6027V29.6309H36.1116C36.2667 29.6309 36.4069 29.537 36.4685 29.3918C36.53 29.2468 36.501 29.0782 36.3947 28.9631L33.7541 26.1013Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M18.0576 20.3494C18.0576 20.1306 17.8835 19.9531 17.6688 19.9531H15.3888C15.1741 19.9531 15 20.1306 15 20.3494C15 20.5683 15.174 20.7457 15.3888 20.7457H17.6688C17.8836 20.7457 18.0576 20.5683 18.0576 20.3494Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M18.1723 23.461L17.3613 23.7848C17.1614 23.8647 17.0628 24.0946 17.1412 24.2984C17.2012 24.4547 17.3479 24.5502 17.5032 24.5502C17.5504 24.5502 17.5984 24.5414 17.6449 24.5228L18.4559 24.1989C18.6558 24.1191 18.7544 23.8892 18.676 23.6854C18.5977 23.4817 18.3721 23.3812 18.1723 23.461Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M17.3613 16.9177L18.1723 17.2415C18.2189 17.2601 18.2668 17.2689 18.314 17.2689C18.4693 17.2689 18.616 17.1734 18.676 17.0171C18.7544 16.8134 18.6558 16.5834 18.4559 16.5036L17.6449 16.1798C17.4449 16.0999 17.2195 16.2004 17.1411 16.4042C17.0628 16.6079 17.1614 16.8378 17.3613 16.9177Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M37.6112 19.9531H35.3311C35.1164 19.9531 34.9424 20.1306 34.9424 20.3494C34.9424 20.5683 35.1164 20.7457 35.3311 20.7457H37.6112C37.826 20.7457 38 20.5683 38 20.3494C37.9999 20.1306 37.8259 19.9531 37.6112 19.9531Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M34.5449 24.1989L35.3558 24.5228C35.4024 24.5414 35.4503 24.5502 35.4975 24.5502C35.6528 24.5502 35.7995 24.4546 35.8596 24.2984C35.9379 24.0946 35.8394 23.8647 35.6395 23.7848L34.8286 23.461C34.6285 23.3812 34.4031 23.4817 34.3247 23.6854C34.2464 23.8891 34.345 24.119 34.5449 24.1989Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M34.6868 17.2689C34.734 17.2689 34.782 17.2601 34.8286 17.2415L35.6395 16.9177C35.8394 16.8378 35.9379 16.6079 35.8596 16.4042C35.7812 16.2003 35.5556 16.1 35.3558 16.1797L34.5449 16.5036C34.345 16.5834 34.2464 16.8133 34.3247 17.0171C34.3848 17.1734 34.5315 17.2689 34.6868 17.2689Z"
                                                fill="#222222"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="sided">
                                    <h4 className="head-across">Central Platform</h4>
                                    <p className="about-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row setted ">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={53}
                                            height={53}
                                            viewBox="0 0 53 53"
                                            fill="none"
                                        >
                                            <circle cx="26.5" cy="26.5" r="26.5" fill="#BBDDFF" />
                                            <path
                                                d="M20.5146 27.4482V24.0892L21.7358 25.3104C21.8903 25.4649 22.1407 25.4649 22.2952 25.3104C22.3724 25.2332 22.411 25.132 22.411 25.0308C22.411 24.9296 22.3724 24.8283 22.2952 24.7511L20.3987 22.8547C20.2442 22.7002 19.9938 22.7002 19.8394 22.8547L17.943 24.7511C17.7885 24.9056 17.7885 25.156 17.943 25.3104C18.0975 25.4649 18.3478 25.4649 18.5023 25.3104L19.7235 24.0892V27.4482C19.7235 27.6667 19.9006 27.8438 20.119 27.8438C20.3375 27.8438 20.5146 27.6667 20.5146 27.4482Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M20.5147 38.6045V29.0287C20.5147 28.8103 20.3376 28.6332 20.1192 28.6332C19.9007 28.6332 19.7236 28.8103 19.7236 29.0287V38.6045C19.7236 38.8229 19.9007 39 20.1192 39C20.3376 39 20.5147 38.8229 20.5147 38.6045Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M15.6875 38.6045V30.943L16.9087 32.1643C17.0632 32.3188 17.3136 32.3188 17.468 32.1643C17.5452 32.0871 17.5838 31.9858 17.5838 31.8846C17.5838 31.7834 17.5452 31.6822 17.468 31.605L15.5716 29.7086C15.4171 29.5541 15.1667 29.5541 15.0122 29.7086L13.1158 31.605C12.9614 31.7595 12.9614 32.0099 13.1158 32.1643C13.2703 32.3188 13.5207 32.3188 13.6752 32.1643L14.8964 30.943V38.6045C14.8964 38.8229 15.0734 39 15.2919 39C15.5104 39 15.6875 38.8229 15.6875 38.6045Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M30.7047 24.7495C30.5503 24.904 30.5503 25.1544 30.7047 25.3088C30.8593 25.4633 31.1096 25.4633 31.2641 25.3088L32.4853 24.0875V38.6045C32.4853 38.8229 32.6624 39 32.8808 39C33.0993 39 33.2763 38.8229 33.2763 38.6045V24.0875L34.4976 25.3088C34.6521 25.4633 34.9025 25.4633 35.0569 25.3088C35.1341 25.2316 35.1727 25.1304 35.1727 25.0292C35.1727 24.928 35.1341 24.8267 35.0569 24.7495L33.1605 22.8531C33.006 22.6986 32.7556 22.6986 32.6011 22.8531L30.7047 24.7495Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M35.5319 31.605C35.3775 31.7595 35.3775 32.0099 35.5319 32.1643C35.6865 32.3188 35.9368 32.3188 36.0913 32.1643L37.3125 30.943V38.6045C37.3125 38.8229 37.4896 39 37.708 39C37.9265 39 38.1035 38.8229 38.1035 38.6045V30.943L39.3248 32.1643C39.4793 32.3188 39.7297 32.3188 39.8841 32.1643C39.9613 32.0871 39.9999 31.9858 39.9999 31.8846C39.9999 31.7834 39.9613 31.6822 39.8841 31.605L37.9877 29.7086C37.8332 29.5541 37.5828 29.5541 37.4283 29.7086L35.5319 31.605Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M25.6606 12.346L20.8819 17.1248C20.4728 17.5338 20.4118 18.1331 20.7298 18.6163C21.0479 19.0994 21.6227 19.2802 22.1601 19.066L24.3743 18.1836V35.8076C24.3743 36.026 24.5513 36.2031 24.7698 36.2031C24.9882 36.2031 25.1653 36.026 25.1653 35.8076V17.6002C25.1653 17.4691 25.1003 17.3464 24.9917 17.2728C24.8831 17.1992 24.7451 17.1842 24.6234 17.2328L21.8673 18.3313C21.5893 18.4421 21.432 18.2445 21.3904 18.1814C21.3489 18.1182 21.2296 17.8957 21.4412 17.6842L26.22 12.9054C26.2946 12.8307 26.394 12.7896 26.4996 12.7896C26.6052 12.7896 26.7046 12.8307 26.7793 12.9054L31.5581 17.6842C31.7695 17.8958 31.6503 18.1182 31.6088 18.1814C31.5672 18.2446 31.4099 18.4421 31.132 18.3313L28.3439 17.2201C28.2221 17.1716 28.0841 17.1866 27.9756 17.2602C27.867 17.3338 27.802 17.4564 27.802 17.5875V19.9172C27.802 20.1356 27.9791 20.3127 28.1976 20.3127C28.416 20.3127 28.5931 20.1356 28.5931 19.9172V18.1709L30.8392 19.0661C31.3765 19.2802 31.9514 19.0995 32.2694 18.6164C32.4053 18.4101 32.472 18.1827 32.472 17.9578C32.4719 17.6562 32.3519 17.3592 32.1175 17.1249L27.3387 12.3461C27.1145 12.1219 26.8166 11.9985 26.4997 11.9985C26.1827 11.9985 25.8847 12.1219 25.6606 12.346Z"
                                                fill="#222222"
                                            />
                                            <path
                                                d="M27.8027 21.5007V38.209H25.166V37.3911C25.166 37.1727 24.989 36.9956 24.7705 36.9956C24.552 36.9956 24.375 37.1727 24.375 37.3911V38.6045C24.375 38.8229 24.552 39 24.7705 39H28.1982C28.4167 39 28.5938 38.8229 28.5938 38.6045V21.5007C28.5938 21.2822 28.4167 21.1051 28.1982 21.1051C27.9798 21.1051 27.8027 21.2822 27.8027 21.5007Z"
                                                fill="#222222"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="sided">
                                    <h4 className="head-across">Central Platform</h4>
                                    <p className="about-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section-4 ends */}
                {/* section 5 starts */}
                <div className="bg-color hide-on-phone">
                    <div className="max-w-7xl mx-auto px-4 py-1">
                        <div className="grid grid-cols-1 gap-4 p-8 text-center">
                            <h3 className="about-taglines">
                                Join <span style={{ color: "#006ED9" }}> 6,500+</span> Global
                                Recruitment Partners{" "}
                            </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div />
                            <div>
                                <button className="partner-btn" type="button">
                                    Become a partner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* section 5 Ends */}
                {/* section 6 starts */}
                <div className="max-w-7xl mx-auto px-4 ">
                    <div className="grid grid-cols-1 gap-4 text-center hide">
                        {/* first col */}
                        <div>
                            <img src="imagesss/image 23.jpg" />
                        </div>
                    </div>
                </div>
                {/* section 6 ends */}
                {/* section 7 starts  testimonials*/}
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
                {/* section 7 ends */}
                {/* js starts */}
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