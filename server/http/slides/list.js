import Slide from '../../models/Slide';
import Response from '../../response';

export default async (req, res) => {
  const slides = await Slide.find({}).populate('icon');
  const response = new Response(slides);
  res.send(response);
};
