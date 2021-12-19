import React, { useEffect, useState } from "react";

export type UserInfo = {
    userid: string,
    personalInfo: string,
} | null;

interface loginHandle {
    (id: string, password: string): void
}

const initialState = {
    isLoggedIn: false,
    user: {} as UserInfo,
    onLogin: (id: string, password: string): void => { },
    onLogout: (): void => { }
};


const AuthContext = React.createContext(initialState);

export const AuthProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>(null);

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
                catch(e) {
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

    const loginHandler: loginHandle = async (id: string, password: string) => {
        const pid = `${Math.random()}`;
        const personalInfo = password;
        const userInfo: UserInfo = { userid: id, personalInfo: personalInfo };
        const userJson = JSON.stringify(userInfo);
        localStorage.setItem("LoggedIn", pid);
        localStorage.setItem(`user:${pid}`, userJson);
        setIsLoggedIn(true);
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
                isLoggedIn: isLoggedIn,
                user: userInfo,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}>
            {props.children}
        </AuthContext.Provider >
    );
};

export default AuthContext;