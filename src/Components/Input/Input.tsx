import React, { useImperativeHandle, useRef } from 'react';
import styles from './Input.module.css';

type htmlInputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

type props = Partial<{
    id: string,
    label: string,
    type: htmlInputType,
    onBlur: () => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}>;

export type inputHandle = {
     focus: () => void,
    };

const Input= React.forwardRef<inputHandle, props>((props: props, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);
    
    const focus = () => {
        inputRef.current!.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: focus
        };
    });

    return (
        <div className={styles.line}>
            <label
                className={styles.label}
                htmlFor={props.id}
            >
                {props.label}
            </label>
            <input
                className={styles.input}
                ref={inputRef}
                id={props.id}
                name={props.id}
                type={props.type}
                onBlur={props.onBlur}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )
});
 
export default Input;