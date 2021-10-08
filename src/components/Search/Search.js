import React from "react";
import "./style.scss";

export default function Search({ onChange, placeholder }) {
    return (
        <input
            type="text"
            className="search"
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
