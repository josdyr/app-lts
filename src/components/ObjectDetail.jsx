import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsonQuery from "../../public/query.json";

export const ObjectDetail = () => {
  const params = useParams();
  const [teslaCar, setTeslaCar] = useState({});
  const [cityCode, setCityCode] = useState({});
  const [norwegianCities, setNorwegianCities] = useState({});
  const [mergedCityWithCode, setMergedCityWithCode] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://app-lts.azurewebsites.net/api/teslacar/${params.id}`
      );
      if (!response.ok) {
        throw new Error(`HTTPS error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeslaCar(data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCityCode();
    fetchNorwegianCities();
  }, []);

  useEffect(() => {
    if (
      Object.keys(cityCode).length > 0 &&
      Object.keys(norwegianCities).length > 0
    ) {
      mergeCityWithCode(cityCode, norwegianCities);
    }
  }, [cityCode, norwegianCities]);

  const handleChange = (e) => {
    setTeslaCar({ ...teslaCar, [e.target.name]: e.target.value });
  };

  function mergeCityWithCode(cityCode, norwegianCities) {
    const mergedArray = cityCode.map((code) => {
      norwegianCities.find((city) => city.label === code.city);
      return { ...code };
    });
    setMergedCityWithCode(mergedArray);
  }

  const fetchCityCode = async () => {
    try {
      const response = await fetch(
        "https://app-lts.azurewebsites.net/api/citycode"
      );
      if (!response.ok) {
        throw new Error(`HTTPS error! status: ${response.status}`);
      }
      const data = await response.json();
      setCityCode(data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };

  function processData(data) {
    const values = data.value;
    const labels = data.dimension.Region.category.label;

    const mappedValues = [];

    values.forEach((value, index) => {
      const labelKey = Object.keys(labels)[index];
      const label = labels[labelKey];
      mappedValues.push({ label, value });
    });

    mappedValues.sort((a, b) => b.value - a.value);

    const top100 = mappedValues.slice(0, 100);

    return top100;
  }

  const fetchNorwegianCities = async () => {
    const url = "https://data.ssb.no/api/v0/no/table/07459/";
    const query = jsonQuery;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const top100 = processData(data);
      setNorwegianCities(top100);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const payload = { ...teslaCar };

    try {
      let response = null;
      if (Object.values(teslaCar).every((x) => x === "")) {
        response = await fetch(
          `https://app-lts.azurewebsites.net/api/teslacar/${params.id}`,
          {
            method: "DELETE",
          }
        );
        console.log("Delete");
        return;
      }
      if (teslaCar.id !== "") {
        response = await fetch(
          `https://app-lts.azurewebsites.net/api/teslacar/${teslaCar.id}`,
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
          "https://app-lts.azurewebsites.net/api/teslacar",
          {
            method: "POST", // Use POST for create
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          alert(
            `Serial number is not valid. Correct format could be: TC-00001-RG`
          );
          throw new Error(`HTTPS error! Status: ${response.status}`);
        } else {
          console.log("Create");
        }
      }

      if (!response.ok) {
        // const errorData = await response.json();
        alert(
          `Serial number is not valid. Correct format could be: TC-00001-RG`
        );
        throw new Error(`HTTPS error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="appContainer">
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
            {Object.values(mergedCityWithCode).map((item) => (
              <option key={item.city} value={item.city}>
                {item.city} - {item.code}
              </option>
            ))}
          </select>
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
