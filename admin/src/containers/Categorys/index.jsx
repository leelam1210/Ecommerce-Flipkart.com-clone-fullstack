import React, { useState } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Input from "../../components/UI/Input";
import Modal from '../../components/UI/Modal';

import { addCategory, getInitialData, updateCategories, deletaCategories as deleteCategoriesAction } from '../../redux/actions';
import './styles.css';

const Category = () => {

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const initialCategory = { name: '', parentId: "", type: "" };
    const [categoryForm, setCategoryForm] = useState(initialCategory);
    const { name, parentId, type } = categoryForm;
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const handleChangeInput = (e) => {
        setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
    };
    // const handleProductImages = (e) => {
    //     console.log(e);
    //     setProducts([...products, e.target.files[0]]);
    // }

    // const handleCategoryInput = (event, index, type) => {
    const handleCategoryInput = (name, value, index, type) => {
        console.log(name);
        console.log(value);
        console.log(index);
        console.log(type);
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [name]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [name]: value } : item);
            setExpandedArray(updatedExpandedArray);

            // const updatedExpandedArray = expandedArray.map((item, _index) =>
            //     index === _index ? { ...item, [event.target.ss]: event.target.value } : item);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        const Form = new FormData();
        Form.append('name', name);
        Form.append('parentId', parentId);
        Form.append('type', type);
        Form.append('categoryImage', categoryImage);
        console.log(Form);
        dispatch(addCategory(Form));
        setCategoryForm('');
        setShow(false);
    };

    const renderCategories = (categories) => {
        // su dung vong lap thay vi map de tiep can tim nap de quy cac danh muc con
        let myCategories = [];
        categories.forEach((category) => {
            myCategories.push(
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                // </li>
                {
                    label: category.name,
                    value: category._id,
                    children: category.children && renderCategories(category.children),
                }
            );
        });
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        categories.forEach(category => {
            options.push({
                value: category?._id,
                name: category?.name,
                parentId: category?.parentId,
                type: category?.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        });
        return options;
    };

    const updateCategoriesForm = () => {
        const Form = new FormData();
        expandedArray.forEach((item, index) => {
            Form.append('_id', item.value);
            Form.append('name', item.name);
            Form.append('parentId', item.parentId ? item.parentId : "");
            Form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            Form.append('_id', item.value);
            Form.append('name', item.name);
            Form.append('parentId', item.parentId ? item.parentId : "");
            Form.append('type', item.type);
        });
        dispatch(updateCategories(Form))
        setUpdateCategoryModal(false)
    };

    const updateCheckedAndExpandedCategories = () => {
        //tim ra categories da check hoac da mo
        const categoriess = createCategoryList(categories);
        const checkedArray = [];
        const expandedArray = [];

        if (checked)
            checked.forEach((categoryId, index) => {
                const category = categoriess.find((category, _index) => categoryId === category.value);
                category && checkedArray.push(category);
            });

        if (expanded)
            expanded.forEach((categoryId, index) => {
                const category = categoriess.find((category, _index) => categoryId === category.value);
                category && expandedArray.push(category);
            });
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, categoriess, checkedArray, expandedArray });
    };
    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    };

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        //tao 1 mang moi chua id 2 mang
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (idsArray.length > 0) {
            dispatch(deleteCategoriesAction(idsArray))
                .then(result => {
                    if (result) {
                        dispatch(getInitialData());
                        console.log("thanh cong");
                    }
                })
                .catch(err => console.log(err));
        }

        setDeleteCategoryModal(false);
    };

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    };

    const renderUpdateCategoriesModal = () => {
        return (
            < Modal
                show={updateCategoryModal}
                // handleClose={updateCategoriesForm}
                modalTitle={`Update categories`}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                size='lg'
                update
            >
                {
                    (checkedArray.length === 0 && expandedArray.length === 0)
                        ?
                        <h3>Please select or open a category to update!</h3>
                        :
                        (
                            <>
                                <h6>Expanded: {expandedArray.length} is open.</h6>
                                {
                                    expandedArray && expandedArray.map((item, index) => (
                                        <Row key={index}>
                                            <Col>
                                                <Input
                                                    laybel='Name:'
                                                    value={item.name}
                                                    name="name"
                                                    type="type"
                                                    placeholder={`Category Name`}
                                                    className="form-control form-control-sm"
                                                    // onChange={(event) => handleCategoryInput(event, index, "expanded")}
                                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Categories:</Form.Label>
                                                <select
                                                    className="form-control form-control-sm"
                                                    value={item.parentId}
                                                    name="parentId"
                                                    // onChange={(event) => handleCategoryInput(event, index, "expanded")}
                                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                                >
                                                    <option value="undefined">Select Category...</option>
                                                    {
                                                        createCategoryList(categories).map((option) => (
                                                            <option key={option.value} value={option.value}>{option.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </Col>
                                            <Col>
                                                <Form.Label>Type:</Form.Label><br />
                                                <select
                                                    className="form-control form-control-sm"
                                                    value={item.type}
                                                    name="type"
                                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Store">Store</option>
                                                    <option value="Product">Product</option>
                                                    <option value="Page">Page</option>

                                                </select>
                                            </Col>
                                            <Input
                                                className="form-control form-control-sm"
                                                type="file"
                                                placeholder={`Category Image`}
                                                onChange={(e) => setCategoryImage(e.target.files[0])}
                                            />
                                        </Row>
                                    ))
                                }
                                <h6>Checked Categories: {checkedArray.length} is checked.</h6>
                                {
                                    checkedArray && checkedArray.map((item, index) => (

                                        <Row key={index}>
                                            <Col>
                                                <Input
                                                    className="form-control form-control-sm"
                                                    laybel='Name:'
                                                    value={item.name}
                                                    name="name"
                                                    placeholder={`Category Name`}
                                                    // onChange={handleCategoryInput}
                                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Categories:</Form.Label>
                                                <select
                                                    className="form-control form-control-sm"
                                                    value={item.parentId}
                                                    // name="parentId"
                                                    // onChange={handleCategoryInput}
                                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                                >
                                                    <option>Select Category...</option>
                                                    {
                                                        createCategoryList(categories).map((option) => (
                                                            <option key={option.value} value={option.value}>{option.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </Col>
                                            <Col>
                                                <Form.Label>Type:</Form.Label><br />
                                                <select
                                                    className="form-control form-control-sm"
                                                    value={item.type}
                                                    name="type"
                                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Store">Store</option>
                                                    <option value="Product">Product</option>
                                                    <option value="Page">Page</option>

                                                </select>
                                            </Col>
                                            {/* <Input
                                            type="file"
                                            placeholder={`Category Image`}
                                            onChange={(e) => setCategoryImage(e.target.files[0])}
                                        /> */}
                                        </Row>
                                    ))
                                }
                            </>
                        )
                }
            </Modal >
        );
    };

    const renderCategoriesAddModal = () => {
        return (
            <Modal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={`Add new category`}
            >
                <Row>
                    <Input
                        laybel='Name:'
                        // value={name}
                        name="name"
                        placeholder={`Category Name`}
                        onChange={handleChangeInput}
                        // onChange={(e)=>seName(e.target.value)}
                        className="form-control-sm"
                    />
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Category:</Form.Label><br />
                        <select
                            className="form-control form-control-sm"
                            // value={parentId}
                            name="parentId"
                            onChange={handleChangeInput}
                        >
                            <option value="">Select category...</option>
                            {
                                createCategoryList(categories).map((option) => (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                ))
                            }
                        </select>
                    </Col>
                    <Col>
                        <Form.Label>Type:</Form.Label><br />
                        <select
                            className="form-control form-control-sm"
                            name="type"
                            onChange={handleChangeInput}
                        >
                            <option value="">Select Type</option>
                            <option value={type} name="type">Store</option>
                            <option value={type} name="type">Product</option>
                            <option value={type} name="type">Page</option>
                        </select>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Input
                        className="form-control form-control-sm"
                        type="file"
                        placeholder={`Category Image`}
                        onChange={(e) => setCategoryImage(e.target.files[0])}
                    />
                </Row>
                {/* <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer> */}
            </Modal>
        );
    };

    const renderDeleteCategoryModal = () => {
        // console.log(expanded);
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: () => deleteCategories()
                    }
                ]}
            >
                <h5>Expanded:</h5>
                {expandedArray.map((item, index) => (
                    <div key={index}>
                        <p>{index + 1}: <span>{item.name}</span></p>
                    </div>
                ))}
                <h5>Checked:</h5>
                {checkedArray.map((item, index) => (
                    <div key={index}>
                        <p>{index + 1}: <span>{item.name}</span></p>
                    </div>
                ))}
                <h4 style={{ color: 'red' }}>Are you sure you want to delete?</h4>
            </Modal>
        );
    };
    return (
        <Layout isSideBar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                {/* <span style={{ color: "red", fontSize: "25px" }}>Actions: </span> */}
                                <Button onClick={handleShow}><IoIosAdd /><span>Add</span></Button>
                                <Button variant="danger" onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></Button>
                                <Button variant="warning" onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>{renderCategories(categories)}</ul> */}
                        <CheckboxTree
                            nodes={renderCategories(categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            {renderCategoriesAddModal()}
            {renderUpdateCategoriesModal()}
            {renderDeleteCategoryModal()}
        </Layout >
    )
}

export default Category
