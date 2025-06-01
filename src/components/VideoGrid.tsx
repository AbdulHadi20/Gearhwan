'use client'

import { HeroVideoDialog } from "./Video"

interface VideoItem {
  title: string
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt: string
}

const videos: VideoItem[] = [
  {
    title: "How to buy your new car",
    videoSrc: "https://www.youtube.com/embed/8vavYQiSWcI?si=6KA-qw8vn8xFStY8",
    thumbnailSrc: "https://img.youtube.com/vi/8vavYQiSWcI/maxresdefault.jpg",
    thumbnailAlt: "Video 1 Thumbnail"
  },
  {
    title: "Electric Car vs Petrol Car",
    videoSrc: "https://www.youtube.com/embed/SzZYRFZUbn0?si=vrIfMRIqYLGkK9fC",
    thumbnailSrc: "https://img.youtube.com/vi/SzZYRFZUbn0/maxresdefault.jpg",
    thumbnailAlt: "Video 2 Thumbnail"
  },
  {
    title: "How to make you car last longer",
    videoSrc: "https://www.youtube.com/embed/Y3jcQCdeJAs?si=1ZUKCQ7EsHBDBqj9",
    thumbnailSrc: "https://img.youtube.com/vi/Y3jcQCdeJAs/maxresdefault.jpg",
    thumbnailAlt: "Video 3 Thumbnail"
  },
  {
    title: "How to decide which car to buy",
    videoSrc: "https://www.youtube.com/embed/e9IjCGB1WnQ?si=xJgIyUZcqYV4EvuP",
    thumbnailSrc: "https://img.youtube.com/vi/e9IjCGB1WnQ/maxresdefault.jpg",
    thumbnailAlt: "Video 4 Thumbnail"
  },
  {
    title: "Don't Buy a Car Until You Watch THIS Video",
    videoSrc: "https://www.youtube.com/embed/Ssl8QQTFAg4?si=UaJYeJnASTMr7XMJ",
    thumbnailSrc: "https://img.youtube.com/vi/Ssl8QQTFAg4/maxresdefault.jpg",
    thumbnailAlt: "Video 5 Thumbnail"
  },
  {
    title: "Manual vs Automatic",
    videoSrc: "https://www.youtube.com/embed/5aImmaTUgOA?si=rYG_SlodtsnvJgx-",
    thumbnailSrc: "https://img.youtube.com/vi/5aImmaTUgOA/maxresdefault.jpg",
    thumbnailAlt: "Video 6 Thumbnail"
  },
  {
    title: "BEST USED 4WDS UNDER $10k, $20k, $30k + ones to avoid in 2025!",
    videoSrc: "https://www.youtube.com/embed/G88P4R1SVyE?si=L2YQpKOdOmGfwwPz",
    thumbnailSrc: "https://img.youtube.com/vi/G88P4R1SVyE/maxresdefault.jpg",
    thumbnailAlt: "Video 7 Thumbnail"
  },
  {
    title: "How to change Engine Oil",
    videoSrc: "https://www.youtube.com/embed/O1hF25Cowv8?si=93NA2gInOLrH0l4l",
    thumbnailSrc: "https://img.youtube.com/vi/O1hF25Cowv8/maxresdefault.jpg",
    thumbnailAlt: "Video 8 Thumbnail"
  },
  {
    title: "Car Maintenance: 10 Things Every Car Owner Should Know - The Short List",
    videoSrc: "https://www.youtube.com/embed/BjX79GsALd8?si=9f8OdArNq2nO_Eps",
    thumbnailSrc: "https://img.youtube.com/vi/BjX79GsALd8/maxresdefault.jpg",
    thumbnailAlt: "Video 9 Thumbnail"
  },
  {
    title: "This is EVERYTHING YOU NEED to Know About Cars",
    videoSrc: "https://www.youtube.com/embed/9ngnCrBKWZA?si=WG-ydVKnzdlnBl5_",
    thumbnailSrc: "https://img.youtube.com/vi/9ngnCrBKWZA/maxresdefault.jpg",
    thumbnailAlt: "Video 10 Thumbnail"
  },
  {
    title: "Should You Buy a SEDAN or an SUV? (Animated)",
    videoSrc: "https://www.youtube.com/embed/4iCGGRa5TIU?si=WYPqpJObmdqPMMu4",
    thumbnailSrc: "https://img.youtube.com/vi/4iCGGRa5TIU/maxresdefault.jpg",
    thumbnailAlt: "Video 11 Thumbnail"
  },
  {
    title: "Quickfire Hot Hatch Buying Guide: GR Yaris, Civic Type R, AMG A45 S, Fiesta ST, Golf GTI | Top Gear",
    videoSrc: "https://www.youtube.com/embed/fM0iIe08ea4?si=rpMUihWD9hIqPklY",
    thumbnailSrc: "https://img.youtube.com/vi/fM0iIe08ea4/maxresdefault.jpg",
    thumbnailAlt: "Video 12 Thumbnail"
  }
]

export function VideoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <HeroVideoDialog
          key={index}
          animationStyle="from-center"
          videoSrc={video.videoSrc}
          thumbnailSrc={video.thumbnailSrc}
          thumbnailAlt={video.thumbnailAlt}
          className="aspect-video"
        />
      ))}
    </div>
  )
}