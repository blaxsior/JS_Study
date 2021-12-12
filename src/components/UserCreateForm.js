import { useRef } from 'react';
import styles from './UserCreateForm.module.css';

const UserCreateForm = (props) => {
    const nameRef = useRef();
    const ageRef = useRef();

    console.log(nameRef);

    const sublitHandler = (event) => {
        event.preventDefault();
        if (nameRef.current.value !== '' && ageRef.current.value !== '') {
            props.onAdd({ name: nameRef.current.value, age: ageRef.current.value });
            nameRef.current.value = '';
            ageRef.current.value = 0;
        }
    };

    return (
        <form
            onSubmit={sublitHandler}
            className={styles.form}>
            <div>
                <label htmlFor='name'>name</label>
                <input
                    id="name"
                    type='text'
                    ref={nameRef}
                    defaultValue=''
                />
            </div>
            <div>
                <label htmlFor='age'>age</label>
                <input
                    id="age"
                    type='number'
                    min='0'
                    step='1'
                    ref={ageRef}
                    defaultValue='0'
                />
            </div>
            <button>Add</button>
        </form>
    )
}

export default UserCreateForm;