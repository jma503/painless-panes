import React from "react";
import Webcam from "react-webcam";
import Button from "./Button";

export default function AddWindowImage() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
    }, [webcamRef]);
    return (
      <>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <Button onClick={capture} text= "Capture Image"> </Button>
      </>
    );
  }
}
