import React from 'react';
import Input from "../../components/UI/Input";
import Modal from '../../components/UI/Modal';

const UpdateCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props;
    return (
        < Modal
            show={updateCategoryModal}
            handleClose={updateCategoriesForm}
            modalTitle={`Update categories`}
            // onSubmit={updateCategoriesForm}
            size='lg'
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
                                                // onChange={(event) => handleCategoryInput(event, index, "expanded")}
                                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Categories:</Form.Label>
                                            <select
                                                className="form-control"
                                                value={item.parentId}
                                                name="parentId"
                                                // onChange={(event) => handleCategoryInput(event, index, "expanded")}
                                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
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
                                                className="form-control"
                                            >
                                                <option value="">Select Type...</option>
                                                <option value="">Select Type1</option>
                                                <option value="">Select Type2</option>
                                                <option value="">Select Type3</option>

                                            </select>
                                        </Col>
                                        <Input
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
                                                className="form-control"
                                                value={item.parentId}
                                                name="parentId"
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
                                                className="form-control"
                                            >
                                                <option value="">Select Type...</option>
                                                <option value="">Select Type1</option>
                                                <option value="">Select Type2</option>
                                                <option value="">Select Type3</option>

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


export default UpdateCategoriesModal;
