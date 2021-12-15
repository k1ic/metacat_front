// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req, res) => {
  const { cursor, count } = req.query;
  const data = await api.getDCLEventList(cursor, count);

  res.statusCode = 200;

  res.json(data);
};
