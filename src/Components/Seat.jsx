import PropTypes from "prop-types";

function Seat({ seatNumber, isReserved, id, selectedSeats, onHandleClick, row }) {
  return (
    <div
      className={`seat 
        ${
          isReserved
            ? "cursor-not-allowed bg-red-400"
            : "cursor-pointer bg-green-400 hover:bg-green-500"
        } 
        ${selectedSeats?.includes(id) ? "border-2 border-green-900" : "border-2 border-gray-300"}
        h-35 w-35 m-1 flex items-center justify-center rounded p-2`}
      onClick={onHandleClick}
    >
      <div
        className={`${
          isReserved ? "text-black-500" : "text-lightred-500"
        } text-sm font-medium text-gray-800`}
      >
        <p>Seat {seatNumber}</p>
        <p>Reserved: {isReserved ? "Yes" : "No"}</p>
        <p>Row {row}</p>
      </div>
    </div>
  );
}

Seat.propTypes = {
  seatNumber: PropTypes.number.isRequired,
  isReserved: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  selectedSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  onHandleClick: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
};

export default Seat;
