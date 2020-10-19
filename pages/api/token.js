import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
var belvo = require('belvo').default;

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

var client = new belvo(
  process.env.SECRET_ID,
  process.env.SECRET_PASSWORD,
  process.env.BASE_URL,
);

export default async function handler(req, res) {
  await cors(req, res)  
  await client.connect()

  try {
    await client.connect() 
    const token = await client.widgetToken.create();
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
}




