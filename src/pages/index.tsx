/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import axios from "axios";
import { Inter } from "next/font/google";
import Link from "next/link";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { languages } from "@/data/languages";
import TextToSpeech from "@/components/TTSOffline";
import TTSOnline from "@/components/TTSOnline";

export default function Home() {
  const [tab, setTab] = useState<"Offline" | "Online">("Offline");
  const audioRef = useRef(null);
  const [lang, setLang] = useState("en");
  const [text, setText] = useState(
    // "Lorem data hello world. Lorem Ipsum Dolar sit emmit."
    "Data"
  );
  const [audioRes, setAudioRes] = useState("");
  const onTranslation = async ({
    text,
    lang,
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
    // let audioBuffer = await decode(translationRes?.data);
    // await decoders.mp3(); // load & compile decoder
    // const audioBuffer = await decoders.mp3(translationRes?.data); // decode
    // console.log("audioBuffer: ", audioBuffer);
    // playBase64Audio(translationRes?.data);

    // const blob = new Blob([new Uint8Array(translationRes?.data?.data)], {
    //   type: "audio/wav",
    // }); // Adjust the MIME type as per your audio format
    // console.log("blob: ", blob);
    // const audioUrl = URL.createObjectURL(blob);
    // console.log("audioUrl: ", audioUrl);

    //
    const audioBytes = new Uint8Array(
      Buffer.from(translationRes?.data?.data, "base64")
    );
    console.log("audioBytes: ", audioBytes);
    // Create a Blob from the audio bytes
    // const blob = new Blob([audioBytes], { type: "audio/mpeg" }); // Change 'audio/wav' to the correct MIME type
    const blob = new Blob([audioBytes], { type: "audio/mpeg" }); // Change 'audio/wav' to the correct MIME type
    console.log("blob: ", blob);

    /*  */
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      var base64data = reader.result;
      //  data:audio/mpeg;base64,DH0PplLTZfHH
      setAudioRes(URL.createObjectURL(base64data as any));
      //log of base64data is "data:audio/ogg; codecs=opus;base64,GkX..."
    };
    /*  */
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    console.log("url: ", url);
    // const audio = new Audio();
    // audio.src = url;
    // audio.controls;
    // audio.canPlayType("audio/mpeg");
    // audio.play();
    // setAudioRes(translationRes?.data?.data);
    // setAudioRes(url);
  };

  console.log("audioRes: ", audioRes);

  // const [mediaSource, setMediaSource] = useState<MediaSource | null>(null);
  // useEffect(() => {
  //   const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
  //   const streamUrl = 'your-api-endpoint-url';

  //   fetch(streamUrl)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const newMediaSource = new MediaSource();
  //       audioPlayer.src = URL.createObjectURL(newMediaSource);
  //       setMediaSource(newMediaSource);

  //       newMediaSource.addEventListener('sourceopen', () => {
  //         const sourceBuffer = newMediaSource.addSourceBuffer('audio/mpeg');
  //         sourceBuffer.addEventListener('updateend', () => {
  //           newMediaSource.endOfStream();
  //           audioPlayer.play();
  //         });
  //         sourceBuffer.appendBuffer(blob);
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     URL.revokeObjectURL(audioUrl);
  //   };
  // }, []);

  return (
    <>
      <main>
        <section className="page-header">
          <h1 className="page-header__title">Text to audio</h1>
        </section>

        <div className="mb-4 border-b border-gray-200">
          <ul className="flex justify-center flex-wrap -mb-px text-sm font-medium text-center">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-800 hover:border-gray-300 ${
                  tab === "Offline" && "text-blue-800 border-gray-300"
                }`}
                onClick={() => setTab("Offline")}
              >
                Offline
              </button>
            </li>

            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-800 hover:border-gray-300  ${
                  tab === "Online" && "text-blue-800 border-gray-300"
                }`}
                onClick={() => setTab("Online")}
              >
                Online
              </button>
            </li>
          </ul>
        </div>

        <div className="p-6">
          {tab === "Offline" ? <TextToSpeech /> : <TTSOnline />}
        </div>
      </main>
    </>
  );
}
