import Slide from '../../models/Slide';
import Attachment from '../../models/Attachment';
import Response from '../../response';

export default async (req, res) => {
  const { title, parent, icon, content, internalIdent } = req.body;

  // try find parent slide
  const docParent = parent
    ? await Slide.findById({ _id: parent })
    : null;

  // try find icon
  const docIcon = icon
    ? await Attachment.findById({ _id: icon })
    : null;

  const slide = new Slide({
    title,
    parent: docParent,
    icon: docIcon,
    // todo purify
    content,
    internalIdent,
  });

  try {
    await slide.save();
    res.send(new Response(slide));
  } catch (err) {
    res.send(new Response(err));
  }
};
