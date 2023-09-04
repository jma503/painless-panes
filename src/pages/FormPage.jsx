import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageEmailView from "../page-views/FormPageEmailView";
import FormPageZipView from "../page-views/FormPageZipView";

export default function FormPage() {
  const { page = 1 } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user.email) {
      dispatch(actions.getUser());
    }
  }, [page]);

  return (
    <div>
      {page == 1 && <FormPageEmailView />}
      {page == 2 && <FormPageZipView />}
    </div>
  );
}
