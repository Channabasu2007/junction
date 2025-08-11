import Link from 'next/link';
import React from 'react'

const VideoEmbedding = ({ user }) => {



  return (
    <div className="w-[90%] mx-auto py-6 mt-2 space-y-10 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">Add Your Intro or Any Video</h1>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/EWRBHho2b_E?si=LM3Th2hyYDYMyL--" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    
    </div>
  )
}

export default VideoEmbedding