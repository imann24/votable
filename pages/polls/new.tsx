import { useState } from 'react'
import styles from '../../styles/Poll.New.module.css'

export default function NewPolls () {
    const AnswerBlock = <input type="text" className={styles.formRow} name="answers[]"></input>
    const [answerInputs, setAnswerInputs] = useState([AnswerBlock])

    return (
        <>
            <main className={styles.main}>
                <h1>New Poll</h1>
                <form className={styles.formContainer} action='/api/form'>
                    <label className={styles.formRow} htmlFor="question">Question</label>
                    <input className={styles.formRow} type="text" name="question"></input>

                    <label className={styles.formRow} htmlFor="answers">Answers</label>
                    {answerInputs}
                    <button className={styles.formRow} onClick={(e) => {
                        setAnswerInputs([...answerInputs, AnswerBlock])
                        e.preventDefault()
                    }}>Add Answer</button>
                    <button>Submit</button>
                </form>
            </main>
        </>
    )
}
