import { useState } from "react";
import { useMultiStateForm } from "../Components/useMultiStepForm";
import { AccountForm } from "../Components/AccountForm";
import { UserForm } from "../Components/userForm";
import { AddressForm } from "../Components/AddressForm";
import { useNavigate } from "react-router-dom";
import { TabComponent } from "../Components/TabComponent";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  address: "",
  countryCode: "+91",
  phoneNumber: "",
  acceptTermsAndCondition: false,
  email: "",
  password: "",
};

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields) {
    setData((prev) => {
      const obj = { ...prev, ...fields };
      return obj;
    });
  }
  const [errorMessage, setErrorMessage] = useState(false);

  const { currentStepIndex, step, steps, isFirstStep, isLastStep, goTo, next, back, visited } =
    useMultiStateForm([
      <AccountForm key={1} {...data} updateFields={updateFields} />,
      <UserForm key={2} {...data} updateFields={updateFields} />,
      <AddressForm key={3} {...data} updateFields={updateFields} />,
    ]);

  async function sendFormDetails() {
    const filteredData = Object.assign({}, data);
    delete filteredData.acceptTermsAndCondition;

    try {
      const requestBody = JSON.stringify(filteredData);
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: requestBody,
      });
      if (response.ok) {
        navigate("/posts");
        console.log(response);
      } else {
        throw new Error("Submission failed");
      }
    } catch (e) {
      console.log("Error while sending request: " + e);
    } finally {
      setData(INITIAL_DATA);
    }
  }

  // Send all the form details by a post request when the current form is the last form
  function validatePassword() {
    const passwordRegex = /^(?=.*[A-Z]{2})(?=.*[a-z]{2})(?=.*[0-9]{2})(?=.*[^a-zA-Z0-9 ]{2}).*$/;

    console.log(data.password);
    return passwordRegex.test(data.password);
  }

  function handleOnClickSave(e) {
    alert(`Form ${currentStepIndex + 1} saved!`);
    if (currentStepIndex === steps.length - 1) {
      handleOnSubmit(e);
      sendFormDetails();
    }
  }

  // prevent the default action and go to the next page only when the current form is fully validated
  function handleOnSubmit(e) {
    e.preventDefault();
    if (currentStepIndex < steps.length - 1) {
      if (currentStepIndex === 0) {
        if (!validatePassword()) {
          setErrorMessage(true);
        } else {
          setErrorMessage(false);

          next();
        }
        console.log("Current step" + currentStepIndex);
        console.log("Error message: " + errorMessage);
      } else next();
    }
  }

  function handleTabClick(stepIndex) {
    console.log("Click generated!");
    if (stepIndex < currentStepIndex || visited.includes(stepIndex)) {
      console.log("Visited array " + visited);
      goTo(stepIndex);
    } else if (stepIndex > currentStepIndex) alert("Complete the current form first");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="form-class overflow-hidden rounded-lg  bg-gray-50 p-11 text-gray-900 shadow-lg">
        <form onSubmit={handleOnSubmit}>
          <TabComponent
            visited={visited}
            currentStepIndex={currentStepIndex}
            handleTabClick={handleTabClick}
          />
          {step}
          {errorMessage && currentStepIndex === 0 && (
            <div className="w-25 flex flex-col items-start text-xs text-red-500 opacity-70">
              <p>Invalid password</p>
              <ul className="ml-2 list-disc">
                <li>Minimum 2 capital letters</li>
                <li>Minimum 2 small letters</li>
                <li>Minimum 2 numbers</li>
                <li>Minimum 2 special characters</li>
              </ul>
            </div>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <button
              className={`${
                isFirstStep
                  ? " cursor-not-allowed bg-slate-200 opacity-70"
                  : "bg-blue-500  hover:bg-blue-700"
              } ml-1 rounded-3xl pb-1 pl-2 pr-2 pt-1 text-sm`}
              type="button"
              onClick={back}
            >
              Back
            </button>
            <button
              className="ml-1 rounded-2xl bg-blue-500 pb-1 pl-2 pr-2 pt-1  text-sm hover:bg-blue-700"
              type={currentStepIndex === 2 ? "submit" : "button"}
              onClick={handleOnClickSave}
            >
              Save
            </button>
            <button
              className={`${
                isLastStep
                  ? " cursor-not-allowed bg-slate-200 opacity-70"
                  : "bg-blue-500 hover:bg-blue-700"
              }  ml-1 rounded-xl pb-1 pl-2 pr-2 pt-1 text-sm `}
              type="submit"
            >
              Save and Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
