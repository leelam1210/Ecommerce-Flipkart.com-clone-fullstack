/**
 * LE LAM
 * 01/08/2021
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsBySlugCategory } from '../../../redux/actions';
import { generatorPublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from '../../../components/UI/Rating';
import Price from '../../../components/UI/Price';

const ProductStore = (props) => {

    const { products, productsByPrice, priceRange } = useSelector(state => state.products);
    const { slug } = useParams();
    const [priceRanges, setPriceRanges] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000,
    });

    // console.log(slug);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsBySlugCategory(slug));
    }, [slug]);

    return (
        <>
            {
                Object.keys(productsByPrice).map((key, index) => {
                    return (
                        <Card
                            // headerLeft={`${slug} under ${priceRanges[key]}`}
                            // headerRight={<button >View All</button>}
                            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                            headerRight={
                                <MaterialButton
                                    title={"VIEW ALL"}
                                    style={{
                                        width: "96px",
                                    }}
                                    bgColor="#2874f0"
                                    fontSize="12px"
                                />
                            }
                            style={{
                                width: "calc(100% - 40px)",
                                margin: "20px",
                            }}
                        // className="card" key={index}
                        >
                            {/* <div className="cardHeader">
                                <div>{slug} under {priceRanges[key]}</div>
                                <button>view all</button>
                            </div> */}
                            <div style={{ display: 'flex' }}>
                                {
                                    productsByPrice[key].map(product => (
                                        <Link
                                            to={`/${product.slug}/${product._id}/detail`}
                                            style={{
                                                display: "block",
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                            className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatorPublicUrl(product.productPictures[0].image)} alt="" />
                                                {/* <img src={`http://localhost:5500/public/image/${product.productPictures[0].image}`} alt="" /> */}
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: "10px 0" }}>{product.name}</div>
                                                <div>
                                                    <Rating value="4.3" />
                                                    &nbsp;&nbsp;
                                                    <span
                                                        style={{
                                                            color: "#777",
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        (3353)
                                                    </span>
                                                </div>
                                                <Price value={product.price} />
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </>
    )
}

export default ProductStore;
