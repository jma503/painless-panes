import React from "react";
import Webcam from "react-webcam";
import Button from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";
import actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

export default function AddWindowImage() {
  const dispatch = useDispatch();
  // file upload states
  const [imgSrc, setImgSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageList, setImageList] = useState([]);
  const project = useSelector((store) => store.project);
  const user = useSelector((store) => store.user);
  const currentWindowId = useSelector((store) => store.currentWindowId);

  // handles sending the image capture to AWS in base64
  const sendPhotoToServer = (event) => {
    event.preventDefault();
    // console.log(imgSrc);

    // when a photo is submitted, the server adds a window to the current project
    // it then sets the current window ID in the redux store, and also
    // dispatches a POST request to upload the photo to S3
    const formData = new FormData();
    formData.append("image", imgSrc);
    formData.append("project_id", project.id);
    formData.append("current_window_id", Number(currentWindowId));
    // console.log("FORMDATA", [...formData.entries()]);
    dispatch(actions.addWindow(formData));
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  // inits the webcam
  const webcamRef = React.useRef(null);

  // Function to convert a data URI to a Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  // event handler for taking a picture and updating the imgSrc state to the
  // base64 value of the image
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    const imageBlob = dataURItoBlob(imageSrc);
    // sets the image source state to the base64 encoding of the image
    setImgSrc(imageBlob);
  }, [webcamRef, setImgSrc]);

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
      {preview && <img src={preview} />}
      <Button onClick={capture} text="Capture Image">
        {" "}
      </Button>
      <Button onClick={sendPhotoToServer} text="Submit">
        {" "}
      </Button>
      <Button
        onClick={() => {
          console.log(imageList);
        }}
        text="Click for imageList"
      ></Button>
      {/* {imageList.map((image) => (
        <div>
          <img src={`https://painless-panes.s3.amazonaws.com/${image.Key}`} />
        </div>
      ))} */}
    </>
  );
}
