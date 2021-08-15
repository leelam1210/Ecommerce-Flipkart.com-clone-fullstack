import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import "./styles.css";
import { getOrders } from "../../redux/actions";
import { generatorPublicUrl } from "../../urlConfig";
import { Breed } from "../../components/MaterialUI";

const OrderPage = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <Layout>
            <Breed
                breed={[
                    { name: "Home", href: "/" },
                    { name: "My Account", href: "/account" },
                    { name: "My Orders", href: "/account/orders" },
                ]}
                breedIcon={<IoIosArrowForward />}
            />
            {orders.map((order) => {
                return order.items.map((item) => (
                    <Card style={{ display: "block", margin: "5px 0" }}>
                        <Link
                            to={`/order_details/${order._id}`}
                            className="orderItemContainer"
                        >
                            <div className="orderImgContainer">
                                <img
                                    className="orderImg"
                                    src={generatorPublicUrl(
                                        item?.productId?.productPictures[0]?.image)}
                                    alt=""
                                />
                            </div>
                            <div className="orderRow">
                                <div className="orderName">{item.productId.name}</div>
                                <div className="orderPrice">
                                    <BiRupee />
                                    {item.payablePrice}
                                </div>
                                <div>{order.paymentStatus}</div>
                            </div>
                        </Link>
                    </Card>
                ));
            })}
        </Layout>
    );
};

export default OrderPage;
