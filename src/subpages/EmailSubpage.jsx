import { useState } from "react";

export default function FormEmailSubpage() {
  const [email, setEmail] = useState("");

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
        <button onClick={() => window.modal1.showModal()}>Next</button>
        <dialog id="modal1">
          <div>
            <p>
              Please click the link we sent to {email} to verify your email
              address.
            </p>
            <div>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button>Back</button>
              </form>
              <button>Next</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
