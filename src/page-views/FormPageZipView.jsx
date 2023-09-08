import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function FormPageZipView() {
  const [zipCode, setZipCode] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const addZipCode = () => {
    // Add zip code
    const payload = { zipCode, userId: user.id };
    dispatch(actions.addZipCode(payload));
  };

  return (
    <>
      <FormPageHeader text="Zip code?" />
      <FormPageInput
        placeholder="enter your zip code here..."
        value={zipCode}
        setValue={setZipCode}
      />
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={2} onClickNext={addZipCode} />
      </FormPageButtonsContainer>
    </>
  );
}
