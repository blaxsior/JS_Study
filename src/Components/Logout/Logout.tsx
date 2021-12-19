import styles from './Logout.module.css';

const Logout = (props : {onLogout: () => void}) => {
    return (
        <button onClick={props.onLogout}>Logout</button>
    )
};

export default Logout;