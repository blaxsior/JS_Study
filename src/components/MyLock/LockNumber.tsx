import React, { useEffect, useReducer } from "react";
import styles from './LockNumber.module.css';
interface NumberState {
    value: number;
    min: number;
    max: number;
}

type ACTIONTYPE =
    { type: "INCREMENT" }
    | { type: "DECREMENT" };

const numChangeReducer = (state: NumberState, action: ACTIONTYPE): NumberState => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, value: (state.value + 1 <= state.max) ? state.value + 1 : state.min };
        case 'DECREMENT':
            return { ...state, value: (state.value - 1 >= state.min) ? state.value - 1 : state.max };
    }
    throw new Error("cannot reach here!");
}

const LockNumber = ({ minNum, maxNum, onChange, index }: { minNum: number, maxNum: number, onChange: (arg0: number, arg1: number) => void, index: number }) => {
    const [numState, numDispatch] = useReducer(
        numChangeReducer,
        { value: minNum, min: minNum, max: maxNum } as NumberState
    );
    const { value } = numState;
    useEffect(() => {
        onChange(value, index);
    }, [onChange, value, index]);

    const numIncHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        numDispatch({ type: "INCREMENT" });
    };

    const numDecHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        numDispatch({ type: "DECREMENT" });
    };

    return (
        <div>
            <button
                onClick={numIncHandler}
                id={`inc_button_index${index}`}
                className={styles.button_inc}>▲</button>
            <div className={styles.lock_number}>{numState.value}</div>
            <button
                onClick={numDecHandler}
                id={`dec_button_index${index}`}
                className={styles.button_dec}>▼</button>
        </div>
    )
};

export default LockNumber;