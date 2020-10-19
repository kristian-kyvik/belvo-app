import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import fiscalMockData from '../../mocks/fiscal.js';

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
    const { link } = req.query
    //const invoices = await client.invoices.list(link)
    res.json(fiscalMockData.invoices);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({
      message: error.message
    });
  }
}
