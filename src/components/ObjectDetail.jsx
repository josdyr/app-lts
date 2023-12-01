import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ObjectDetail = () => {
  const params = useParams();
  const id = params.id;

  const [teslaCar, setTeslaCar] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://app-lts.azurewebsites.net/api/teslacar/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeslaCar(data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={teslaCar.id}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={teslaCar.model}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label>Serial Number:</label>
          <input
            type="text"
            name="serialNumber"
            value={teslaCar.serialNumber}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={teslaCar.location}
            // onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};
