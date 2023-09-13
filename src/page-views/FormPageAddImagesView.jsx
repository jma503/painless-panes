import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import AddWindowImage from "../components/AddImage";
import Button from "../components/Button";
import { readAndCompressImage } from "browser-image-resizer";
import axios from "axios";

export default function FormPageAddImages() {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);
  const [image, setImage] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");

  const frameTypes = useSelector(store => store.frames)
  useEffect(() => {
    dispatch(actions.getFrames())
  },[])

  return (
    <>
      <FormPageHeader text="Take a photo of the window you desire to have replaced" />

      <AddWindowImage />
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
        <FormPageNavigationButtons page={4} />
      </FormPageButtonsContainer>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
      List of Window Frames
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Desired Window Frame</h3>
          <ul className="py-4">
            {frameTypes.map((frameType) => (
          
               <li key={frameType.id}>
              <input type="checkbox" className="checkbox" />
              <label> {frameType.name}</label>
              <img src={frameType.image} alt={frameType.name}/>
            </li>  
            
            ))} 
            </ul>    
               <button className="btn btn-primary">Submit</button>
         </div>
            {/* <li>
              <input type="checkbox" className="checkbox" />
              <label htmlFor="image2"> Single or Double hung</label>
              <img src="/Double_Hung.jpg" alt="Single or Double hung frame" />
            </li>
            <li>
              <input type="checkbox" className="checkbox" />
              <label> Egress (basement)</label>
              <img src="/Casement.jpg" alt="An egress frame" />
            </li>
            <li>
              <input type="checkbox" className="checkbox" />
              <label > Bay or bow</label>
              <img src="/Bay.jpg" alt="Bay or bow" />
            </li>
            <li>
              <input type="checkbox" className="checkbox" />
              <label> Fixed</label>
              <img src="/Bay.jpg" alt="Fixed" />
            </li>
          </ul>
          <button className="btn btn-primary">Submit</button>
        </div> */}
      </dialog>
    </>
  );
}
