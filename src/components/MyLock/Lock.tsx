import React, { useEffect, useState } from "react";
import styles from './Lock.module.css';
import LockNumber from "./LockNumber";

const Lock = (p: { minNum: Readonly<number>, maxNum: Readonly<number>, password: Readonly<number[]> }) => {
    const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
    const [enteredPassword, setEnteredPassword] = useState(new Array(p.password.length).fill(p.minNum));

    useEffect(() => {
        for (let i = 0; i < p.password.length; i++) {
            if (p.password[i] !== enteredPassword[i]) {
                setIsUnlocked(false);
                return;
            }
        }
        setIsUnlocked(true);
    }, [enteredPassword, p.password]);

    useEffect(() => {
        console.log(enteredPassword);
    });

    const valueChangeHandler = useCallback((num: number, index: number) => {
        setEnteredPassword(prev => {
            const arr = [...prev];
            arr[index] = num;
            return arr;
        })
    },[]);

    const lockNumbers = [];

    for (let i = 0; i < p.password.length; i++) {
        lockNumbers.push(<LockNumber
            minNum={p.minNum}
            maxNum={p.maxNum}
            index={i}
            key={`idx${i}Num`}
            onChange={valueChangeHandler}
        />);
    }

    return (
        <div className={styles.lockCase}>
            <div className={styles.lock}>
                {lockNumbers}

            </div>
            {isUnlocked === true &&
                <div className={styles.successText}>Unlocked!</div>
            }
            <div className={`${styles.locker} ${isUnlocked ? styles.success : ''}`}>
                <div></div>
            </div>
        </div>

    )
};

export default Lock;
