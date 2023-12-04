import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ObjectDetail = () => {
  const params = useParams();

  const [teslaCar, setTeslaCar] = useState({});

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

  console.log(teslaCar);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setTeslaCar({ ...teslaCar, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const payload = { ...teslaCar };

    try {
      let response = null;
      if (Object.values(teslaCar).every((x) => x === "")) {
        response = await fetch(
          `http://app-lts.azurewebsites.net/api/teslacar/${params.id}`,
          {
            method: "DELETE",
          }
        );
        console.log("Delete");
        return;
      }
      if (teslaCar.id !== "") {
        response = await fetch(
          `http://app-lts.azurewebsites.net/api/teslacar/${teslaCar.id}`,
          {
            method: "PUT", // Use PUT for update
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        console.log("Update");
      } else {
        payload.id = 0;
        response = await fetch(
          "http://app-lts.azurewebsites.net/api/teslacar",
          {
            method: "POST", // Use POST for create
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        console.log("Create");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="was-validated" noValidate>
      <div className="mb-3">
        <label className="form-label">ID:</label>
        <input
          type="number"
          name="id"
          defaultValue={teslaCar.id}
          className="form-control"
          onChange={handleChange}
        />
        <div className="valid-feedback"></div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Model:</label>
        <input
          type="text"
          name="model"
          defaultValue={teslaCar.model}
          className="form-control"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback"></div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Serial Number:</label>
        <input
          type="text"
          name="serialNumber"
          defaultValue={teslaCar.serialNumber}
          className="form-control"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback"></div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Location:</label>
        <select
          type="text"
          name="location"
          defaultValue={teslaCar.location}
          className="form-select"
          onChange={handleChange}
          required
        >
          <option value="Haugesund">Haugesund</option>
          <option value="Stavanger">Stavanger</option>
          <option value="Bergen">Bergen</option>
          <option value=""></option>
        </select>
        <div className="valid-feedback"></div>
        <div className="invalid-feedback">Please fill out this field.</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
