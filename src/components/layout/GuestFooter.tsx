import React from 'react';
import ChronoNewsLogo from '../../../public/chrononews.svg';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/postUtils.ts';
import SafeImage from '../ui/SafeImage.tsx';
import { Category } from '../../types/category.ts';

interface GuestFooterProps {
    quickLinks: Category[];
}

const GuestFooter: React.FC<GuestFooterProps> = ({ quickLinks }) => {
    return (
        <footer className="guest-footer border-t border-white/10 pt-10 lg:pb-1 text-gray-100">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col mx-auto items-center">
                    <div className="flex items-center gap-1">
                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden">
                            <SafeImage
                                src={ChronoNewsLogo as string}
                                className="w-full h-full object-contain"
                                alt="ChronoNewsLogo"
                            />
                        </div>
                        <h1 className="text-gray-100 font-bold text-2xl">
                            CHRONO<span className="text-primary">NEWS</span>
                        </h1>
                    </div>
                    <div className="flex space-x-4 mt-4 text-gray-300">
                        <i
                            className="pi pi-whatsapp cursor-pointer hover:text-primary transition-colors"
                            style={{ fontSize: '28px' }}
                        ></i>
                        <i
                            className="pi pi-facebook cursor-pointer hover:text-primary transition-colors"
                            style={{ fontSize: '28px' }}
                        ></i>
                        <i
                            className="pi pi-instagram cursor-pointer hover:text-primary transition-colors"
                            style={{ fontSize: '28px' }}
                        ></i>
                    </div>
                </div>
                <div className="flex flex-col mx-auto items-center lg:items-start pt-2">
                    <h2 className="text-xl font-semibold mb-4 text-center text-gray-100">
                        Tautan Cepat
                    </h2>
                    <p key={'beranda'} className="text-gray-300 text-sm ">
                        <Link
                            to={`/berita`}
                            className="no-underline text-inherit hover:text-primary transition-colors"
                        >
                            Beranda
                        </Link>
                    </p>
                    {quickLinks.map((category) => (
                        <p key={category.id} className="text-gray-300 text-sm">
                            <Link
                                to={`/berita?category=${category.name.toLowerCase()}`}
                                className="no-underline text-inherit hover:text-primary transition-colors"
                            >
                                {truncateText(category.name, 13)}
                            </Link>
                        </p>
                    ))}
                </div>
                <div className="mx-auto pt-2">
                    <h2 className="text-xl font-semibold mb-4 text-center">Kontak Kami</h2>
                    <p className="text-gray-300 text-sm mb-2 flex gap-2 justify-center items-center">
                        <i className="pi pi-envelope" style={{ fontSize: '20px' }}></i>
                        <span>chrononews@gmail.com</span>
                    </p>
                </div>
            </div>
            <div className="guest-footer__copyright pb-2 pt-2 text-center text-sm mx-6 text-gray-300">
                <p className="flex gap-1 items-center justify-center">
                    &copy; {new Date().getFullYear()} ChronoNews. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default GuestFooter;
