import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import AddWindowImage from "../components/AddImage";
import { readAndCompressImage } from "browser-image-resizer";
import axios from "axios";

export default function FormPageAddImages() {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);
  const [image, setImage] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  // file upload states
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileType, setFileType] = useState("");

  const onFileChange = async (event) => {
    // Access the selected file
    const fileToUpload = event.target.files[0];

    // Resize and compress the image. Remove this if using something other
    // than an image upload.
    const copyFile = new Blob([fileToUpload], {
      type: fileToUpload.type,
      name: fileToUpload.name,
    });
    const resizedFile = await readAndCompressImage(copyFile, {
      quality: 1.0, // 100% quality
      maxHeight: 1000, // max height of the image
    });

    // Limit to specific file types.
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      // Resizing the image removes the name, store it in a separate variable
      setFileName(encodeURIComponent(fileToUpload.name));
      setFileType(encodeURIComponent(fileToUpload.type));
      // Save the resized file
      setSelectedFile(resizedFile);
      // Create a URL that can be used in an img tag for previewing the image
      // setImagePreview(URL.createObjectURL(resizedFile));
    } else {
      alert("Please select an image");
    }
  };

  const sendPhotoToServer = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    let postUrl = `/api/window/upload/1`;
    axios
      .post(postUrl, formData)
      .then((response) => {
        console.log("Success!");
        alert("Success!");
        clearForm();
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong");
      });
  };

  const clearForm = () => {
    setFileName("");
    setSelectedFile(undefined);
  };

  return (
    <>
      <FormPageHeader text="Take a photo of the window you desire to have replaced" />
      <form onSubmit={sendPhotoToServer}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* <AddWindowImage/>
        <FormPageInput
          placeholder="Window Width"
          value={imageWidth}
          setValue={setImageWidth}
        />
        <FormPageInput
          placeholder="Window Height"
          value={imageHeight}
          setValue={setImageHeight}
        />
        <FormPageButtonsContainer>
          <FormPageNavigationButtons
            page={4}
          />
        </FormPageButtonsContainer> */}
    </>
  );
}
