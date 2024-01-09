import { useState } from "react";
import Seat from "./Seat";
import "./Styles.css";
import TotalCostOfSeats from "./TotalCostOfSeats";

function GetSeats() {
  const [rows, setRows] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [rowArray, setRowArray] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const rowValueForButton = rows;

  async function handleButtonSubmit(e) {
    // to prevent the page from loading
    e.preventDefault();

    try {
      const resp = await fetch(`https://codebuddy.review/seats?count=${rows}`);

      if (!resp.ok) {
        throw new Error("Network returned unexpected response");
      }
      // parse the data to json
      const respData = await resp.json();

      // set the value of the response
      setResponse(respData.data);
    } catch (error) {
      console.log("Error received while fetching: ", error);
    }
  }

  function toggleSeat(row, id) {
    // check if the seat is already selected or not
    if (selectedSeats?.includes(id)) {
      // seat is already selected
      setRowArray((rowArr) => rowArr.filter((rowNum) => rowNum !== row));
      setSelectedSeats((seats) => seats.filter((seatId) => seatId !== id));
    } else {
      // seat is not added already
      setRowArray((rowArr) => [...rowArr, row]);
      setSelectedSeats((seats) => [...seats, id]);
    }
    console.log(selectedSeats);
  }

  function renderSeating() {
    return response.map((row, index) => (
      <div key={row.id} className="text-center">
        <h3>Section {Number(rowValueForButton) - index}</h3>
        <div className="seating flex justify-center">
          {row.seats.map((seat) => (
            <span key={seat.id} className="seat-number">
              {/* <p>{seat.seatNumber}</p> */}
              <Seat
                seatNumber={seat.seatNumber}
                key={seat.id}
                isReserved={seat.isReserved}
                id={seat.id}
                selectedSeats={selectedSeats}
                row={Number(rows) - index}
                rowArr={rowArray}
                onHandleClick={() => !seat.isReserved && toggleSeat(Number(rows) - index, seat.id)}
              />
            </span>
          ))}
        </div>
      </div>
    ));
  }

  async function submitSelectedSeats() {
    try {
      // Make the POST request to the server
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify({ selectedSeats }),
      });

      // Handle the response as needed
      console.log("Submission successful:", response);
      alert("Submission successful! \nThe total cost is $" + totalCost.toString());
    } catch (error) {
      console.error("Error submitting seats:", error);
      // Handle the error
    } finally {
      setRows("");
      setSelectedSeats([]);
      setRowArray([]);
      setTotalCost(0);
      setResponse(null);
    }
  }

  function handleInputChange(e) {
    setRows(e.target.value);
  }

  async function handleBuyTickets() {
    if (selectedSeats.length > 5 || selectedSeats.length < 1) {
      alert("Select a minimum of 1 and a maximum of 5 seats");
    } else {
      await submitSelectedSeats();
    }
  }

  return (
    <div>
      <form onSubmit={handleButtonSubmit}>
        <div>
          <input
            className="mt-2 px-2 py-2"
            type="number"
            value={rows}
            onChange={handleInputChange}
            placeholder="Enter rows"
          />
        </div>
        <span>
          <button
            className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>
          <button
            className="ml-2 mt-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
            onClick={handleBuyTickets}
          >
            Buy tickets
          </button>
        </span>
      </form>
      {response !== null && (
        <>
          <div className="response mt-7 flex justify-center border border-solid border-black">
            <div>{renderSeating()}</div>
          </div>
          <div className="response mt-7 flex justify-center ">
            <TotalCostOfSeats
              rowArr={rowArray}
              numOfSeats={selectedSeats.length}
              setTotalCost={setTotalCost}
              totalCost={totalCost}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default GetSeats;
