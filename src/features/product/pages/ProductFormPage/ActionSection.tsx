import styles from "./styles.module.css"
import SubmitButton from "../../../../components/SubmitButton"
export function ActionSection() {

    return (
        <SubmitButton className={styles.submit}>
            Create product
        </SubmitButton>
    )
}
