import PropTypes from "prop-types";

export function FormWrapper({ title, children }) {
  return (
    <>
      <h2 className="m-0 mb-4 text-center font-bold underline">{title}</h2>
      <h3 className="col-span-2 grid grid-cols-1 items-center gap-4 gap-x-2 md:grid-cols-2 ">
        {children}
      </h3>
    </>
  );
}

FormWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
