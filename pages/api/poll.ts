// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMongoClient } from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question } = req.body
  let { answers } = req.body
  if (typeof answers === 'string') {
    answers = [answers]
  }
  const mongoClient = getMongoClient()
  await mongoClient.connect()
  const db = mongoClient.db('polls')
  const collection = db.collection('polls')
  await collection.insertOne({question, answers})
  mongoClient.close()
  res.redirect(307, '/polls/new')
}
