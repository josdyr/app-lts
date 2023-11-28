import React, { useState, useEffect } from "react";

const TeslaCars = () => {
  const [teslaCars, setTeslaCars] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5052/api/teslacar");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeslaCars(data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = () => {
    return teslaCars.map((car, index) => {
      return (
        <tr key={index}>
          <td>{car.id}</td>
          <td>{car.model}</td>
          <td>{car.serialNumber}</td>
          <td>{car.location}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>SerialNumber</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
};

export default TeslaCars;
