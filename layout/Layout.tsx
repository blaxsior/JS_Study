import AppHeader from "../components/AppHeader/AppHeader";

const Layout = (props: { children: JSX.Element | JSX.Element[] }) => {
    const navlist = [
        { href: '/login', title: 'Login' },
        { href: '/genshin', title: 'Genshin' }
    ];

    return <>
        <AppHeader navList={navlist} />
        <main>
            {props.children}
        </main>
    </>
};

export default Layout;