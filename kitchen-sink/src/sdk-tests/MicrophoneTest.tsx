import { useState, useRef, useEffect } from "react";
import {
  useNavigateWithTransition,
  useRequestPermissions,
  Card,
  Button,
  Alert,
  Touchable,
} from "@shopify/shop-minis-react";

export function MicrophoneTest() {
  const navigate = useNavigateWithTransition();
  const { requestPermission } = useRequestPermissions();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      setError(null);
      setRecordingUrl(null);
      audioChunksRef.current = [];

      // Request permission
      const response = await requestPermission({ permission: 'MICROPHONE' });
      if (!response.granted) {
        setError(response.errorMessage || "Microphone permission denied");
        return;
      }

      // Get microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        const url = URL.createObjectURL(audioBlob);
        setRecordingUrl(url);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      setError(err.message || "Failed to start recording");
      setIsRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Clear recording
  const clearRecording = () => {
    if (recordingUrl) {
      URL.revokeObjectURL(recordingUrl);
      setRecordingUrl(null);
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
            <h1 className="text-lg font-bold text-gray-900">Microphone Access</h1>
            <p className="text-xs text-gray-600">Record audio using microphone</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <p className="text-sm">{error}</p>
          </Alert>
        )}

        {/* Recording Control */}
        <Card className="p-4">
          <div className="text-center">
            <span className="text-6xl">{isRecording ? "🔴" : "🎤"}</span>
            <h3 className="font-semibold text-gray-900 mt-3 mb-2">
              {isRecording ? "Recording..." : "Audio Recorder"}
            </h3>
            
            {isRecording ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  <span className="font-mono font-semibold text-lg">
                    {formatDuration(recordingDuration)}
                  </span>
                </div>
                <Button onClick={stopRecording} variant="destructive" className="w-full">
                  ⏹️ Stop Recording
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Record audio from your microphone
                </p>
                <Button onClick={startRecording} variant="default" className="w-full">
                  🔴 Start Recording
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Playback */}
        {recordingUrl && !isRecording && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Your Recording</h3>
            <audio src={recordingUrl} controls className="w-full mb-3" />
            <Button onClick={clearRecording} variant="outline" className="w-full">
              🗑️ Clear Recording
            </Button>
          </Card>
        )}

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useRequestPermissions } from '@shopify/shop-minis-react'

const { requestPermission } = useRequestPermissions()

// Request microphone permission
const response = await requestPermission({ 
  permission: 'MICROPHONE' 
})

if (response.granted) {
  // Get microphone stream
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true
  })
  
  // Create recorder
  const mediaRecorder = new MediaRecorder(stream)
  const chunks = []
  
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data)
  }
  
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { 
      type: mediaRecorder.mimeType 
    })
    const url = URL.createObjectURL(blob)
    // Play or save the recording
  }
  
  mediaRecorder.start()
}`}
          </pre>
        </Card>

        {/* Setup Info */}
        <Alert className="bg-blue-50 border-blue-200">
          <div className="flex gap-2">
            <span>ℹ️</span>
            <div className="text-sm text-blue-900">
              <p className="font-semibold">Setup Required</p>
              <p className="mt-1">
                Add <code className="bg-blue-100 px-1 rounded">MICROPHONE</code> to 
                your <code className="bg-blue-100 px-1 rounded">manifest.json</code> permissions 
                array, then call <code className="bg-blue-100 px-1 rounded">requestPermission()</code> before 
                accessing the microphone.
              </p>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
}
