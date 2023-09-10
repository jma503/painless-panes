import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import AddWindowImage from "../components/AddImage";

export default function FormPageAddImages() {
    const dispatch = useDispatch();
    const project = useSelector((store) => store.project);
    const [image, setImage] = useState("");
    const [imageWidth, setImageWidth] = useState("");
    const [imageHeight, setImageHeight] = useState("");

  
    return (
      <>
        <FormPageHeader text="Take a photo of the window you desire to have replaced" />
        <AddWindowImage/>
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
        </FormPageButtonsContainer>
      </>
    );
  }
  