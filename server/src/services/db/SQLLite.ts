import sqlite3 from "sqlite3";
import { Result, TicTacToeDB, TicTacToeRow } from ".";

class SQLLiteDB implements TicTacToeDB {
  private _db;

  constructor() {
    this._db = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        console.error("Error connecting to database", err);
      } else {
        console.log("Connected to database");
      }
    });
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._db.run(
        `CREATE TABLE data(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          player TEXT,
          wins INTEGER,
          losses INTEGER,
          draws INTEGER
      )`, (err) => {
          if (err) {
            console.error("Error creating table", err);
            return reject(false);
          } 
          
          console.log("Created table");
          // Initialise data
          this._db.run(
            "INSERT INTO data(player, wins, losses, draws) VALUES('X', 0, 0, 0)",
            (err) => {
              if (err) {
                console.error("Error inserting data", err);
              }
            }
          );
          
          this._db.run(
            "INSERT INTO data(player, wins, losses, draws) VALUES('O', 0, 0, 0)",
            (err) => {
              if (err) {
                console.error("Error inserting data", err);
              }
            }
          );
        }
      );

      return resolve(true);
    });
  }

  getAll() {
    return new Promise<TicTacToeRow[]>((resolve, reject) => {
      this._db.all("SELECT * FROM data", (err, rows:TicTacToeRow[]) => {
        if (err) {
          console.error("Error getting data", err);
          return reject(err);
        } 
          
        resolve(rows);
      });
    });
  }

  getPlayer(player: string) {
    return new Promise<TicTacToeRow[] | undefined>((resolve, reject) => {
      this._db.all("SELECT * FROM data WHERE player = ?", player, (err, rows:TicTacToeRow[] | undefined) => {
        if (err) {
          console.error("Error getting data", err);
          return reject(err);
        } 
          
        resolve(rows);
      });
    });
  }

  registerResult(player: string, result: Result) {
    return new Promise<boolean>((resolve, reject) => {
      let col = 'draws';

      switch(result) {
        case Result.WIN:
          col = 'wins'
          break;
        case Result.LOSS:
          col = 'losses';
          break;
      }

      this._db.run(`UPDATE data SET ${col} = ${col} + 1 WHERE player = ?`, player, (err) => {
        if(err) {
          return reject(err);
        }
      })

      resolve(true);
    });
  };
}

export default new SQLLiteDB();