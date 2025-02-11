import { FC } from 'react';

interface CustomIcon2Props {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const CustomIcon2: FC<CustomIcon2Props> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M8.02352 3.875H5.03152C3.53552 3.875 2.31152 5.099 2.31152 6.595V30.055C2.31152 31.551 3.53552 32.775 5.03152 32.775H21.6915C22.0995 32.775 22.5075 32.707 22.8475 32.503" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.6992 3.875H21.6912C23.1872 3.875 24.4112 5.099 24.4112 6.595V15.095" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.6994 2.79056V4.89856C18.6994 5.78256 18.0194 6.46256 17.1354 6.46256H9.58744C8.70344 6.46256 8.02344 5.78256 8.02344 4.89856V2.79056C8.02344 1.90656 8.70344 1.22656 9.58744 1.22656H17.1354C18.0194 1.22656 18.6994 1.90656 18.6994 2.79056Z" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.04324 21.2203H7.00324C6.59524 21.2203 6.32324 20.9483 6.32324 20.5403V18.5003C6.32324 18.0923 6.59524 17.8203 7.00324 17.8203H9.04324C9.45124 17.8203 9.72324 18.0923 9.72324 18.5003V20.5403C9.72324 20.9483 9.38324 21.2203 9.04324 21.2203Z" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.04324 13.9391H7.00324C6.59524 13.9391 6.32324 13.6671 6.32324 13.2591V11.2191C6.32324 10.8111 6.59524 10.5391 7.00324 10.5391H9.04324C9.45124 10.5391 9.72324 10.8111 9.72324 11.2191V13.2591C9.72324 13.5991 9.38324 13.9391 9.04324 13.9391Z" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.04324 28.5641H7.00324C6.59524 28.5641 6.32324 28.2921 6.32324 27.8841V25.8441C6.32324 25.4361 6.59524 25.1641 7.00324 25.1641H9.04324C9.45124 25.1641 9.72324 25.4361 9.72324 25.8441V27.8841C9.72324 28.2921 9.38324 28.5641 9.04324 28.5641Z" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.8516 10.8125H21.2836" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.8516 13.6016H17.2716" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.6396 18.1562H12.8516" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.0076 20.9453H12.8516" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.5996 25.5H12.8516" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.8516 28.2891H14.2116" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M27.8799 25.9821H30.3279C30.8039 25.9821 31.1439 25.5741 31.1439 25.0301C31.1439 24.4861 30.8039 24.0781 30.3279 24.0781H28.4239" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M26.8594 27.8806H29.8514C30.3274 27.8806 30.6674 27.4726 30.6674 26.9286C30.6674 26.3846 30.3274 25.9766 29.8514 25.9766H27.9474" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M28.3556 24.076H30.8036C31.2796 24.076 31.6196 23.668 31.6196 23.124C31.6196 22.58 31.2796 22.172 30.8036 22.172H25.1596C25.1596 22.172 27.1316 20.336 25.6356 17.004C25.4996 16.664 25.0236 16.392 24.6156 16.528C24.2076 16.664 23.9356 17.004 24.0036 17.412C24.0036 18.16 23.9356 19.316 23.3916 20.54C22.9156 21.56 21.8956 22.172 20.8076 22.172V28.768L21.6236 29.448C21.8276 29.652 22.1676 29.72 22.4396 29.72H28.7636C29.2396 29.72 29.5796 29.312 29.5796 28.768C29.5796 28.224 29.2396 27.816 28.7636 27.816H26.8596" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.7474 30.6757H19.5834C20.2634 30.6757 20.8074 30.1317 20.8074 29.4517V21.9037C20.8074 21.2237 20.2634 20.6797 19.5834 20.6797H17.7474C17.0674 20.6797 16.5234 21.2237 16.5234 21.9037V29.4517C16.5914 30.1317 17.1354 30.6757 17.7474 30.6757Z" stroke="#1980E4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default CustomIcon2;
