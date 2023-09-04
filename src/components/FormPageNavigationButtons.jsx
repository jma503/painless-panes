import { useNavigate } from "react-router-dom";

export default function FormPageNavigationButtons({ page }) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(`/${page - 1}`);
  };

  const navigateNext = () => {
    navigate(`/${page + 1}`);
  };

  return (
    <div>
      {page > 1 && <button onClick={navigateBack}>Back</button>}
      <button onClick={navigateNext}>Next</button>
    </div>
  );
}
