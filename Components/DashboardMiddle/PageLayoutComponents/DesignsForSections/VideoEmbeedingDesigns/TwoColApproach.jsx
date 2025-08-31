import React from "react";

const VideoSection = ({ user }) => {
  const primaryColor = user?.PageLayout?.ColorsPicker?.primary ?? "#2563eb";
  const secondaryColor = user?.PageLayout?.ColorsPicker?.secondary ?? "#9333ea";
  const paragraphColor = user?.PageLayout?.ColorsPicker?.paragraph ?? "#374151";

  const videoId = user?.videoId || "";

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Text Block */}
        <div className="space-y-6 text-center lg:text-left">
          <h1
            className="text-4xl font-extrabold tracking-tight leading-tight"
            style={{ color: primaryColor }}
          >
            Know About Me, By Me 
          </h1>
          <p
            className="text-lg max-w-lg mx-auto lg:mx-0"
            style={{ color: paragraphColor }}
          >
            Here’s a quick video where I share more about myself, my journey, 
            and what I’m passionate about.
          </p>
        </div>

        {/* Right Video Embed */}
        <div
          className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border"
          style={{ borderColor: secondaryColor }}
        >
          {videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              className="flex items-center justify-center h-full text-lg font-medium"
              style={{ color: paragraphColor }}
            >
              No video added yet 🎬
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
