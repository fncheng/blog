## 如何开启和关闭摄像头-MediaDevices

**`MediaDevices`** 接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。

使用navigator.mediaDevices.getUserMedia

```tsx
import { useRef } from "react";
import Button from "./Button";
import "./styles.css";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  let stream: MediaStream;

  const handleClick = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCloseVideo = () => {
    stream.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="App">
      <Button text="点我" />
      <button onClick={handleClick}>开启摄像头</button>
      <button onClick={handleCloseVideo}>关闭摄像头</button>
      <video
        ref={videoRef}
        onLoadedMetadata={(e) => {
          videoRef.current?.play();
        }}
      ></video>
    </div>
  );
}
```

