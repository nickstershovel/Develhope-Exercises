import React, { useMemo } from "react";

function FilteredList({ list }) {
    const filteredList = useMemo(() => {
        if (list) {
            return list.filter((item) => item.age > 18);
        } else {
            return [];
        }
    }, [list]);

    return (
        <div>
            <h2>Filtered List</h2>
            <ul>
                {filteredList.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FilteredList;