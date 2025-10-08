"use client"

import { Content } from "@prismicio/client"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"
import { HiBars3, HiMagnifyingGlass, HiShoppingBag, HiUser, HiXMark } from "react-icons/hi2"
import { TransitionLink } from "./TransistionLink"

type NavIconsProps = {
    className?: string,
    tabIndex?: number
}

const NavIcons = ({className="", tabIndex} : NavIconsProps) => {
    return (
        <div className={clsx("flex items-center gap-8", className)}>
            <a href="#" className="text-white" aria-label="Search" tabIndex={tabIndex}>
                <HiMagnifyingGlass size={24} />
            </a>
            <a href="#" className="text-white" aria-label="Account" tabIndex={tabIndex}>
                <HiUser size={24} />
            </a>
            <a href="#" className="text-white" aria-label="Cart" tabIndex={tabIndex}>
                <HiShoppingBag size={24} />
            </a>
        </div>
    )
}

type NavBarProps = {
    settings: Content.SettingsDocument
}

export const NavBar = ({settings} : NavBarProps) => {
    
    const [isDrawOpen, setIsDrawOpen] = useState(false);

    const toggleDrawer = () => setIsDrawOpen(!isDrawOpen);

    return(
        <header>
            <div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
                <div className="flex items-center justify-between p-2 md:p-4">
                    <button 
                        onClick={toggleDrawer}
                        aria-label="Toggle Menu"
                        className="p-2 cursor-pointer text-white transition-colors duration-300 hover:bg-white/20"
                    >
                        <HiBars3 size={24} />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 transform">
                    <TransitionLink href="/" aria-label="Home">
                        <Image src="/test.png" alt="WILBUR" width={150} height={30} 
                            className="w-32 md:w-44"
                            />
                    </TransitionLink>
                        {/* THE ROYAL EMBERS COLLECTION */}
                    </div>
                    <div className="flex">
                        <NavIcons className="hidden md:flex"/>
                    </div>
                </div>
            </div>

    {/* Blur Mechanism */}
            <div className= {clsx(
                "nav-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transistion-all duration-500",
                isDrawOpen ? "pointer-events-auto opacity-100 backdrop-blur-xs" : "pointer-events-none backdrop-blur-none"
            )}
            onClick={toggleDrawer}
            aria-hidden= "true"
        />

    {/* Drawer Menu */}

    <div className={clsx("nav-drawer fixed top-0 left-0 z-50 h-full w-72 bg-neutral-900 p-6 transition-transform duration-500",
        isDrawOpen ? "translate-x-0" : "-translate-x-full"
    )}
        role="dialog"
        aria-modal={isDrawOpen}
        aria-label="Mobile Navigation Menu"
    >
        <div className="flex mb-6 justify-end">
            <button className="p-2 text-white transition-colors duration-300 hover:bg-white/10"
             onClick={toggleDrawer} 
             aria-label="Close Menu"
             tabIndex={isDrawOpen ? 0 : -1}
            >
                <HiXMark size={24} />
            </button>
        </div>

        {/* Nav Bar  */}
        <nav className="space-y-4" aria-label="Main Navigation">
              {settings.data.navigation_link.map((link) => (
            <TransitionLink
              field={link}
              onClick={() => setIsDrawOpen(false)}
              key={link.key}
              className="block border-b border-white/10 py-2 text-xl font-semibold tracking-wide text-white uppercase hover:text-gray-300"
              tabIndex={isDrawOpen ? 0 : -1}
            />
          ))}
          <div className="pt-4 md:hidden">
            <NavIcons
              className="justify-around"
              tabIndex={isDrawOpen ? 0 : -1}
            />
          </div>
        </nav>
    </div>
 </header>
    )
}