import React from "react";
import CharacterInfo from "../interface/character-info";
import styles from './CInfoBox.module.css';

const CInfoBox = ({character} : {character: CharacterInfo}) => {

    return (
        <div className={styles["box"]}>
            <div>{character.name}</div>
            <div>{character.constellation}</div>
            <div>{character.nation}</div>
        </div>
    )
}

export default React.memo(CInfoBox);