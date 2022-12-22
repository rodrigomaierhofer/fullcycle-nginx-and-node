var mysql      = require('mysql2/promise');

class MySqlClient {

  constructor(){
    this.connection = null
  }
  
  async connect(){
    this.connection = await mysql.createConnection({
      host     : process.env.MYSQL_HOST,
      user     : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE
    });
    await this.connection.connect();
    await this.connection.query(`CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`)
  }
}

module.exports = new MySqlClient