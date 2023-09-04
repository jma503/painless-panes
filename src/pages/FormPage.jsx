import { useParams } from "react-router-dom";
import EmailSubpage from "../subpages/EmailSubpage";
import ZipSubpage from "../subpages/ZipSubpage";

export default function FormPage() {
  const { page = 1 } = useParams();

  return (
    <div>
      {page == 1 && <EmailSubpage />}
      {page == 2 && <ZipSubpage />}
    </div>
  );
}
