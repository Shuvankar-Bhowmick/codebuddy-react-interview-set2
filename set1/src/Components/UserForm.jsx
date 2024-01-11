import { FormWrapper } from "./FormWrapper";
import { PropTypes } from "prop-types";

export function UserForm({ firstName, lastName, address, updateFields }) {
  return (
    <FormWrapper title="User Details">
      <label>First Name</label>
      <input
        autoFocus
        required
        value={firstName}
        pattern="[A-Za-z]{2,50}"
        type="text"
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />

      <label>Last Name</label>
      <input
        value={lastName}
        type="text"
        pattern="[a-zA-Z]+"
        placeholder="Optional: Alphabets only"
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />

      <label>Address</label>
      <input
        required
        minLength="10"
        value={address}
        type="text"
        onChange={(e) => updateFields({ address: e.target.value })}
      />
    </FormWrapper>
  );
}

UserForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  address: PropTypes.string.isRequired,
  updateFields: PropTypes.func.isRequired,
};
