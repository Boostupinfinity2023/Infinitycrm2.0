import { FC } from 'react';

interface AnnouncementUpProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const AnnouncementUp: FC<AnnouncementUpProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg className="m_first_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 25" fill="none">
            <path d="M8.98341 8.48828H3.35737C2.95043 8.48828 2.56016 8.64994 2.27241 8.93769C1.98465 9.22544 1.823 9.61571 1.823 10.0227V13.6029C1.823 14.0098 1.98465 14.4001 2.27241 14.6878C2.56016 14.9756 2.95043 15.1372 3.35737 15.1372H8.98341V8.48828Z" fill="#232323" />
            <path d="M21.6113 3.12889C21.3979 2.98447 21.1516 2.89611 20.8951 2.87198C20.6385 2.84785 20.38 2.88871 20.1435 2.99079L10.0063 8.16675V15.4653L20.1383 20.6719C20.6283 20.8224 21.1579 20.7728 21.6113 20.5338C21.8179 20.393 21.9869 20.2038 22.1037 19.9827C22.2205 19.7617 22.2815 19.5154 22.2813 19.2654V4.3973C22.2815 4.14729 22.2205 3.90104 22.1037 3.67998C21.9869 3.45891 21.8179 3.26973 21.6113 3.12889Z" fill="#232323" />
            <path d="M9.26466 16.1602H5.13208L6.56416 21.1827C6.65551 21.5041 6.8493 21.787 7.1161 21.9882C7.38289 22.1895 7.70809 22.2981 8.04228 22.2977H8.98336C9.21699 22.2875 9.44549 22.2258 9.65247 22.117C9.85946 22.0081 10.0398 21.8549 10.1806 21.6681C10.3214 21.4814 10.4191 21.2658 10.4668 21.0369C10.5145 20.8079 10.5109 20.5713 10.4564 20.3439L9.26466 16.1602Z" fill="#232323" />
            <path d="M23.3043 10.1152V13.5113C23.6027 13.4058 23.8612 13.2105 24.0444 12.9523C24.2275 12.6941 24.3263 12.3856 24.3272 12.069V11.5575C24.3263 11.241 24.2275 10.9324 24.0444 10.6742C23.8612 10.416 23.6027 10.2208 23.3043 10.1152Z" fill="#232323" />
        </svg>
    );
};

export default AnnouncementUp;
