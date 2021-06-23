import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "../../prismic";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Document[]>
) {
  const client = Client();
  const queryResult = await client.query([
    Prismic.Predicates.at("document.type", "movie"),
  ]);
  res.status(200).json(queryResult.results);
}
