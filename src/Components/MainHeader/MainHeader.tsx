import styles from "./MainHeader.module.css";
import Logout from "../Logout/Logout";

const MainHeader = (props: { isLoggedIn: boolean, onLogout: () => void }) => {
    return (
        <div className={styles.main_header}>
            <a
                className={styles.main_page}
                href="/" >
                My Little Blog
            </a>

            {props.isLoggedIn &&
                <div className={styles.link}>
                    <a href='/'>A</a>
                    <a href='/'>B</a>
                    <a href='/'>C</a>

                </div>
            }
            {props.isLoggedIn &&
                <Logout onLogout={props.onLogout} />
            }
        </div>
    )
};

export default MainHeader;