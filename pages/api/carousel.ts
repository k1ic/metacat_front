// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '../../lib/api';

export default async (req, res) => {
  const data = await api.getCarouseList();

  res.statusCode = 200;

  res.json(data);
};
