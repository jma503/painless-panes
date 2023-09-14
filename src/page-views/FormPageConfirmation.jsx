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
  const frameTypes = useSelector((store) => store.frames);
  if (windows.length && frameTypes.length) {
    console.log(windows, "windows");
    console.log(frameTypes, "frames");
    console.log(windows[0].desired_frame_id, "desired frame");
    console.log(frameTypes[ + windows[0].desired_frame_id], "frame type");
  }

  return (
    <>
      <FormPageHeader text="Confirmation Page" />
      <div className="card w-96 glass">
        <h2 className="card-title">Review Submission!</h2>
        {windows.map((window) => (
          <div key={window.id}>
            <figure>
              <img src={`https://painless-panes.s3.amazonaws.com/${window.image}`} alt="window!" />
            </figure>
            <p>{window.height}</p>
            <p>{window.width}</p>
            {/* <img src={frameTypes[window.desired_frame_id].image} /> */}
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
