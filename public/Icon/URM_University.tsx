import React, { FC } from 'react';

interface HomeUpProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const URMUniversity: FC<HomeUpProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <mask id="mask0_229_38734" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
                <path d="M16.5 16.5V0.5H0.5V16.5H16.5Z" fill="white" stroke="white" />
            </mask>
            <g >
                <path d="M16.3359 16.3359H0.664062V3.1875H16.3359V16.3359Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.58203 7.10547C4.58203 6.40863 5.14692 5.84375 5.84375 5.84375C6.54058 5.84375 7.10547 6.40863 7.10547 7.10547C7.10547 7.8023 6.54058 8.36719 5.84375 8.36719C5.14692 8.36719 4.58203 7.8023 4.58203 7.10547Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.5 13.6797H3.1875L3.99218 10.2855H7.69532L8.5 13.6797Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5898 8.34668H13.8129" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5898 11.1768H13.8129" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5889 3.1875H6.41016V0.664062H10.5889V3.1875Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>
    );
};

export default URMUniversity;
