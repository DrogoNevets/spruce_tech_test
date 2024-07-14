import { Request, Response } from "express";
import db, { Result } from '../../services/db';

type WinBody = {
  win: true;
}

type LossBody = {
  loss: true;
}

type DrawBody = {
  draw: true;
}

type PostBody = {
  data: WinBody | LossBody | DrawBody;
}

export default async (req: Request, res: Response) => {
  const { player } = req.params;
  const { data } = req.body as PostBody;

  try {
    if('win' in data) {
      await db.registerResult(player, Result.WIN);
    }

    if('loss' in data) {
      await db.registerResult(player, Result.LOSS);
    }

    if('draw' in data) {
      await db.registerResult(player, Result.DRAW);
    }

    res.send('OK');
  } catch(e) {
    console.error(e);
    res.status(500).send(e);
  } finally {
    res.end();
  }
}