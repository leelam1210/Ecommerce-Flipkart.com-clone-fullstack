import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../redux/actions';
import { useLocation } from 'react-router-dom';
import { getParams } from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './styles.css';
import Card from '../../../components/UI/Card';

const ProductPage = () => {
    const dispatch = useDispatch();
    const { page } = useSelector(state => state.products);
    const { search } = useLocation();
    useEffect(() => {
        const params = getParams(search);
        const payload = { params };
        dispatch(getProductPage(payload));
    }, []);
    return (
        <div className="container-product-page">
            <h4>{page.title}</h4>
            <Carousel>
                {/* renderThumbs={() => { }} */}
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a
                            key={index}
                            style={{ display: 'block' }}
                            href={banner.navigateTo}
                        >
                            <img src={banner.image} alt="" />
                        </a>
                    )
                }
            </Carousel>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0'
            }}>
                {
                    page.products && page.products.map((product, index) =>
                        <Card
                            key={index}
                            style={{
                                width: '250px',
                                height: '200px',
                                margin: '10px 20px',
                                padding: '10px'
                            }}
                        >
                            <img style={{
                                width: '100%',
                                height: '100%',
                                objectFit: "contain"
                            }} src={product.image} alt="" />
                        </Card>
                    )
                }
            </div>
        </div >
    )
}

export default ProductPage;