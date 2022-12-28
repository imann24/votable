import { ObjectId } from 'mongodb'
import { getMongoClient } from '../../lib/mongodb'
import { Poll } from '../../lib/poll'

interface SinglePollProps {
    poll: Poll
}

// TODO: actually display a question:
const Post = ({poll}: SinglePollProps) => {
    return (
        <>
            {JSON.stringify(poll)}
        </>
    )
}

export default Post


// This gets called on every request
export async function getServerSideProps({query}: any) {
    const { id } = query
    console.log(id)
    // Fetch data from external API
    const client = getMongoClient()
    await client.connect()
    const collection = client.db('polls').collection('polls')
    const pollsQuery = await collection.find({_id: new ObjectId(id)})
    const polls = await pollsQuery.toArray()
    console.log(polls)
    const poll = polls[0]
    // not JSON serializable:
    poll._id = poll._id.toString()
    client.close()
    // Pass data to the page via props
    return { props: { poll } }
}
