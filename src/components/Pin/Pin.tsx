import React, { useState, FC, ChangeEvent, FormEvent } from "react";
import { inject, observer } from "mobx-react";
import { IAnyStateTreeNode } from "mobx-state-tree";

type PinProps = {
  pinStore?: IAnyStateTreeNode;
};

const Pin: FC<PinProps> = ({ pinStore }) => {
  const isAuthenticated = pinStore?.isAuthenticated;
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setPin(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!pin.length) {
      setError("you must add a value");
      return false;
    }
    pinStore?.authenticatePin(parseInt(pin));
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <input value={pin} onChange={handleChange} placeholder="Enter pin" />
      <span>{error}</span>
      <button type="submit">Submit PIN</button>
    </form>
  );

  const renderSuccess = () => <p>Your PIN has been validated</p>;

  return (
    <div className="card">
      <div className="card-body">
        {isAuthenticated ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
};

export default inject("pinStore")(observer(Pin));
