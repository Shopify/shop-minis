import { useState, useRef } from "react";
import {
  useNavigateWithTransition,
  VideoPlayer,
  Card,
  Button,
  Badge,
  Alert,
  Input,
  Touchable,
  Image,
} from "@shopify/shop-minis-react";

// Mock video data
const mockVideos = [
  {
    id: "1",
    title: "Product Demo Video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail:
      "https://placehold.co/800x450/4F46E5/ffffff?text=Product+Demo",
    duration: "9:56",
    description: "Watch how our product works in real-world scenarios",
  },
  {
    id: "2",
    title: "How It's Made",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail:
      "https://placehold.co/800x450/10B981/ffffff?text=How+Its+Made",
    duration: "10:53",
    description: "Behind the scenes of our manufacturing process",
  },
  {
    id: "3",
    title: "Customer Testimonial",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail:
      "https://placehold.co/800x450/DC2626/ffffff?text=Testimonial",
    duration: "0:15",
    description: "Hear what our customers have to say",
  },
  {
    id: "4",
    title: "Installation Guide",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail:
      "https://placehold.co/800x450/F59E0B/ffffff?text=Installation",
    duration: "0:15",
    description: "Step-by-step installation instructions",
  },
];

export function VideoPlayerTest() {
  const navigate = useNavigateWithTransition();
  const [currentVideo, setCurrentVideo] = useState(mockVideos[0]);
  const [autoplay, setAutoplay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const playerRef = useRef<any>(null);

  const handlePlayCustomUrl = () => {
    if (customUrl) {
      setCurrentVideo({
        id: "custom",
        title: "Custom Video",
        url: customUrl,
        thumbnail:
          "https://placehold.co/800x450/8B5CF6/ffffff?text=Custom",
        duration: "Unknown",
        description: "User provided video URL",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <Touchable
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg"
            style={{ minHeight: "48px", minWidth: "48px" }}
          >
            <span className="text-xl">←</span>
          </Touchable>
          <div className="flex-1 ml-2">
            <h1 className="text-lg font-bold text-gray-900">
              VideoPlayer Component
            </h1>
            <p className="text-xs text-gray-600">
              Video playback with SDK component
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Main Video Player */}
        <div className="bg-black">
          <div className="aspect-video relative w-full h-full">
            <VideoPlayer
              ref={playerRef}
              src={currentVideo.url}
              poster={currentVideo.thumbnail}
              autoplay={autoplay}
              muted={muted}
              onPlay={() => console.log("Video playing")}
              onPause={() => console.log("Video paused")}
              onEnded={() => console.log("Video ended")}
              onReady={() => console.log("Video ready")}
            />
          </div>
        </div>

        {/* Current Video Info */}
        <div className="p-4 bg-white border-b">
          <h3 className="font-semibold text-gray-900">{currentVideo.title}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {currentVideo.description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="secondary">{currentVideo.duration}</Badge>
            <Badge variant="outline">ID: {currentVideo.id}</Badge>
          </div>
        </div>

        {/* Player Controls */}
        <div className="p-4 bg-white border-b space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">Player Settings</h3>

          {/* Autoplay, Muted, Loop */}
          <div className="flex gap-2">
            <Button
              onClick={() => setAutoplay(!autoplay)}
              variant={autoplay ? "default" : "secondary"}
              size="sm"
            >
              {autoplay ? "✓ Autoplay" : "Autoplay"}
            </Button>
            <Button
              onClick={() => setMuted(!muted)}
              variant={muted ? "default" : "secondary"}
              size="sm"
            >
              {muted ? "🔇 Muted" : "🔊 Sound"}
            </Button>
          </div>

          {/* Custom URL */}
          <div className="flex gap-2">
            <Input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter custom video URL..."
              className="flex-1"
            />
            <Button onClick={handlePlayCustomUrl} variant="default">
              Play URL
            </Button>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900">Video Playlist</h3>
          {mockVideos.map((video) => (
            <Card
              key={video.id}
              className={`p-3 cursor-pointer ${
                currentVideo.id === video.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setCurrentVideo(video)}
            >
              <div className="flex gap-3">
                <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full"
                    aspectRatio="auto"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {video.description}
                  </p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {video.duration}
                  </Badge>
                </div>
                {currentVideo.id === video.id && (
                  <div className="flex items-center">
                    <Badge variant="primary">▶ Playing</Badge>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Features & Info */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              VideoPlayer Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Native video controls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Fullscreen support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Poster image support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Playback speed control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Autoplay & loop options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Event callbacks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Mobile optimized</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Picture-in-picture support</span>
              </li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { VideoPlayer } from '@shopify/shop-minis-react'

function ProductVideo({ product }) {
  const [playing, setPlaying] = useState(false)

  return (
    <VideoPlayer
      src={product.videoUrl}
      poster={product.thumbnailUrl}
      autoplay={false}
      muted={false}
      loop={false}
      controls={true}
      playbackRate={1}
      className="w-full rounded-lg"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => console.log('Video finished')}
      onError={(e) => console.error('Video error', e)}
      onLoadedMetadata={(meta) => console.log('Duration:', meta.duration)}
      onTimeUpdate={(time) => console.log('Current time:', time)}
    />
  )
}

// VideoPlayer supports:
// - MP4, WebM, and other HTML5 video formats
// - Streaming video URLs
// - Progressive download
// - Adaptive bitrate streaming (HLS/DASH)`}
            </pre>
          </Card>

          <Alert className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">ℹ️</span>
              <div>
                <p className="font-medium text-blue-900">Video Requirements</p>
                <p className="text-sm text-blue-700 mt-1">
                  Videos should be optimized for mobile playback. Recommended:
                  MP4 format, H.264 codec, max 1080p resolution, under 50MB for
                  best performance.
                </p>
              </div>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
}
