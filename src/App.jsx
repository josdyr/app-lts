import React, { useState, useEffect } from "react";

function App() {
  // State to store the fetched cars
  const [teslaCars, setTeslaCars] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5052/api/teslacar");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeslaCars(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to render the HTML table
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
            <th>Serial Number</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default App;
