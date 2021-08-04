import React from 'react';

const CategoriesAddModal = () => {
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={`Add new category`}
        >
            <Input
                laybel='Name:'
                value={name}
                name="name"
                placeholder={`Category Name`}
                onChange={handleChangeInput}
            />

            <select className="form-control"
                value={parentId}
                name="parentId"
                onChange={handleChangeInput}
            >
                <option>Select category...</option>
                {
                    createCategoryList(categories).map((option) => (
                        <option key={option.value} value={option.value}>{option.name}</option>
                    ))
                }
            </select>

            <Input
                type="file"
                placeholder={`Category Image`}
                onChange={(e) => setCategoryImage(e.target.files[0])}
            />
            {/* <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default CategoriesAddModal;
