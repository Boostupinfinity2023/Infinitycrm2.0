import React from 'react';
import { FC } from 'react';

interface CustomIcon6Props {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const CustomIcon6: FC<CustomIcon6Props> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <g clip-path="url(#clip0_1072_9885)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8801 19.7763L23.8617 7.79474C24.2147 7.44162 24.7943 7.44523 25.1438 7.79474L26.3006 8.95154C26.6501 9.30104 26.6501 9.88426 26.3006 10.2336L14.3191 22.2153C13.9696 22.5648 13.39 22.5684 13.0369 22.2153L11.8801 21.0585C11.527 20.7054 11.527 20.1294 11.8801 19.7763Z" fill="#1980E4" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.13776 12.4757L15.4364 19.7743C15.7894 20.1274 15.7852 20.7077 15.4364 21.0565L14.2796 22.2133C13.9307 22.562 13.3462 22.562 12.9973 22.2133L5.69873 14.9147C5.3499 14.5659 5.34575 13.9856 5.69873 13.6325L6.85553 12.4757C7.20865 12.1227 7.78464 12.1227 8.13776 12.4757Z" fill="#1980E4" />
                </g>
                <defs>
                    <clipPath id="clip0_1072_9885">
                        <rect width="32" height="32" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    );
};

export default CustomIcon6;
