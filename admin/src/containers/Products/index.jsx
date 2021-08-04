import React, { useState } from "react";
import { Col, Table, Row, Button, Form } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

import "./styles.css";
import { addProduct } from "../../redux/actions";
import { IoIosAdd } from "react-icons/io";

const Products = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const { productData } = useSelector((state) => state.product);
    const initialCategory = {
        name: "",
        price: "",
        description: "",
        quantity: "",
        productId: "",
        category: "",
    };
    const [productForm, setProductForm] = useState(initialCategory);
    const [productPictures, setProductPictures] = useState([]);
    const { name, price, description, quantity, productId, category } =
        productForm;
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const handleChangeInput = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };
    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };
    // console.log(productPictures);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        const Form = new FormData();
        Form.append("name", name);
        Form.append("price", price);
        Form.append("category", category);
        Form.append("quantity", quantity);
        Form.append("description", description);
        Form.append("productId", productId);

        for (let pic of productPictures) {
            Form.append("productPictures", pic);
        }
        console.log(Form);
        dispatch(addProduct(Form));
        setShow(false);
    };

    const createCategoryList = (categories, options = []) => {
        categories.forEach((category) => {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                // type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        });
        return options;
    };

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 13 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>ProductCode</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.length > 0 ? productData.map((product) => (
                        <tr key={product._id}>
                            <td>1</td>
                            <td>{product.name}</td>
                            <td>{product.productId}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category?.name}</td>
                            <td>
                                <Button size="sm" variant="info" onClick={() => showProductDetailsModal(product)}>
                                    info
                                </Button>
                            </td>
                        </tr>
                    ))
                        : null
                    }
                </tbody>
            </Table>
        );
    };

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={`Add new product`}
                onSubmit={handleClose}
            >
                <Input
                    laybel="Code product:"
                    value={productId}
                    name="productId"
                    placeholder={`Product code`}
                    onChange={handleChangeInput}
                    className="form-control form-control-sm"
                />
                <Input
                    laybel="Name:"
                    value={name}
                    name="name"
                    placeholder={`Product name`}
                    onChange={handleChangeInput}
                    className="form-control form-control-sm"
                />
                <Form.Label>Category:</Form.Label>
                <select
                    className="form-control form-control-sm"
                    value={category}
                    name="category"
                    onChange={handleChangeInput}
                >
                    <option>Select category...</option>
                    {createCategoryList(categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />

                <Input
                    laybel="Price:"
                    value={price}
                    name="price"
                    placeholder={`Price product`}
                    onChange={handleChangeInput}
                    className="form-control form-control-sm"
                />
                <Input
                    laybel="Quantity:"
                    value={quantity}
                    name="quantity"
                    placeholder={`Quantity product`}
                    onChange={handleChangeInput}
                    className="form-control form-control-sm"
                />

                {productPictures.map((pic) => (
                    <div key={pic._id}>{pic.name}</div>
                ))}
                <Input
                    type="file"
                    name={productPictures}
                    placeholder={`Product image`}
                    onChange={handleProductPictures}
                    className="form-control form-control-sm"
                />
                <Input
                    laybel="Description:"
                    value={description}
                    name="description"
                    placeholder={`Description product`}
                    onChange={handleChangeInput}
                    className="form-control form-control-sm"
                />

                {/* <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer> */}
            </Modal>
        )
    };
    // const handleCloseProductDetailsModal = () => {
    //     setProductDetailModal(false);
    //   };

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        console.log(product);
        setProductDetailModal(true);
    };

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }

        return (
            <Modal
                show={productDetailModal}
                handleClose={() => setProductDetailModal(false)}
                modalTitle={"Product Details"}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name:</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price:</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">ProductCode:</label>
                        <p className="value">{productDetails.productId}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category:</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity:</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Description:</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures:</label>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {productDetails.productPictures.map((picture) => (
                                <div className="productImgContainer">
                                    {/* <img src={picture.image} alt="" /> */}
                                    <img src={`http://localhost:5500/public/image/${picture.image}`} />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    };

    return (
        <Layout isSideBar>
            <Row>
                <Col md={12}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "red", fontSize: "25px" }}>Products: </span>
                        <Button size="sm" variant="primary" onClick={handleShow}><IoIosAdd />Add</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>{renderProducts()}</Col>
            </Row>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    );
};

export default Products;
