import Image from 'next/image';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
import { useCallback, useEffect, useState } from 'react';


const TOP_OFFSET=66;

const Navbar = () => {

	const [showMobileMenu, setShowMobileMenu] =useState(false);
	const [showAccountMenu, setShowAccountMenu] =useState(false);
	const [showBackground,setShowBackground]=useState(true)


	useEffect(() => {
		const handleScroll = () => {
			if(window.scrollY >= TOP_OFFSET){
				setShowBackground(true)
			} else {
				setShowBackground(false)
			}
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll',handleScroll);
		}

	},[]);
	
	const toggleMobileMenu = useCallback(() => {
		setShowMobileMenu((current) => !current)
	},[]);
	
	const toggleAccountMenu = useCallback(() => {
		setShowAccountMenu((current) => !current)
	},[]);

	return (
		<>
			<nav className="text-white w-full fixed z-40">
				<div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground? 'bg-zinc-900/80': ''} `}>
					<Image className='w-auto h-auto' src="/images/logo.png" alt="logo" width={100} height={100} priority />
					<div className='flex-row ml-8 gap-7 hidden md:flex'>
						<NavbarItem label="Home" />
						<NavbarItem label="Series" />
						<NavbarItem label="Films" />
						<NavbarItem label="New & Popular" />
						<NavbarItem label="My List" />
						<NavbarItem label="Browse by Languages" />
					</div>
					<div onClick={toggleMobileMenu} className='flex flex-row items-center md:hidden items-center gap-2 ml-8 cursor-pointer relative'>
						<p className='text-white text-sm'>Browse</p>
						<svg  xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className={`bi bi-chevron-down text-white transition ${showMobileMenu? 'rotate-180 ease-in': 'ease-out'} `} viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
						</svg>
						<MobileMenu visible={showMobileMenu}/>
					</div>
					<div className='flex flex-row ml-auto gap-7 items-center'>
						<div className="text-gray-200 hover: text-gray-300 cursor-pointer transition">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
							</svg>
						</div>
						<div className="text-gray-200 hover: text-gray-300 cursor-pointer transition">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
								<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
							</svg>
						</div>

						<div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
							<div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
								<Image src="/images/default-green.png" className='w-auto h-auto' width={100} height={100} alt="logo-img" />
							</div>
							<svg  xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className={ `bi bi-chevron-down text-white transition ${showAccountMenu? 'rotate-180 ease-in':'ease-out'}`} viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
							</svg>
							<AccountMenu visible={showAccountMenu}/>
						</div>

					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar;