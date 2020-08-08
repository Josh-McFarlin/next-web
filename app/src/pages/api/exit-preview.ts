import { NextApiRequest, NextApiResponse } from "next";

// @route   GET api/exit-preview
// @desc    Exit Sanity preview mode
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();

  res.writeHead(307, {
    Location: "/",
  });
  res.end();
};
