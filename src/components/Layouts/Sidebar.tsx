import PerfectScrollbar from 'react-perfect-scrollbar';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect, useCallback } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import './style.css';
import Logo from '../../../public/Image/Boostup-logo.png';
import Home from '../../../public/Icon/Home';
import Applications from '../../../public/Icon/Applications';
import University from '../../../public/Icon/University';
import Hrm from '../../../public/Icon/Hrm';
import DollerMenu from '../../../public/Icon/DollerMenu';
import Settings from '../../../public/Icon/Settings';
import Announcement from '../../../public/Icon/Announcement';
import Mail from '../../../public/Icon/Mails';
import Iconminus from '../../../public/Icon/IconMinus';
import { PlusIcon } from "../../../public/Icon/PlusIcon";
import IconPencil from "../../../public/Icon/IconPencil";
import IconDashboard from "../../../public/Icon/IconDashboard";
import TaskIcon from "../../../public/Icon/taskicon";
import CommissionIcon from "../../../public/Icon/Commission";
import Promotionalicon from "../../../public/Icon/Promotionalicon";
import Searchcourse from "../../../public/Icon/search_course";
import { ChevronDown } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Home: <Home />,
    Announcement: <Announcement />,
    Mails: <Mail />,
    Applications: <Applications />,
    University: <University />,
    Hrm: <Hrm />,
    DollerMenu: <DollerMenu />,
    Settings: <Settings />,
    Leads: <PlusIcon />,
    Leave: <IconDashboard />,
    Note: <IconPencil />,
    Task: <TaskIcon />,
    Commission: <CommissionIcon />,
    Promotionalicon: <Promotionalicon />,
    URMUniversity: <University />,
    searchcourse: <Searchcourse />,
};

const Sidebar = ({ userdata }: any) => {


    if (!userdata) {
        return null; // or a loading indicator if needed
    }
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const [Route, setRoute] = useState([]);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


    const debouncedRoutes = debounce(async () => {
        const filterData = { Routetype: userdata.ROLE };
        try {
            let res: any = await fetch('/routes.json?Routetype=admin');
            let data = await res.json();
            let FilterArray = data.Route;
            let FilterRoutes = FilterArray.filter((route: any) => route.Routetype === userdata.ROLE);
            setRoute(FilterRoutes);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    }, 300);

    useEffect(() => {
        debouncedRoutes();
    }, [userdata]);

    // const isAnyChildActive = (route:any) => {
    //     return route.ChildComponent && route.ChildComponent.some((child:any) => window.location.pathname === child.RoutePath);
    // };
    //  ${ currentMenu === route.text || isAnyChildActive(route) ? 'active' : '' }
    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[280px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="sidebarcolor dark:bg-black h-full">
                    <div className="flex justify-center items-center px-4  py-3 navbartopcolor">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            {/* compnay logo insert this tag */}
                            <img className="w-20 ml-[5px] flex-none" src={Logo} alt="logo" />
                        </NavLink>
                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90 text-[#1980E4]" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-3 py-0">
                            {Route.map((route: any, index) => {
                                if (!route.isChild) {
                                    return (

                                        <ul className="text-gray-500" key={index}>
                                            <li className="nav-item">
                                                {route.Modal ?
                                                    <a href={route.RoutePath} className="group" id=''>
                                                        <div className="flex items-center">
                                                            {iconMap[route.icon] || null}
                                                            <span className=" text-md font-medium ltr:pl-3 rtl:pr-3 text-black dark:text-[#3067E2] dark::text-white-dark sidebar-content">{t(route.text)}</span>
                                                        </div>
                                                    </a>
                                                    :
                                                    <NavLink to={route.RoutePath} className="group" id=''>
                                                        <div className="flex items-center">
                                                            {iconMap[route.icon] || null}
                                                            <span className=" text-md font-medium ltr:pl-3 rtl:pr-3 text-black dark:text-[#3067E2] dark::text-white-dark sidebar-content">{t(route.text)}</span>
                                                        </div>
                                                    </NavLink>
                                                }
                                            </li>

                                        </ul>


                                    );
                                } else {
                                    return (
                                        <li className="menu nav-item" key={index}>
                                            <button
                                                style={{ overflow: 'visible' }}
                                                type="button"
                                                className={`menu nav-item navbar-li-color color-black navbar-li-color-changed nav-link group w-full`}
                                                onClick={() => toggleMenu(route.text)}
                                            >
                                                <div className="flex items-center">
                                                    {iconMap[route.icon] || null}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black font-medium dark:text-[#3067E2] dark::text-white-dark">
                                                        {t(route.text)}
                                                    </span>
                                                </div>
                                                <div className={`${currentMenu === route.text ? 'rtl:rotate-360 -rotate-360' : 'rtl:rotate-90 -rotate-90'}`}>
                                                    <IconCaretDown />

                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === route.text ? 'auto' : 0}>
                                                <ul className={`sub-menu text-gray-500 ${route.text}`} >
                                                    {/* Vertical line */}
                                                    <div className="relative h-full w-[1px] bg-gray-200" />
                                                    {route.ChildComponent &&
                                                        route.ChildComponent.map((child: any, subIndex: any) => (
                                                            <li key={subIndex}>
                                                                <NavLink
                                                                    to={child.RoutePath}
                                                                    className="color-black hover-black text-md relative"
                                                                >
                                                                    {child.text}
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                    );
                                }
                            })}

                        </ul>



                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
