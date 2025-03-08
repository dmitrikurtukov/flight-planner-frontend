import "./SeatLegend.css";

function SeatLegend() {
  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Legend</h4>
      <ul className="list-unstyled">
        <li className="legend-item">
          <span className="legend-box first-class"></span> First Class
        </li>
        <li className="legend-item">
          <span className="legend-box business"></span> Business Class
        </li>
        <li className="legend-item">
          <span className="legend-box economy"></span> Economy Class
        </li>
        <li className="legend-item">
          <span className="legend-box reserved"></span> Reserved
        </li>
        <li className="legend-item">
          <span className="legend-box recommended"></span> Recommended
        </li>
      </ul>
    </div>
  );
}

export default SeatLegend;
