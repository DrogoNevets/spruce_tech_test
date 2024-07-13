import { Request, Response } from "express";
import db from '../../services/db';

export default async (_: Request, res: Response) => {
  try {
    const rows = await db.getAll();

    res.json(rows);
  } catch(e) {
    res.status(500).send(e);
  } finally {
    res.end();
  }
}