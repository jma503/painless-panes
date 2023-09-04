import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function FormPageEmailView() {
  const user = useSelector((store) => store.user);

  return user.email ? (
    <FormPageVerifiedEmailView email={user.email} />
  ) : (
    <FormPageUnverifiedEmailView />
  );
}

function FormPageVerifiedEmailView({ email }) {
  return (
    <div>
      <h3>Your email {email} has been verified!</h3>
      <FormPageNavigationButtons page={1} />
    </div>
  );
}

function FormPageUnverifiedEmailView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendVerificationEmail = () => {
    // Send the email
    const payload = { email };
    dispatch(actions.sendEmail(payload));
    // Show dialog box instructing the user to check their email
    window.modal1.showModal();
  };

  return (
    <div>
      <h3>Email?</h3>
      <div>
        <input
          type="text"
          placeholder="Enter your email here..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        {/* Open the modal using ID.showModal() method */}
        <button onClick={sendVerificationEmail}>Verify</button>
        <dialog id="modal1">
          <div>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button>x</button>
            </form>
            <p>
              Click the link we sent to {email} to verify your email address.
            </p>
            <FormPageNavigationButtons page={1} />
          </div>
        </dialog>
      </div>
    </div>
  );
}
