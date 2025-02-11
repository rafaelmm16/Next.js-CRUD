import React from 'react';
import Header from './header';
import Footer from './footer';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-8">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
