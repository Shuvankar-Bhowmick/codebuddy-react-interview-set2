function Seat({ seatNumber, isReserved, id, selectedSeats, onHandleClick, row, rowArr }) {
  return (
    <div
      className={`seat 
        ${
          isReserved
            ? "cursor-not-allowed bg-red-400"
            : "cursor-pointer bg-green-400 hover:bg-green-500"
        } 
        ${selectedSeats?.includes(id) ? "border-2 border-green-900" : "border-2 border-gray-300"}
        m-1 flex h-40 w-40 items-center justify-center rounded p-2`}
      onClick={onHandleClick}
    >
      <div className={`${isReserved ? "text-black-500" : "text-lightred-500"}`}>
        <p>Seat {seatNumber}</p>
        <p>{isReserved ? "Reserved" : "Not Reserved"}</p>
        <p>Row {row}</p>
      </div>
    </div>
  );
}

export default Seat;
