import PropTypes from "prop-types";

export function TabComponent({ currentStepIndex, handleTabClick, visited }) {
  console.log("Visited array: " + visited);
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex space-x-4">
        {/* Hardcoded three tabs */}
        <button
          type="button"
          key="0"
          className={`rounded-md px-4 py-2 font-medium text-gray-500  focus:ring-blue-500 ${
            visited.includes(0)
              ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              : ""
          } ${currentStepIndex >= 0 ? "bg-blue-200 text-blue-700" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Tab 1
        </button>
        <button
          type="button"
          key="1"
          className={`rounded-md px-4 py-2 font-medium text-gray-500 ${
            visited.includes(1)
              ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              : ""
          } ${currentStepIndex >= 1 ? "bg-blue-200 text-blue-700" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Tab 2
        </button>
        <button
          type="button"
          key="2"
          className={`rounded-md px-4 py-2 font-medium text-gray-500  ${
            visited.includes(2)
              ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              : ""
          }  ${currentStepIndex >= 2 ? "bg-blue-200 text-blue-700" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Tab 3
        </button>
      </div>
      {/* ... rest of the navigation buttons */}
    </nav>
  );
}

TabComponent.propTypes = {
  currentStepIndex: PropTypes.number.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  visited: PropTypes.array.isRequired,
};
