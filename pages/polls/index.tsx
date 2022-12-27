import { Poll } from '../../lib/poll'
import { getMongoClient } from '../../lib/mongodb'

interface PollProps {
    polls: Array<Poll>
}

export default function Polls({ polls }: PollProps) {
    return (
        <>
            <main>
                <h1>Polls</h1>
                {polls.map((p) => {
                    return (
                        <div>
                            {p.question}
                        </div>
                    )
                })}
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
        delete p._id
    }
    client.close()
    // Pass data to the page via props
    return { props: { polls } }
  }
