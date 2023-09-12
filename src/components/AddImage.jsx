import React from "react";
import Webcam from "react-webcam";
import Button from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";
import actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { readAndCompressImage } from "browser-image-resizer";

export default function AddWindowImage() {
  const dispatch = useDispatch();
  // file upload states
  const [imgSrc, setImgSrc] = useState(null);
  const [imageList, setImageList] = useState([]);
  const project = useSelector((store) => store.project);
  const user = useSelector((store) => store.user);

  // handles sending the image capture to AWS in base64
  const sendPhotoToServer = (event) => {
    event.preventDefault();
    // when a photo is submitted, the server adds a window to the current project
    // it then sets the current window ID in the redux store, and also
    // dispatches a POST request to upload the photo to S3
    dispatch(actions.addWindow({ project_id: project.id, image: imgSrc }));
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  // inits the webcam
  const webcamRef = React.useRef(null);

  // event handler for taking a picture and updating the imgSrc state to the
  // base64 value of the image
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // sets the image source state to the base64 encoding of the image
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const getImages = () => {
    axios
      .get(`/api/window/upload/${user.id}`)
      .then((response) => {
        console.log(response);
        setImageList(response.data);
      })
      .catch((error) => {
        console.log("error", error);
        // alert("Something went wrong");
      });
  };

  useEffect(() => {
    getImages();
  }, []);

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
      {imgSrc && <img src={imgSrc} />}
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
