// components/Search.tsx
'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
    onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    

    return (
        <div className="flex items-center border border-gray-300 rounded-full px-10 py-3 bg-white shadow-lg max-w-lg">
            <FaSearch className="text-gray-500 text-xl mr-3" />
            <input
                type="text"
                placeholder="Aramak istediğiniz yeri yazın"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                className="border-none outline-none flex-1 text-sm px-10 py-1"
              
                
            />  
            <button
                
                className="ml-4 px-10 py-1 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600 transition duration-300"
            >
                Ara
            </button>
        </div>
    );
};

export default Search;
