import PropTypes from "prop-types";
import { FormWrapper } from "./FormWrapper";

export function AddressForm({ countryCode, phoneNumber, acceptTermsAndCondition, updateFields }) {
  return (
    <>
      <FormWrapper title="Address Details">
        <label htmlFor="selectOption">Country Code:</label>
        <select
          autoFocus
          value={countryCode}
          onChange={(e) => updateFields({ countryCode: e.target.value })}
          required
        >
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        <label>Phone Number</label>
        <input
          required
          value={phoneNumber}
          type="text"
          pattern="[0-9]*"
          minLength="10"
          maxLength="10"
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
        />
      </FormWrapper>
      <div className="mt-3">
        <label>Accept T&C</label>
        <input
          className=" ml-6 h-5 w-7 rounded-full border-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="checkbox"
          value={acceptTermsAndCondition}
          onChange={(e) => updateFields({ acceptTermsAndCondition: Boolean(e.target.value) })}
          required
        />
      </div>
    </>
  );
}

AddressForm.propTypes = {
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  acceptTermsAndCondition: PropTypes.bool.isRequired,
  updateFields: PropTypes.func.isRequired,
};
