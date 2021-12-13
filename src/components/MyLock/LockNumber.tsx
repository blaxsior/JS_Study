import React, { useState } from "react";

const LockNumber = ({ minNum, maxNum, onChange, index }: { minNum: number, maxNum: number, onChange: (arg0: number, arg1: number) => void, index: number }) => {
    const [num, setNum] = useState(minNum);

    const numChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNum(+(e.target.value));
        onChange(+(e.target.value), index);
    };

    const options = [];
    for (let i = minNum; i <= maxNum; i++) {
        options.push(
            <option
                value={i}
                key={`idx${index}option${i}`}>
                {i}
            </option>)
    }

    return (
        <select
            value={num}
            id = {`idx${index}Num`}
            onChange={numChangeHandler}
        >
            {options}
        </select>
    )
};

export default LockNumber;