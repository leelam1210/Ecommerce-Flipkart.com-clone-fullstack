import React from "react";
import { Form } from "react-bootstrap";

const Input = ({
    laybel,
    errorMessage,
    type,
    placeholder,
    value,
    onChange,
    name,
    className
}, props) => {

    let input = null;
    switch (props.type) {
        case 'select':
            input = <Form.Group>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <select
                    className="form-control form-control-sm"
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                >
                    <option value="">{props.placeholder}</option>
                    {
                        props.options.length > 0 ?
                            props.options.map((option, index) =>
                                <option key={index} value={option.value}>{option.name}</option>
                            ) : null
                    }
                </select>
            </Form.Group>
        case 'text':
        default:
            input = <Form.Group className="mb-3">
                {laybel && <Form.Label>{laybel}</Form.Label>}
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className={className}
                    {...props}
                />
                <Form.Text className="text-muted">{errorMessage}</Form.Text>
            </Form.Group>
    }

    return input;
};

export default Input;
