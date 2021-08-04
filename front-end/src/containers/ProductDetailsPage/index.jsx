import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { productByDetailById } from '../../redux/actions';
import { addToCart } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { MaterialButton } from "../../components/MaterialUI";

import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import './styles.css';
import { generatorPublicUrl } from '../../urlConfig';

const ProductDetailsPage = (props) => {
    const { productId } = useParams();
    const { productDetails } = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productByDetailById(productId));
    }, [dispatch]);

    //kiem tra co khoa nao khong trong se tra ve null
    if (Object.keys(productDetails).length === 0) {
        return null;
    }
    return (
        <Layout>
            {/* <div>{productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {productDetails.productPictures.map((thumb, index) => (
                            <div className="thumbnail active">
                                <img src={generatorPublicUrl(thumb.image)} alt={thumb.image} />
                            </div>
                        ))}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img
                                src={generatorPublicUrl(productDetails.productPictures[0].image)}
                                alt={generatorPublicUrl(productDetails.productPictures[0].image)}
                            />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow" style={{ marginTop: '20px' }}>
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                height='45px'
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const { _id, name, price } = productDetails;
                                    const image = productDetails.productPictures[0].image;
                                    // const productInfo = productDetails;
                                    dispatch(addToCart({ _id, name, price, image }));
                                    props.history.push(`/cart`);
                                }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                height='45px'
                                style={{
                                    marginLeft: "5px",
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Samsung</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{productDetails.name}</a>
                            </li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{productDetails.name}</p>
                        <div>
                            <span className="ratingCount">
                                4.3 <IoIosStar />
                            </span>
                            <span className="ratingNumbersReviews">
                                72,234 Ratings & 8,140 Reviews
                            </span>
                        </div>
                        <div className="extraOffer">
                            Extra <BiDollar />
                            4500 off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                            <span className="price">
                                {productDetails.price}
                                <BiDollar />
                            </span>
                            <span className="discount" style={{ margin: "0 10px" }}>
                                22% off
                            </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
                            </p>
                            <p style={{ display: "flex" }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "12px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Description
                                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#212121",
                                    }}
                                >
                                    {productDetails.description}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetailsPage
