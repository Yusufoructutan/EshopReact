import Link from "next/link";
import Container from "../container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
    AiFillTwitterCircle,
    AiFillInstagram,
    AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Mağaza Kategorileri</h3>
                        <Link href="#">Elektronik</Link>
                        <Link href="#">Kozmetik</Link>
                        <Link href="#">Mutfak Eşyaları</Link>
                        <Link href="#">Oyun</Link>
                    </FooterList>

                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Müşteri Hizmetleri</h3>
                        <Link href="#">Bize Ulaşın</Link>
                        <Link href="#">Shipping Policy</Link>
                        <Link href="#">Kargo Politikası</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">Hakkımızda</h3>
                        <p className="mb-2">
                            Elit Market olarak kendimizi e-ticaret alanında yenilikçi çözümler sunmaya adadık. 
                            Sektör trendlerinin önünde olmak için çabalıyoruz ve müşterilerimizin beklentilerini aşan olağanüstü sonuçlar sunmak için çalışıyoruz.
                        </p>
                        <p>&copy; {new Date().getFullYear()} Elite Market. All rights reserved</p>
                    </div>

                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Bizi Takip Edin</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <MdFacebook size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillInstagram size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillYoutube size={24} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
