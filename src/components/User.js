import styles from './User.module.css';

const User = (props) => {

    const clickHandler = (e) => {
        props.onDelete({name:props.name, age: props.age});
    };

    return (
    <div
        className={styles.user}
        onClick={clickHandler}
        >
        <span>Name : {props.name}</span>
        <span>Age : {props.age}</span>
    </div>
    );
};

export default User;