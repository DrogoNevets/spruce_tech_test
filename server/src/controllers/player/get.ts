import { Request, Response } from "express";
import db from '../../services/db';

export default async (req: Request, res: Response) => {
  const { player } = req.params;
  try {
    const rows = await db.getPlayer(player);

    if(!rows) {
      return res.status(404).end();
    }

    res.json(rows);
  } catch(e) {
    res.status(500).send(e);
  } finally {
    res.end();
  }
}