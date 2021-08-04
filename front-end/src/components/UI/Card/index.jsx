import React from 'react';
import './styles.css';

const Card = (props) => {
    return (
        <div
            className="card"
            {...props}
        >
            <div className="cardHeader">
                {
                    props.headerLeft && <div>{props.headerLeft}</div>
                }
                {
                    props.headerRight && <div>{props.headerRight}</div>
                }

                {/* <button>view all</button> */}
            </div>
            {props.children}
        </div>
    )
}

export default Card
