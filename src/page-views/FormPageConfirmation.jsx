import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import Button from "../components/Button";
import FormPageHeader from "../components/FormPageHeader";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import FormPageInput from "../components/FormPageInput";

export default function FormPageConfirmation() {
  const dispatch = useDispatch();
  const windows = useSelector((store) => store.allWindows);


  return (
    <>
      <FormPageHeader text="Confirmation Page" />
      <div className="card w-96 glass">
        <h2 className="card-title">Review Submission!</h2>
        {windows.map((window) => (
          <div key={window.id}>
            <figure>
              <img src={window.image} alt="window!" />
            </figure>
            <p>{window.height}</p>
            <p>{window.width}</p>
            <p>{window.desired_frame_id}</p>
          </div>
        ))}
        <div className="card-body">
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>


    
     
    </>
  );
}
