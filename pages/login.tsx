import { useRouter } from "next/router";
import { useRef, FormEvent } from "react"
import styles from './login.module.css';

// nextjs 환경에서 컴포넌트를 어떻게 만들어야 할까 연습해본 파일입니다.

export default function Login() {
    const router = useRouter();
    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();
        console.log(idRef.current?.value, passwordRef.current?.value);
        const a = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/json'
            },
            body: JSON.stringify({
                id: idRef.current?.value,
                password: passwordRef.current?.value
            })   
        });
        const ret = await a.json();
        console.log(ret);
        const t = setTimeout(() => {
            router.push('/');
        },3000);
    }
    return (
        <div className='container-sm'>
            <form onSubmit={loginHandler}>
                <div className='row'>
                    <label htmlFor="ID"
                        className='form-label col-sm'>ID</label>
                    <input type="email"
                        className="form-control col-sm"
                        required
                        ref={idRef}
                        placeholder="id" />
                </div>
                <div className="row">
                    <label htmlFor="Password"
                        className="form-label col-sm">Password</label>
                    <input type="password"
                        className='form-control col-sm'
                        required
                        ref={passwordRef}
                        placeholder="password" />
                </div>
                <button className={`btn btn-primary ${styles['form-button']}`}>Login</button>
            </form>
        </div>

    )
}