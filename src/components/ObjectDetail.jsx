<script src="http://localhost:8097"></script>;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ObjectDetail = () => {
  const params = useParams();

  const [teslaCar, setTeslaCar] = useState({
    id: "",
    model: "",
    serialNumber: "",
    location: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://app-lts.azurewebsites.net/api/teslacar/${params.id}`
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

  const handleChange = (e) => {
    setTeslaCar({ ...teslaCar, [e.target.name]: e.target.value });
  };

  console.log(teslaCar);

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">ID:</label>
        <input
          type="text"
          name="id"
          defaultValue={teslaCar.id}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Model:</label>
        <input
          type="text"
          name="model"
          defaultValue={teslaCar.model}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Serial Number:</label>
        <input
          type="text"
          name="serialNumber"
          defaultValue={teslaCar.serialNumber}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Location:</label>
        <input
          type="text"
          name="location"
          defaultValue={teslaCar.location}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
