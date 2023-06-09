import dotenv from 'dotenv'
dotenv.config()

const development = {
  dialect: 'mysql',
  host : process.env.DB_HOST,
  port: process.env.DB_PORT,
  username : process.env.USER_NAME,
  password : process.env.USER_PASSWD,
  database : process.env.DB_NAME
}

const production = {
  dialect: 'mysql',
  host : process.env.DB_HOST,
  port: process.env.DB_PORT,
  username : process.env.USER_NAME,
  password : process.env.USER_PASSWD,
  database : process.env.DB_NAME
}

const test = {
  dialect: 'mysql',
  host : process.env.DB_HOST,
  port: process.env.DB_PORT,
  username : process.env.USER_NAME,
  password : process.env.USER_PASSWD,
  database : process.env.DB_NAME
}

export default { development, production, test }