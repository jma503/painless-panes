import {useSelector } from "react-redux";
import FormPageHeader from "../components/FormPageHeader";

export default function myProjectsView() {
  const projectWindows = useSelector((store) => store.projects);

  const getAllProjectsData = () => {
    axios.get('/api/project/all').then(response => {
      dispatch({ type: 'SET_PROJECTS', payload: response.data });
    })
      .catch(error => {
        console.log('error with get all projects request', error);
      });
  }

  useEffect(() => {
    getAllProjectsData();
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
