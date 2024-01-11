import { FormWrapper } from "./FormWrapper";
import { PropTypes } from "prop-types";

export function AccountForm({ email, password, updateFields }) {
  return (
    <FormWrapper title="Account Details">
      <label>Email Id</label>
      <input
        autoFocus
        required
        value={email}
        type="email"
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <label>Password</label>
      <input
        required
        value={password}
        type="password"
        onChange={(e) => updateFields({ password: e.target.value })}
      />
    </FormWrapper>
  );
}

AccountForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string.isRequired,
  updateFields: PropTypes.func.isRequired,
};
