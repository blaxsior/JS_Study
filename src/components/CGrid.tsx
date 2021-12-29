import CharacterInfo from "../interface/character-info";
import styles from "./CGrid.module.css";
import CInfoBox from "./CInfoBox";

const CGrid = ({ characters }: { characters: CharacterInfo[] }) => {
    return (
        <div className={styles.grid}>
            {characters.length > 0 &&
                characters.map(
                    ch => (
                        <CInfoBox character={ch} />
                    ))
            }
        </div>
    )
}

export default CGrid;