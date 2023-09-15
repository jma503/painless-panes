import {useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import FormPageHeader from "../components/FormPageHeader";
import actions from "../store/actions"

export default function PriorProjectsPage() {
  const projectWindows = useSelector((store) => store.projects);
    const dispatch = useDispatch();

  useEffect(() => {
   dispatch(actions.getAllProjects());
  }, []);

  return (
    <>
      <FormPageHeader text="My Projects" />
      <div className="overflow-x-auto">
        {projectWindows.map((project) => {
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={project.image} />
            </figure>
            <div className="card-body">
              <p>{project.height}</p>
              <p>{project.width}</p>
              <p>{project.desired_frame_id}</p>
            </div>
          </div>;
        })}
      </div>
    </>
  );
}
