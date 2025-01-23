'use client';

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import ReactConfetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import 'kursor/dist/kursor.css';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowSize();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const Kursor = require('kursor');
    new Kursor({
      type: 2,
      removeDefaultCursor: true,
      color: 'rgba(255, 105, 180, 0.7)'
    });
  }, []);

  useEffect(() => {
    let confettiTimer: NodeJS.Timeout;
    if (showConfetti) {
      confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
    }
    return () => {
      if (confettiTimer) {
        clearTimeout(confettiTimer);
      }
    };
  }, [showConfetti]);

  const resetAll = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setRandomNumber(null);
    setShowConfetti(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setRandomNumber(null);
    } catch (error) {
      alert("There was an error uploading your image. Please try again.");
    }
  };

  const generateNumber = () => {
    setIsLoading(true);
    const delay = Math.floor(Math.random() * 6000) + 2000;
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100) + 1;
      setRandomNumber(number);
      setShowConfetti(true);
      setIsLoading(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {showWelcome && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-8 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center w-full max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 sm:mb-6">
              Welcome to GAYDAR
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">
              Upload a photo to check their gayness level!
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-medium bg-pink-600/80 hover:bg-pink-700/80 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          <ReactConfetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={5000}
            gravity={0.1}
            initialVelocityY={12}
            colors={['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493']}
          />
        </div>
      )}

      <main className="w-full max-w-2xl mx-4 flex flex-col items-center gap-6 sm:gap-10 rounded-3xl shadow-xl p-6 sm:p-10 border border-white/20">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">GAYDAR</h1>

        <div className="w-full sm:w-2/3">
          <label className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-4 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-black hover:bg-pink-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {selectedImage ? (
                <Image src={selectedImage} alt="Uploaded" width={200} height={200} className="object-contain h-32 sm:h-48" />
              ) : (
                <>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>

        <button
          onClick={generateNumber}
          disabled={!selectedImage || randomNumber !== null || isLoading}
          className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-full text-white font-medium transition-all duration-200 ${
            selectedImage && randomNumber === null && !isLoading
              ? 'bg-pink-600 hover:bg-pink-200 hover:scale-105'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
              <span className="text-sm sm:text-base">Analyzing...</span>
            </div>
          ) : randomNumber === null ? (
            'Check Gayness Level'
          ) : (
            'Level Generated'
          )}
        </button>

        {isLoading && (
          <div className="text-center animate-pulse">
            <p className="text-white text-base sm:text-lg">Our AI is analyzing the image...</p>
            <p className="text-pink-400 text-xs sm:text-sm mt-2">Please wait</p>
          </div>
        )}

        {randomNumber !== null && (
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white">GAYNESS LEVEL</h2>
            <p className="text-4xl sm:text-5xl font-bold text-pink-500 mt-2">{randomNumber}%</p>
            <button
              onClick={resetAll}
              className="mt-4 sm:mt-6 w-full sm:w-auto px-4 sm:px-6 py-3 rounded-full text-white font-medium bg-gray-600 hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
