import {Pool} from 'pg';

var conn;

if (!conn){
    conn = new Pool({
        host: "localhost",
        user: "postgres",
        password: "password",
        database: "rpcdb",
        port: "5432"
    })
}

export {conn};