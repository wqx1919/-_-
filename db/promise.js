
const db = require('./index')
const sqlQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          if (values) {
            connection.query(sql, values, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
              connection.release();
            });
          } else {
            connection.query(sql, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
              connection.release();
            });
          }
        }
      });
    });
  };
  module.exports = sqlQuery