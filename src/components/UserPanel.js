import { useState } from 'react';
import UserCreateForm from './UserCreateForm';
import UserList from './UserList';
import styles from './UserPanel.module.css';

const UserPanel = (props) => {
    const [userArr, setUserArr] = useState([]);
    // user : {name : string , age: number }

    const addUserHandler = (new_user) => {
        setUserArr((prev) => [...prev, new_user]);
    };

    const deleteUserHandler = (del_user) => {
        setUserArr((prev) => {
            const users = prev.filter(
                elem => !(elem.name === del_user.name
                    && elem.age === del_user.age)
            );
            return users;
        })
    };

    return (
        <div className={styles.panel}>
            <UserCreateForm
                onAdd={addUserHandler}
            />
            <UserList
                users={userArr}
                onDelete={deleteUserHandler}
            />
        </div>
    )


};

export default UserPanel;