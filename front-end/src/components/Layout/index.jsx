import React from 'react';
import Header from '../Header';
import MenuHeader from '../MenuHeader';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <MenuHeader />
            {children}
        </>
    )
}

export default Layout
