
'use client'; 

import Link from "next/link";
import Container from "../container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
    AiFillTwitterCircle,
    AiFillInstagram,
    AiFillYoutube,
} from "react-icons/ai";
import { useRouter } from "next/navigation"; 

const Footer = () => {
    const router = useRouter(); 

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/category/${categoryId}`);
    };

    return (
        <footer className="bg-gray-800 text-gray-200 text-sm mt-16 py-8">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
                    <FooterList>
                        <h3 className="text-lg font-semibold mb-4">Mağaza Kategorileri</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => handleCategoryClick(1)} className="hover:text-yellow-400 transition-colors">Elektronik</button></li>
                            <li><button onClick={() => handleCategoryClick(2)} className="hover:text-yellow-400 transition-colors">Giyim</button></li>
                            <li><button onClick={() => handleCategoryClick(3)} className="hover:text-yellow-400 transition-colors">Mutfak Eşyaları</button></li>
                            <li><button onClick={() => handleCategoryClick(4)} className="hover:text-yellow-400 transition-colors">Oyun</button></li>
                            <li><button onClick={() => handleCategoryClick(5)} className="hover:text-yellow-400 transition-colors">Kozmetik</button></li>
                        </ul>
                    </FooterList>

                    <FooterList>
                        <h3 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-yellow-400 transition-colors">Bize Ulaşın</Link></li>
                            <li><Link href="#" className="hover:text-yellow-400 transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-yellow-400 transition-colors">Kargo Politikası</Link></li>
                            <li><Link href="#" className="hover:text-yellow-400 transition-colors">FAQs</Link></li>
                        </ul>
                    </FooterList>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
                        <p className="mb-4">
                            Elit Market olarak kendimizi e-ticaret alanında yenilikçi çözümler sunmaya adadık. 
                            Sektör trendlerinin önünde olmak için çabalıyoruz ve müşterilerimizin beklentilerini aşan olağanüstü sonuçlar sunmak için çalışıyoruz.
                        </p>
                        <p>&copy; {new Date().getFullYear()} Elite Market. All rights reserved</p>
                    </div>

                    <FooterList>
                        <h3 className="text-lg font-semibold mb-4">Bizi Takip Edin</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                                <MdFacebook size={28} />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                                <AiFillTwitterCircle size={28} />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-pink-500 transition-colors">
                                <AiFillInstagram size={28} />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-red-600 transition-colors">
                                <AiFillYoutube size={28} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
