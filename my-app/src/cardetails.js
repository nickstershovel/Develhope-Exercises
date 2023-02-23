import React, { useEffect, useRef } from 'react';

function CarDetails({ initialData }) {
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.reset();
        }
    }, [initialData]);

    return (
        <form ref={formRef}>
            <label>
                Model:
                <input type="text" name="model" defaultValue={initialData.model} />
            </label>
            <br />
            <label>
                Year:
                <input type="number" name="year" defaultValue={initialData.year} />
            </label>
            <br />
            <label>
                Color:
                <input type="text" name="color" defaultValue={initialData.color} />
            </label>
        </form>
    );
}
export default CarDetails;