import React, { useState, useEffect } from 'react';
import './styles.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../../redux/actions';

import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
} from '../MaterialUI';

/**
* @author LE LAM
* @function 
**/

const Header = (props) => {

    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { isAuthenticated, authData } = useSelector(state => state.auth);
    const userLogin = () => {
        dispatch(signIn({ email, password }));
    };

    const logoutUser = () => {
        dispatch(signOut());
    };

    useEffect(() => {
        if (isAuthenticated) {
            setLoginModal(false);
        }
    }, [isAuthenticated]);

    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="loginButton" onClick={() => setLoginModal(true)}>
                        Login
                    </a>
                }
                menus={[
                    { label: 'My Profile', href: '', icon: null },
                    { label: 'Flipkart Plus Zone', href: '', icon: null },
                    { label: 'Orders', href: '', icon: null },
                    { label: 'Wishlist', href: '', icon: null },
                    { label: 'Rewards', href: '', icon: null },
                    { label: 'Gift Cards', href: '', icon: null },
                ]}
            />
        );
    };

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="fullName">{authData.data.fullName}</a>
                }
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "SuperCoin Zone", href: "", icon: null },
                    { label: "Flipkart Plus Zone", href: "", icon: null },
                    { label: "Orders", href: `/account/orders`, icon: null },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "My Chats", href: "", icon: null },
                    { label: "Coupons", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Notifications", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                    { label: "Logout", href: "", icon: null, onClick: logoutUser },
                ]}
            />
        );
    };
    return (
        <div className="header">
            <Modal
                visible={loginModal}
                onClose={() => setLoginModal(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">


                            <MaterialInput
                                type="email"
                                label="Enter Email/Enter Mobile Number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <MaterialInput
                                type="password"
                                label="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // rightElement={<a href="#">Forgot?</a>}
                            />

                            <MaterialButton
                                title="Login"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{ margin: '40px 0 20px 0', }}
                                onClick={userLogin}
                            />

                            <p style={{ textAlign: "center", margin: '0' }}>OR</p>

                            <MaterialButton
                                title="Request OTP"
                                bgColor="#ffffff"
                                textColor="#2874f0"
                                style={{
                                    margin: "20px 0",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="subHeader">
                {/* logo*/}
                <div className="logo">
                    <Link to="/">
                        <img src={flipkartLogo} className="logoimage" alt="" />
                    </Link>
                    <Link to="/" style={{ marginTop: '-10px', textDecoration: 'none', color: 'white' }}>
                        <span className="exploreText">Explore</span>
                        <span className="plusText">Plus</span>
                        <img src={goldenStar} className="goldenStar" alt="" />
                    </Link>
                </div>
                {/* logo end  */}
                {/* search */}
                <div style={{
                    padding: '0 10px'
                }}>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={'Tìm kiếm sản phẩm, thương hiệu...'}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch style={{
                                color: '#2874f0'
                            }} />
                        </div>

                    </div>
                </div>
                {/* search end */}
                {/* rigth side menu */}
                <div className="rightMenu">
                    {
                        isAuthenticated ? renderLoggedInMenu() : renderNonLoggedInMenu()
                    }
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: 'Notification Preference', href: '', icon: <IoIosCart /> },
                            { label: 'Sell on flipkart', href: '', icon: null },
                            { label: '24x7 Customer Care', href: '', icon: null },
                            { label: 'Advertise', href: '', icon: null },
                            { label: 'Download App', href: '', icon: null }
                        ]}
                    />
                    <div>
                        <a className="cart">
                            <IoIosCart />
                            <span style={{ margin: '0 10px' }}>Cart</span>
                        </a>
                    </div>
                </div>

            </div>
        </div >
    )

}

export default Header