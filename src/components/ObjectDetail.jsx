import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    const cityCodeArray = Object.values(cityCode);
    const norwegianCitiesArray = Object.values(norwegianCities);

    const mergedArray = norwegianCitiesArray.map((item) => {
      const cityCodeItem = cityCodeArray.find(
        (cityCodeItem) => cityCodeItem.city === item.label
      );
      return { ...item, cityCode: cityCodeItem?.code };
    });

    debugger;

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
    const query = {
      query: [
        {
          code: "Region",
          selection: {
            filter: "agg:KommSummer",
            values: [
              "K-3001",
              "K-3002",
              "K-3003",
              "K-3004",
              "K-3005",
              "K-3006",
              "K-3007",
              "K-3011",
              "K-3012",
              "K-3013",
              "K-3014",
              "K-3015",
              "K-3016",
              "K-3017",
              "K-3018",
              "K-3019",
              "K-3020",
              "K-3021",
              "K-3022",
              "K-3023",
              "K-3024",
              "K-3025",
              "K-3026",
              "K-3027",
              "K-3028",
              "K-3029",
              "K-3030",
              "K-3031",
              "K-3032",
              "K-3033",
              "K-3034",
              "K-3035",
              "K-3036",
              "K-3037",
              "K-3038",
              "K-3039",
              "K-3040",
              "K-3041",
              "K-3042",
              "K-3043",
              "K-3044",
              "K-3045",
              "K-3046",
              "K-3047",
              "K-3048",
              "K-3049",
              "K-3050",
              "K-3051",
              "K-3052",
              "K-3053",
              "K-3054",
              "K-0301",
              "K-3401",
              "K-3403",
              "K-3405",
              "K-3407",
              "K-3411",
              "K-3412",
              "K-3413",
              "K-3414",
              "K-3415",
              "K-3416",
              "K-3417",
              "K-3418",
              "K-3419",
              "K-3420",
              "K-3421",
              "K-3422",
              "K-3423",
              "K-3424",
              "K-3425",
              "K-3426",
              "K-3427",
              "K-3428",
              "K-3429",
              "K-3430",
              "K-3431",
              "K-3432",
              "K-3433",
              "K-3434",
              "K-3435",
              "K-3436",
              "K-3437",
              "K-3438",
              "K-3439",
              "K-3440",
              "K-3441",
              "K-3442",
              "K-3443",
              "K-3446",
              "K-3447",
              "K-3448",
              "K-3449",
              "K-3450",
              "K-3451",
              "K-3452",
              "K-3453",
              "K-3454",
              "K-3801",
              "K-3802",
              "K-3803",
              "K-3804",
              "K-3805",
              "K-3806",
              "K-3807",
              "K-3808",
              "K-3811",
              "K-3812",
              "K-3813",
              "K-3814",
              "K-3815",
              "K-3816",
              "K-3817",
              "K-3818",
              "K-3819",
              "K-3820",
              "K-3821",
              "K-3822",
              "K-3823",
              "K-3824",
              "K-3825",
              "K-4201",
              "K-4202",
              "K-4203",
              "K-4204",
              "K-4205",
              "K-4206",
              "K-4207",
              "K-4211",
              "K-4212",
              "K-4213",
              "K-4214",
              "K-4215",
              "K-4216",
              "K-4217",
              "K-4218",
              "K-4219",
              "K-4220",
              "K-4221",
              "K-4222",
              "K-4223",
              "K-4224",
              "K-4225",
              "K-4226",
              "K-4227",
              "K-4228",
              "K-1101",
              "K-1103",
              "K-1106",
              "K-1108",
              "K-1111",
              "K-1112",
              "K-1114",
              "K-1119",
              "K-1120",
              "K-1121",
              "K-1122",
              "K-1124",
              "K-1127",
              "K-1130",
              "K-1133",
              "K-1134",
              "K-1135",
              "K-1144",
              "K-1145",
              "K-1146",
              "K-1149",
              "K-1151",
              "K-1160",
              "K-4601",
              "K-4602",
              "K-4611",
              "K-4612",
              "K-4613",
              "K-4614",
              "K-4615",
              "K-4616",
              "K-4617",
              "K-4618",
              "K-4619",
              "K-4620",
              "K-4621",
              "K-4622",
              "K-4623",
              "K-4624",
              "K-4625",
              "K-4626",
              "K-4627",
              "K-4628",
              "K-4629",
              "K-4630",
              "K-4631",
              "K-4632",
              "K-4633",
              "K-4634",
              "K-4635",
              "K-4636",
              "K-4637",
              "K-4638",
              "K-4639",
              "K-4640",
              "K-4641",
              "K-4642",
              "K-4643",
              "K-4644",
              "K-4645",
              "K-4646",
              "K-4647",
              "K-4648",
              "K-4649",
              "K-4650",
              "K-4651",
              "K-1505",
              "K-1506",
              "K-1507",
              "K-1511",
              "K-1514",
              "K-1515",
              "K-1516",
              "K-1517",
              "K-1520",
              "K-1525",
              "K-1528",
              "K-1531",
              "K-1532",
              "K-1535",
              "K-1539",
              "K-1547",
              "K-1554",
              "K-1557",
              "K-1560",
              "K-1563",
              "K-1566",
              "K-1573",
              "K-1576",
              "K-1577",
              "K-1578",
              "K-1579",
              "K-5001",
              "K-5006",
              "K-5007",
              "K-5014",
              "K-5020",
              "K-5021",
              "K-5022",
              "K-5025",
              "K-5026",
              "K-5027",
              "K-5028",
              "K-5029",
              "K-5031",
              "K-5032",
              "K-5033",
              "K-5034",
              "K-5035",
              "K-5036",
              "K-5037",
              "K-5038",
              "K-5041",
              "K-5042",
              "K-5043",
              "K-5044",
              "K-5045",
              "K-5046",
              "K-5047",
              "K-5049",
              "K-5052",
              "K-5053",
              "K-5054",
              "K-5055",
              "K-5056",
              "K-5057",
              "K-5058",
              "K-5059",
              "K-5060",
              "K-5061",
              "K-1804",
              "K-1806",
              "K-1811",
              "K-1812",
              "K-1813",
              "K-1815",
              "K-1816",
              "K-1818",
              "K-1820",
              "K-1822",
              "K-1824",
              "K-1825",
              "K-1826",
              "K-1827",
              "K-1828",
              "K-1832",
              "K-1833",
              "K-1834",
              "K-1835",
              "K-1836",
              "K-1837",
              "K-1838",
              "K-1839",
              "K-1840",
              "K-1841",
              "K-1845",
              "K-1848",
              "K-1851",
              "K-1853",
              "K-1856",
              "K-1857",
              "K-1859",
              "K-1860",
              "K-1865",
              "K-1866",
              "K-1867",
              "K-1868",
              "K-1870",
              "K-1871",
              "K-1874",
              "K-1875",
              "K-5401",
              "K-5402",
              "K-5403",
              "K-5404",
              "K-5405",
              "K-5406",
              "K-5411",
              "K-5412",
              "K-5413",
              "K-5414",
              "K-5415",
              "K-5416",
              "K-5417",
              "K-5418",
              "K-5419",
              "K-5420",
              "K-5421",
              "K-5422",
              "K-5423",
              "K-5424",
              "K-5425",
              "K-5426",
              "K-5427",
              "K-5428",
              "K-5429",
              "K-5430",
              "K-5432",
              "K-5433",
              "K-5434",
              "K-5435",
              "K-5436",
              "K-5437",
              "K-5438",
              "K-5439",
              "K-5440",
              "K-5441",
              "K-5442",
              "K-5443",
              "K-5444",
              "K-21-22",
              "K-23",
              "K-Rest",
            ],
          },
        },
        {
          code: "Alder",
          selection: {
            filter: "vs:AlleAldre00B",
            values: [],
          },
        },
        {
          code: "Tid",
          selection: {
            filter: "item",
            values: ["2023"],
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    };

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
              <option key={item.label} value={item.label}>
                {item.label} - {item.cityCode}
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
