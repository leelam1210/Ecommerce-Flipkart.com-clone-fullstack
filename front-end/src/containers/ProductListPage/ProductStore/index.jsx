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

const ProductStore = () => {

    const { products, productsByPrice } = useSelector(state => state.products);
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
                            headerLeft={`${slug} under ${priceRanges[key]}`}
                            headerRight={<button >View All</button>}
                            style={{
                                width: 'calc(100% - 30px)',
                                margin: '15px'
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
                                            style={{ display: 'block' }}
                                            className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatorPublicUrl(product.productPictures[0].image)} alt="" />
                                                {/* <img src={`http://localhost:5500/public/image/${product.productPictures[0].image}`} alt="" /> */}
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3</span>&nbsp;
                                                    <span>5000$</span>
                                                </div>
                                                <div className="productPrice">{product.price}</div>
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
