import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function textToSpeech(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("req.method: ", req.method);
  if (req.method === "POST") {
    const { text, lang } = req.body;
    console.log("req.body: ", req.body);

    try {
      const options = {
        method: "GET",
        url: `${process.env.BASE_API_URL}/speak?text=${text}&lang=${lang}`,
        headers: {
          "X-RapidAPI-Key": `${process.env["X-RapidAPI-Key"]}`,
          "X-RapidAPI-Host": `${process.env["X-RapidAPI-Host"]}`,
        },
      };

      const ttsRes = await axios.request(options);
      console.log("ttsRes: ", ttsRes.data);
      res.status(200).json({
        data: ttsRes.data,
      });
    } catch (error) {
      console.log("error: ", error);
      res.status(400).json({ message: "Something went wrong", error });
    }
  }

  res.status(200).json({ name: "John Doe" });
}
