import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlugCategory } from "../../../redux/actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

import "./styles.css";
import { generatorPublicUrl } from "../../../urlConfig";

const PageNonType = (props) => {
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    console.log(props);

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlugCategory(match.params.slug));
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
                }}
            >
                {products.map((product) => (
                    <div className="caContainer">
                        <Link
                            className="caImgContainer"
                            to={`/${product.slug}/${product._id}/p`}
                        >
                            <img src={generatorPublicUrl(product.productPictures[0].image)} />
                        </Link>
                        <div>
                            <div className="caProductName">{product.name}</div>
                            <div className="caProductPrice">
                                <BiRupee />
                                {product.price}
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}

export default PageNonType
