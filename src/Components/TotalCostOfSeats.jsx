import PropTypes from "prop-types";

function TotalCostOfSeats({ rowArr, numOfSeats, setTotalCost, totalCost }) {
  const costOfTickets = 20 * numOfSeats;
  const costOfSeats = rowArr.reduce((acc, rowNum) => {
    console.log("Row number: ", rowNum);
    console.log("Accumulator: ", acc);
    return acc + rowNum * 10;
  }, 0);

  setTotalCost(costOfSeats + costOfTickets);
  console.log("Row array", rowArr);
  return (
    <div className="rounded border bg-gray-100 p-4">
      <p className="text-xl font-bold text-gray-800">Total cost is ${totalCost}</p>
      <p className="text-lg text-gray-600">Cost of Tickets: ${costOfTickets}</p>
      <p className="text-lg text-gray-600">Cost of Seats: ${costOfSeats}</p>
    </div>
  );
}

TotalCostOfSeats.propTypes = {
  rowArr: PropTypes.arrayOf(PropTypes.number).isRequired,
  numOfSeats: PropTypes.number.isRequired,
  setTotalCost: PropTypes.func.isRequired,
  totalCost: PropTypes.number.isRequired,
};

export default TotalCostOfSeats;
