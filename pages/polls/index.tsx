import { Poll } from '../../lib/poll'
import { getMongoClient } from '../../lib/mongodb'
import styles from '../../styles/Poll.List.module.css'

interface PollProps {
    polls: Array<Poll>
}

export default function Polls({ polls }: PollProps) {
    return (
        <>
            <main className={styles.main}>
                <h1>Polls</h1>
                <div className={styles.questionBlockContainer}>
                    {polls.map((p) => {
                        return (
                            <a className={styles.questionBlock} href={`/polls/${p._id}`}>
                                {p.question}
                            </a>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const client = getMongoClient()
    await client.connect()
    const collection = client.db('polls').collection('polls')
    const pollsQuery = await collection.find({})
    const polls = await pollsQuery.toArray()
    for (const p of polls) {
        // not JSON serializable:
        p._id = p._id.toString()
    }
    client.close()
    // Pass data to the page via props
    return { props: { polls } }
  }
