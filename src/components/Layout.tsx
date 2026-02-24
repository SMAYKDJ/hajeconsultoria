import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500">
            <Sidebar
                isOpen={isMobileMenuOpen}
                setIsOpen={setIsMobileMenuOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <Header
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                <main className="flex-1 overflow-auto p-4 lg:p-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
