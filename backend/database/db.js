//const {Pool} = require('pg');
import  pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "projectone"
});

export default pool;