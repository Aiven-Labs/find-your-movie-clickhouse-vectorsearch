// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('dotenv').config();
import { createClient } from '@clickhouse/client'

const client = createClient({
  host: process.env.CLICKHOUSE_HOST,
  username: process.env.CLICKHOUSE_USER,
  password: process.env.CLICKHOUSE_PASSWORD,
})

const api_url = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-mpnet-base-v2";
const headers = {
  Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
};

async function getEmbedding(text) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
  };

  try {
    const response = await fetch(api_url, options);
    return await response.json();
  } catch (error) {
    throw new Error(`Request to get embedding ${text} failed: ${error}`);
  }
}

export default async function handler(req, res) {
  const searchPhraseEmbedding = await getEmbedding(req.body.search);
  const query = await client.query({
    query: `SELECT title, plot, year, director, wiki, L2Distance(embedding, [` + searchPhraseEmbedding.toString() + `]) AS score FROM movie_plots ORDER BY score ASC Limit 10`
  })
  const response = await query.json();
  res.status(200).json(response.data);
}


