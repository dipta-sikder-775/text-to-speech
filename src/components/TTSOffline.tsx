import React, { useState, useEffect } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  const [languageOptions, setLanguageOptions] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[0]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else if (utterance) {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const handleVoiceChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value) ?? null);
  };

  const handlePitchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setVolume(parseFloat(event.target.value));
  };

  useEffect(() => {
    if (window) {
      const a = window?.speechSynthesis?.getVoices();
      setLanguageOptions(a);
    }
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor="languages"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a language
        </label>

        <select
          id="languages"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
          value={voice?.name}
          onChange={handleVoiceChange}
          defaultValue={voice?.lang}
        >
          <option disabled>Choose language</option>

          {languageOptions?.map((voice, id) => (
            <option key={id} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="textarea"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a language
        </label>

        <textarea
          id="textarea"
          onChange={(e) => setText(e.target.value)}
          className="bg-[#FAFAFA] w-full placeholder-primary p-4 xl:p-6 text-primary focus:outline-transparent hover-shadow !ring-0"
          rows={5}
          placeholder="Write here"
          value={text}
        />
      </div>

      <div className=" flex justify-between mx-auto container max-w-3xl flex-wrap">
        <label>
          Pitch:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={handlePitchChange}
          />
        </label>

        <label>
          Speed:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={handleRateChange}
          />
        </label>

        <label>
          Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </label>
      </div>

      <div className="flex max-w-xs justify-between mx-auto">
        <button
          onClick={handlePlay}
          type="button"
          className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
        >
          {isPaused ? "Resume" : "Play"}
        </button>

        <button
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={handlePause}
        >
          Pause
        </button>

        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
