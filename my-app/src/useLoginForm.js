import { useState } from "react";

function useLoginForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return [formData, handleInputChange];
}