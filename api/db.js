import mysql from 'mysql2'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sigmamale76",
    database: "blog"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("mysql database is Connected!");
  });