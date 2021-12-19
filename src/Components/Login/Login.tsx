import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../../store/auth.context";
import Input, { inputHandle } from "../Input/Input";
import styles from "./Login.module.css";

const initialId = {
    value: "",
    isValid: false
};

type ID = typeof initialId;

type idAction =
    { type: "INPUT", value: string } |
    { type: "VALIDATION" };

const IdReducer = (state: ID, action: idAction): ID => {
    switch (action.type) {
        case "INPUT":
            return {
                value: action.value,
                isValid: state.isValid
            };
        case "VALIDATION":
            const valid = state.value.includes('@');
            return {
                value: state.value,
                isValid: valid
            };
    }
    throw new Error("Cannot Reach Here : passwordReducer");
};

const initialPassword = {
    value: "",
    isValid: false
};
type PASSWORD = typeof initialId;

type passwordAction = idAction;

const passwordReducer = (state: PASSWORD, action: passwordAction): PASSWORD => {
    switch (action.type) {
        case "INPUT":
            return {
                value: action.value,
                isValid: state.isValid
            };
        case "VALIDATION":
            const valid = state.value.length > 6;
            return {
                value: state.value,
                isValid: valid
            };
    }
    throw new Error("Cannot Reach Here : passwordReducer");
};

const Login = (props: {}) => {
    const authCtx = useContext(AuthContext);

    const [idState, dispatchIdState] = useReducer(IdReducer, initialId);
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, initialPassword);
    const [formIsValid, setFormIsValid] = useState<boolean | null>(null);


    const idRef = useRef<inputHandle>(null); // 인터페이스를 직접 전달
    const passwordRef = useRef<React.ElementRef<typeof Input>>(null); // 인터페이스를 ElementRef을 이용해 전달

    useEffect(() => {
        const t = setTimeout(() => {
            setFormIsValid(idState.isValid && passwordState.isValid);
        }, 200);

        return () => {
            clearTimeout(t);
        }
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (formIsValid) {
            authCtx.onLogin(idState.value, passwordState.value);
        } else if (!idState.isValid)
        {
            console.log(idRef.current!.focus);
            idRef.current!.focus();
        } else {
            passwordRef.current!.focus();
        }
    };


    const idValidHandler = () => {
        dispatchIdState({ type: "VALIDATION" });
    };
    const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchIdState({ type: "INPUT", value: e.target.value })
    }

    const passwordValidHandler = () => {
        dispatchPasswordState({ type: "VALIDATION" });
    };

    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchPasswordState({ type: "INPUT", value: e.target.value })
    }

    return (
        <form
            className={styles.loginForm}
            onSubmit={submitHandler}>
            <div className={styles.input}>
                <Input
                    id="ID"
                    label="ID"
                    type="email"
                    onBlur={idValidHandler}
                    onChange={idChangeHandler}
                    value={idState.value}
                    ref={idRef}
                />
                <Input
                    id="Password"
                    label="Password"
                    type="password"
                    onBlur={passwordValidHandler}
                    onChange={passwordChangeHandler}
                    value={passwordState.value}
                    ref={passwordRef}
                />
            </div>
            <button className={styles.action}>Login</button>
        </form>
    );
};

export default Login;