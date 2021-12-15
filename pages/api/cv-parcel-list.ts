// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req, res) => {
  const { page, count, query, type } = req.query;
  const data = await api.getCVParcelList(page, count, query, type);

  res.statusCode = 200;

  res.json(data);
};
