"use client";

import { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const HamburgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target.closest('.menu')) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/category/${categoryId}`);
        setIsMenuOpen(false);
    };

    return (
        <div className="relative">
            <button
                className={`text-2xl fixed top-4 left-4 md:relative md:left-0 md:top-0 z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                onClick={toggleMenu}
            >
                <AiOutlineMenu />
            </button>

            <div
                className={`menu fixed top-0 left-0 w-64 h-full bg-gray-800 bg-opacity-90 text-gray-200 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-30`}
            >
                <div className="py-4 px-6">
                    <h3 className="text-lg font-semibold mb-4">Mağaza Kategorileri</h3>
                    <ul className="space-y-2">
                        <li><button onClick={() => handleCategoryClick(1)} className="hover:text-yellow-400 transition-colors">Elektronik</button></li>
                        <li><button onClick={() => handleCategoryClick(2)} className="hover:text-yellow-400 transition-colors">Giyim</button></li>
                        <li><button onClick={() => handleCategoryClick(9)} className="hover:text-yellow-400 transition-colors">Mutfak Eşyaları</button></li>
                        <li><button onClick={() => handleCategoryClick(7)} className="hover:text-yellow-400 transition-colors">Oyun</button></li>
                        <li><button onClick={() => handleCategoryClick(5)} className="hover:text-yellow-400 transition-colors">Kozmetik</button></li>

                    </ul>
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default HamburgerMenu;
