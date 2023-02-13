import React from "react";

const Container = ({ children, title }) => (
    <div style={{ background: "white", border: "1px solid red", padding: "10px" }}>
        <h3>{title}</h3>
        {children}
    </div>
);

export default Container;