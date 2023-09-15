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
  const [windowToEdit, setWindowToEdit] = useState(null);

  return (
    <>
      <FormPageHeader text="Confirmation Page" />
      <div className="card w-102 bg-base-100 shadow-xl p-2 m-2">
        <h2 className="card-title justify-center">Review Submission!</h2>
        {windows.map((window) => (
          <div
            className="card w-102 bg-base-100 shadow-xl border-solid border-2 p-2 m-2"
            key={window.id}
          >
            <figure>
              <img
                src={`https://painless-panes.s3.amazonaws.com/${window.image}`}
                alt="window!"
              />
            </figure>
            <div className="card-body items-center text-center">
              <p>Height: {window.height}</p>
              <p>Width: {window.width}</p>
              <p>Desired frame: {frameTypes[window.desired_frame_id].name}</p>
            </div>
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
