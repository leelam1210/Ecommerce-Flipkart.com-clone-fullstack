import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row, Button, Form, Container } from 'react-bootstrap';
import Input from "../../components/UI/Input";
import Modal from '../../components/UI/Modal';
import { CategoryList } from '../../utils/createCategoryList';
import { createPage } from '../../redux/actions';

const Pages = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const [createModal, setCreateModal] = useState(false);
    const [formTitleDecs, setFormTitleDecs] = useState({ description: "", title: "" });
    const { title, description } = formTitleDecs;
    const [categoryId, setCategoryId] = useState('');
    const [type, setType] = useState('');
    const [categoried, setCategoried] = useState([]);
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const page = useSelector(state => state.page);

    const handleChangeInput = (e) => {
        setFormTitleDecs({ ...formTitleDecs, [e.target.name]: e.target.value });
        // const [titlea, settitle] = useState('')
        // settitle({ ...titlea, [e.target.name]: e.target.value });
    };
    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    };
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    };

    useEffect(() => {
        setCategoried(CategoryList(categories));
    }, [categories])
    console.log(categoried);

    useEffect(() => {
        console.log(page);
        if (!page.isLoading) {
            setCreateModal(false);
            setCategoryId('');
            setFormTitleDecs('');
            setProducts([]);
            setBanners([]);
            setCreateModal(false);
        }
    }, [page]);

    const onCategoryChanged = (e) => {
        const category = categoried.find(category => category.value === e.target.value);
        setCategoryId(category?.value);
        // setCategoryId({ ...categoryId, [e.target.name]: e.target.value });
        setType(category?.type);
    };

    const submitPageForm = (e) => {
        const Form = new FormData();
        Form.append('title', title);
        Form.append('description', description);
        Form.append('category', categoryId);
        Form.append('type', type);
        banners.forEach((banner, index) => {
            Form.append('banners', banner);
        });
        products.forEach((product, index) => {
            Form.append('products', product);
        });

        dispatch(createPage(Form));

        // console.log({ title, description, categoryId, type, banners, products });
    };

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
                size="lg"
            >
                <Container>
                    <Row>
                        <Col>
                            <Form.Label>Categories:</Form.Label>
                            <select
                                className="form-control form-control-sm"
                                // value={categoryId}
                                onChange={onCategoryChanged}
                            // name="categoryId"
                            >
                                <option value="">Select category...</option>
                                {
                                    categoried.map(cat =>
                                        <option key={cat._id} value={cat.value}>{cat.name}</option>
                                    )
                                }
                            </select>

                            {/* <Input
                                className="form-control form-control-sm"
                                laybel={`Categories:`}
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChanged}
                                options={categoried}
                                name="categoryId"
                                placeholder={'Select Category...'}
                            /> */}

                            {/* {
                                createCategoryList(categories).map((option) => (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                ))
                            } */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                // value={title}
                                className="form-control form-control-sm"
                                name="title"
                                onChange={handleChangeInput}
                                placeholder={`Page title...`}
                                laybel={`Page title:`}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                // value={description}
                                className="form-control form-control-sm"
                                name="description"
                                onChange={handleChangeInput}
                                placeholder={`Page description...`}
                                laybel={`Page discription:`}
                            />
                        </Col>
                    </Row>
                    {
                        banners.length > 0 ?
                            banners.map((banner, index) =>
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                laybel={`Banners image:`}
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    {
                        products.length > 0 ?
                            products.map((product, index) =>
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="products"
                                laybel={`Products image:`}
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal >
        );
    };
    return (
        <Layout isSideBar>
            {
                page.isLoading ?
                    <p>Creating Page...please wait</p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <Button variant="primary" size='sm' onClick={() => setCreateModal(true)}>Create Page</Button>
                    </>
            }
        </Layout>
    )
}

export default Pages
