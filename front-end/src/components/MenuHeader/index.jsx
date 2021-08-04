import React, { useEffect } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../redux/actions';
import { Link } from 'react-router-dom';

const MenuHeader = () => {
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch])

    const renderCategories = (categories) => {
        // su dung vong lap thay vi map de tiep can tim nap de quy cac danh muc con
        let myCategories = [];
        categories.forEach((category) => {
            // console.log(category);
            myCategories.push(
                <li key={category._id}>
                    {
                        category.parentId
                            ?
                            <Link to={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                                {category.name}
                            </Link>
                            :
                            <span>{category.name}</span>

                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
                // {
                //     name: category.name,
                //     value: category._id,
                //     children: category.children.length > 0 && renderCategories(category.children),
                // }
            );
        });
        return myCategories;
    };

    return (
        <div className="menuHeader">
            <ul>
                {categories && (renderCategories(categories))}
            </ul>
        </div>
    )
}

export default MenuHeader
