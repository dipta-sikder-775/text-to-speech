import { languages } from "@/data/languages";
import axios from "axios";
import React, { useState } from "react";

const TTSOnline = () => {
  const [lang, setLang] = useState("en");
  const [text, setText] = useState(
    // "Lorem data hello world. Lorem Ipsum Dolar sit emmit."
    "Data"
  );
  const [audioRes, setAudioRes] = useState("");
  console.log("audioRes: ",audioRes)

  const onTranslation = async ({
    lang,
    text,
  }: {
    text: string;
    lang: string;
  }) => {
    const translationRes = await axios.post(
      `/api/translation`,
      {
        text,
        lang,
      }
      // ,
      // {
      //   headers: {
      //     "Content-Type": "audio/mpeg",
      //   },
      // }
    );

    // const audioBytes = new Uint8Array(
    //   Buffer.from(translationRes?.data?.data, "base64")
    // );
    // console.log("audioBytes: ", audioBytes);
    const blob = new Blob([translationRes?.data?.data], { type: "audio/mpeg" });
    console.log("blob: ", blob);

    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = (res) => {
      const base64data = res.target?.result;
      console.log("generated base64: ", base64data);
      setAudioRes(base64data as any);
    };
  };

  return (
    <div>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
        onChange={(e) => setLang(e.target.value)}
        defaultValue={lang}
      >
        <option disabled>Choose language</option>

        {languages?.map((lng, i) => (
          <option key={i} value={lng["Code 2"]}>
            {lng["English name"]}
          </option>
        ))}
      </select>

      <textarea
        onChange={(e) => setText(e.target.value)}
        className="bg-[#FAFAFA] w-full mt-10 placeholder-primary p-4 xl:p-6 text-primary focus:outline-transparent hover-shadow !ring-0"
        rows={5}
        placeholder="Write here"
        value={text}
      />

      <div className="flex items-center justify-center gap-4 flex-wrap w-full">
        <button
          onClick={() => {
            onTranslation({ lang, text });
          }}
          className="btn-primary min-w-[10rem] max-w-48"
        >
          Play Audio
        </button>
      </div>

      <div>
        <audio
          controls
          src={audioRes}
          //   src="data:audio/mpeg;base64, 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"
        >
          Your browser does not support the<code>audio</code> element.
        </audio>
      </div>
    </div>
  );
};

export default TTSOnline;
