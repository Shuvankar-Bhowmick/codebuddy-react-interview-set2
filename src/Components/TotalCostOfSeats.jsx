function TotalCostOfSeats({ rowArr, numOfSeats, setTotalCost, children }) {
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
      <p className="text-xl font-bold text-gray-800">Total cost is ${children}</p>
      <p className="text-lg text-gray-600">Cost of Tickets: ${costOfTickets}</p>
      <p className="text-lg text-gray-600">Cost of Seats: ${costOfSeats}</p>
    </div>
  );
}

export default TotalCostOfSeats;
