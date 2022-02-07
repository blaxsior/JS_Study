import { createContext, useEffect, useState } from "react";

interface UserInfo {
    name: string;
    email: string;
    password: string;
    token: string;
}

interface IAuth {
    isLoggedIn: boolean;
    user?: UserInfo;
    loginHandler: (id: string, password: string) => {};
    logoutHandler: () => void;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const pid = localStorage.getItem("LoggedIn");
        if (pid) {
            const user = localStorage.getItem(`user:${pid}`);

            if (user) {
                try {
                    const userObj = JSON.parse(user) as UserInfo;
                    setIsLoggedIn(true);
                    setUserInfo(userObj);
                }
                catch (e) {
                    console.log("cannot log in");
                }
            }
            else {
                // 유저 정보가 없다면 모든 정보 제거

                localStorage.removeItem("LoggedIn");
                localStorage.removeItem(`user:${pid}`);
            }
        }
    }, []);

    const loginHandler = async (id: string, password: string) => {

    };

    const logoutHandler = () => {
        const pid = localStorage.getItem("LoggedIn");

        localStorage.removeItem(`user:${pid}`);
        localStorage.removeItem("LoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                loginHandler,
                logoutHandler,
            }}
        >

        </AuthContext.Provider>

    );
};