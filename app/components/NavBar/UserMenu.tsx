'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaHeart, FaList } from 'react-icons/fa'; 
import { useState, useRef, useEffect } from 'react';
import Modal from '../Modal/LogoutModal';
import { useRouter } from 'next/navigation';

const UserMenu: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
    router.push('/login'); 
  };

 
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-4">
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-600"
          aria-label="User Menu"
        >
          <FaUser size={24} />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
          >
            {isLoggedIn ? (
              <>
                <Link
                  href="/orderPage"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
                >
                  <FaList /> 
                  <span>Siparişlerim</span>
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
                >
                  <FaHeart />
                  <span>Favoriler</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
                >
                  <FaSignOutAlt />
                  <span>Çıkış Yap</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
                >
                  <FaSignInAlt />
                  <span>Giriş Yap</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
                >
                  <FaUserPlus />
                  <span>Kayıt ol</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default UserMenu;
