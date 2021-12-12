import User from './User';
import styles from './UserList.module.css';

const UserList = (props) => {
    return (
        <div className={styles.list}>
            {props.users.map(
                elem => <User
                    name={elem.name}
                    age={elem.age}
                    key={elem.name+Math.random()}
                    onDelete={props.onDelete}
                />
            )}
        </div>
    );
};

export default UserList;