import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import Button from "../components/Button";
import FormPageHeader from "../components/FormPageHeader";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import FormPageInput from "../components/FormPageInput";
import {
  getAllWindows,
  updateWindowDimensions,
} from "../store/sagas/window.saga";

export default function FormPageConfirmation() {
  const dispatch = useDispatch();
  const windows = useSelector((store) => store.allWindows);
  const frameTypes = useSelector((store) => store.frames);
  const project = useSelector((store) => store.project);
  const [windowToEdit, setWindowToEdit] = useState(null);
  const [editHeight, setEditHeight] = useState("");
  const [editWidth, setEditWidth] = useState("");

  const editWindow = (window) => {
    setWindowToEdit(window);
  };

  const sendEdit = () => {
    // defines the object to send as the edit - should we have frame type?
    const editToSend = {
      currentWindowId: windowToEdit.id,
      imageWidth: editWidth,
      imageHeight: editHeight,
    };
    dispatch(updateWindowDimensions(editToSend));
    // wait one second after the edit is sent - allows the edit to populate
    // in the database. then, retrieve all windows for the project
    setTimeout(() => {
      dispatch(getAllWindows({ project_id: project.id }));
      setWindowToEdit(null);
      setEditHeight("");
      setEditWidth("");
      // should we add a spinner?
    }, 1000);
  };

  return (
    <>
      <div className="card w-102 bg-base-100 shadow-xl p-2 m-2">
        <h2 className="card-title justify-center">
          Please review your windows:
        </h2>
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
              {!windowToEdit ? (
                <p>Height: {window.height}</p>
              ) : (
                <FormPageInput
                  value={editHeight}
                  placeholder={`Height: ${window.height}`}
                  setValue={setEditHeight}
                />
              )}
              {!windowToEdit ? (
                <p>Width: {window.width}</p>
              ) : (
                <FormPageInput
                  value={editWidth}
                  placeholder={`Width: ${window.width}`}
                  setValue={setEditWidth}
                />
              )}
              <p>Desired frame: {frameTypes[window.desired_frame_id].name}</p>
            </div>
            {!windowToEdit ? (
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    editWindow(window);
                  }}
                >
                  edit
                </button>
              </div>
            ) : (
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    sendEdit();
                  }}
                >
                  save
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="card-body">
          <div className="card-actions justify-center">
            {/* <button className="btn btn-primary">Edit</button> */}
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
