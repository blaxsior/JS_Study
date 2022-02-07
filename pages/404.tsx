import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//커스텀 404 파일입니다.

export default function Custom404() {
    const router = useRouter();
    const [num, setNum] = useState(5);

    useEffect(() => {
        if (num <= 0) {
            router.replace('/');
        }
        const t = setTimeout(() => {
            setNum(prev => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(t);
        }
    }, [num, router]);

    return (<>
        <h1>404 Error!</h1>
        <p>remain time : {num}</p>
    </>);
}