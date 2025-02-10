import React from 'react';
import { FC } from 'react';

interface CustomIcon1Props {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const CustomIcon1: FC<CustomIcon1Props> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <g clip-path="url(#clip0_1072_9918)">
                <path d="M11.0803 9.49998L18.6723 1.90803C19.1092 1.47105 19.1092 0.764728 18.6723 0.32774C18.2353 -0.109247 17.529 -0.109247 17.092 0.32774L9.50002 7.91969L1.90803 0.32774C1.47105 -0.109247 0.764728 -0.109247 0.32774 0.32774C-0.109247 0.764728 -0.109247 1.47105 0.32774 1.90803L7.91969 9.49998L0.32774 17.0919C-0.109247 17.5289 -0.109247 18.2352 0.32774 18.6722C0.545677 18.8902 0.831782 18.9997 1.11789 18.9997C1.40399 18.9997 1.6901 18.8901 1.90803 18.6722L9.49998 11.0803L17.0919 18.6722C17.3099 18.8902 17.596 18.9997 17.8821 18.9997C18.1682 18.9997 18.4543 18.8901 18.6722 18.6722C19.1092 18.2352 19.1092 17.5289 18.6722 17.0919L11.0803 9.49998Z" fill="#1980E4" />
            </g>
            <defs>
                <clipPath id="clip0_1072_9918">
                    <rect width="19" height="19" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default CustomIcon1;
