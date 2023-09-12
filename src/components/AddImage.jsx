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
  const [imageList, setImageList] = useState([]);
  const project = useSelector((store) => store.project);
  // const windowId = useSelector((store) => store.currentWindowId);

  // handles sending the image capture to AWS in base64
  const sendPhotoToServer = (event) => {
    event.preventDefault();
    // dispatch saga to add a window to database and return the window ID
    // this will be replaced by the window ID when we have that finalized
    // const formData = new FormData();
    // formData.append("image", imgSrc);
    // formData.append("windowId", windowId);
    // let postUrl = `/api/window/photoUpload/blah`;
    dispatch(actions.addWindow({ project_id: project.id, image: imgSrc }));
    // TODO - this can be handled by a saga
    // take returned window ID and dispatch an action to upload photo
    // const response = fetch(postUrl, {
    //   method: "POST",
    //   body: imgSrc,
    // });
    //   axios
    //     .post(postUrl, formData)
    //     .then((response) => {
    //       console.log("Success!");
    //       // alert("Success!");
    //       // clearForm();
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //       // alert("Something went wrong");
    //     });
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
      .get("/api/window/upload/test")
      .then((response) => {
        setImageList(response.data);
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong");
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
        <div key={image.id}>
          <div>{image.name}</div>
          <div>{image.type}</div>
          <img
            style={{ maxHeight: "200px" }}
            src={`api/images/${image.name}`}
          />
        </div>
      ))} */}
      <div>
        <img src={imageList} />
      </div>
    </>
  );
}
