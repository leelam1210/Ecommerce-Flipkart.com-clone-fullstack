import React from 'react';
import Layout from '../../components/Layout';
import ProductStore from './ProductStore';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { getParams } from '../../utils/getParams';
import ProductPage from './ProductPage';

const ProductListPage = (props) => {
    const { search } = useLocation();
    const renderProduct = () => {
        const params = getParams(search);
        console.log(params);
        let content = null;
        switch (params.type) {
            case 'Store':
                content = <ProductStore {...props} />
                break;
            case "Page":
                content = <ProductPage {...props} />
                break;
            default:
                content = null;
        }
        return content;
    };

    return (
        <Layout>
            {renderProduct()}
        </Layout>
    )
}

export default ProductListPage
