// components/Navbar.tsx
'use client';

import Container from "../container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";

const redressed = Redressed({ subsets: ['latin'], weight: ["400"] });

const Navbar: React.FC = () => {
    const handleSearch = (searchTerm: string) => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="sticky top-0 w-full bg-white z-30 shadow-md border-b border-gray-200">
            <div className="py-4">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <div className="flex items-center gap-4">
                            <HamburgerMenu />
                            <Link href="/" className={`${redressed.className} font-bold text-2xl`}>
                                Elite Shop
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <Search onSearch={handleSearch} />
                        </div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount />
                            <UserMenu />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
