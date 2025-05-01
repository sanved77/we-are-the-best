"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { basePath } = useRouter();
  const [partyMode, setPartyMode] = useState(false);

  useEffect(() => {
    if (!(audioRef.current instanceof HTMLAudioElement)) {
      return;
    }
    if (partyMode) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [partyMode]);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      {partyMode && (
        <div className="absolute w-full h-full">
          <Image
            src={`${basePath}/trance.gif`}
            alt="trance"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}
      <audio ref={audioRef} src={`${basePath}/best.m4a`} preload="auto" loop />
      <div className="relative w-[90vw] sm:w-[70vw] md:w-[60vw] aspect-square">
        <Image
          src={`${basePath}/bitch.png`}
          alt="bitch"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
        {partyMode && (
          <>
            <div className="absolute top-[36%] left-[22%] w-[70px] h-[70px] sm:w-[80px] md:w-[60px] z-10">
              <Image
                src={`${basePath}/spiral.png`}
                alt="left spiral eye"
                width={60}
                height={60}
                className="animate-spin"
              />
            </div>
            <div className="absolute top-[36%] right-[37%] w-[60px] h-[60px] z-10">
              <Image
                src={`${basePath}/spiral.png`}
                alt="right spiral eye"
                width={60}
                height={60}
                className="animate-spin"
              />
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => setPartyMode((prev) => !prev)}
        className="border-[8px] box-border block mt-12 p-6 text-[36px] rounded-xl text-white bg-[#ff4300] hover:bg-[#e03b00] active:scale-95 transition-transform duration-150 shadow-lg hover:shadow-xl z-5"
      >
        {partyMode ? "Stop" : "Party"}
      </button>
    </div>
  );
}
