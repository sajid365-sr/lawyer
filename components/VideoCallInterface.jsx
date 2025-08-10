"use client";

import React, { useState, useEffect } from "react";
import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneXMarkIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function VideoCallInterface({
  videoCall,
  currentUser,
  otherParticipant,
  onEndCall,
  onToggleVideo,
  onToggleMute,
}) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    const timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    setTimeout(() => setConnectionStatus("connected"), 2000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    onToggleVideo();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    onToggleMute();
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-500";
      case "connecting":
        return "text-yellow-500";
      case "poor":
        return "text-orange-500";
      case "disconnected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{otherParticipant.name}</h2>
          <p className="text-sm text-gray-300">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${getConnectionStatusColor()}`}
            ></span>
            {connectionStatus === "connecting"
              ? "Connecting..."
              : connectionStatus === "connected"
              ? "Connected"
              : connectionStatus === "poor"
              ? "Poor Connection"
              : "Disconnected"}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-mono">
            {formatDuration(callDuration)}
          </span>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video area */}
      <div className="flex-1 relative bg-gray-900">
        <div className="w-full h-full relative">
          {connectionStatus === "connected" ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src={
                    otherParticipant.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      otherParticipant.name
                    )}&size=200&background=4F46E5&color=ffffff`
                  }
                  alt={otherParticipant.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <p className="text-white text-xl font-medium">
                  {otherParticipant.name}
                </p>
                <p className="text-gray-300">Video call in progress</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Connecting to {otherParticipant.name}...</p>
              </div>
            </div>
          )}

          {/* Self PIP */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-green-800 to-blue-800 flex items-center justify-center">
                <Image
                  src={
                    currentUser.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      currentUser.name
                    )}&size=100&background=059669&color=ffffff`
                  }
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <VideoCameraIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Chat panel */}
          {showChat && (
            <div className="absolute right-4 top-20 bottom-20 w-80 bg-white rounded-lg shadow-xl flex flex-col">
              <div className="p-4 border-b font-semibold text-gray-900">
                Chat
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {/* mock messages */}
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="font-medium text-gray-900 text-sm">
                    {otherParticipant.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Hello! Can you hear me clearly?
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 ml-8">
                  <p className="font-medium text-gray-900 text-sm">You</p>
                  <p className="text-sm text-gray-600">
                    Yes, audio and video are working perfectly!
                  </p>
                  <p className="text-xs text-gray-400 mt-1">1 minute ago</p>
                </div>
              </div>
              <div className="p-4 border-t flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex justify-center items-center space-x-6">
          <button
            onClick={handleToggleMute}
            className={`p-4 rounded-full ${
              isMuted
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            <MicrophoneIcon
              className={`w-6 h-6 text-white ${isMuted ? "opacity-50" : ""}`}
            />
          </button>
          <button
            onClick={handleToggleVideo}
            className={`p-4 rounded-full ${
              !isVideoOn
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            <VideoCameraIcon
              className={`w-6 h-6 text-white ${!isVideoOn ? "opacity-50" : ""}`}
            />
          </button>
          <button
            onClick={onEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 rounded-full"
          >
            <PhoneXMarkIcon className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-4 rounded-full ${
              !isSpeakerOn
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {isSpeakerOn ? (
              <SpeakerWaveIcon className="w-6 h-6 text-white" />
            ) : (
              <SpeakerXMarkIcon className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-4 rounded-full ${
              showChat
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>Call ID: {videoCall.roomId}</p>
          <p>Quality: HD • Encrypted</p>
        </div>
      </div>
    </div>
  );
}
