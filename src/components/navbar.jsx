import { useState, useContext, useEffect } from 'react';
import { GiSpikedDragonHead } from "react-icons/gi";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const initialNavigation = [
    { name: 'Blogs', href: '/', current: true },
    { name: 'Topics', href: '/topics', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const location = useLocation();
    const [navigation, setNavigation] = useState(initialNavigation);
    const { user, authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const currentNav = initialNavigation.map((item) => ({
            ...item,
            current: item.href === location.pathname,
        }));
        setNavigation(currentNav);
    }, [location.pathname]);

    const handleNavClick = (index) => {
        setNavigation((prevNav) =>
            prevNav.map((item, i) =>
                i === index ? { ...item, current: true } : { ...item, current: false }
            )
        );
    };

    return (
        <>
            <Disclosure as="nav" className="bg-gray-900">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>

                                <div className='px-5 py-2 pr-10 text-lg text-white font-bold pl-10'>
                                    <Link to="/" onClick={() => handleNavClick(0)}>
                                        <div className='flex items-center'>
                                            <GiSpikedDragonHead className='w-10 h-10 mx-2 text-white' />
                                            Transponder Medium
                                        </div>
                                    </Link>
                                </div>

                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item, index) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    onClick={() => handleNavClick(index)}
                                                    className={classNames(
                                                        item.current ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <div className='text-white max-sm:hidden'>
                                        {user ? "Hello, " + user.first_name : ""}
                                    </div>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-9 w-9 rounded-full"
                                                    src={user?.imgUrl ? user.imgUrl : 'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                                                    alt=""
                                                />
                                            </MenuButton>
                                        </div>
                                        <Transition
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {!authToken && (
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <Link to="/login">
                                                                <div
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Login
                                                                </div>
                                                            </Link>
                                                        )}
                                                    </MenuItem>

                                                )}
                                                {authToken && (
                                                    <>
                                                        <MenuItem>
                                                            {({ active }) => (
                                                                <a
                                                                    href=""
                                                                    onClick={() => navigate('/editProfile')}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Edit Profile
                                                                </a>
                                                            )}
                                                        </MenuItem>
                                                        <MenuItem>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                    onClick={logout}
                                                                >
                                                                    Logout
                                                                </a>
                                                            )}
                                                        </MenuItem>
                                                    </>
                                                )}
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as={Link}
                                        to={item.href}
                                        onClick={() => handleNavClick(item.name)}
                                        className={classNames(
                                            'bg-gray-900 text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            {!authToken && (
                <div className='flex justify-center py-2 bg-yellow-200'>
                    <Link to="/login"><span className='underline flex items-center pr-1'><FaArrowRightLong className='text-black mr-2' />Login</span></Link><span>for better experience</span>
                </div>
            )}
        </>
    );
}
