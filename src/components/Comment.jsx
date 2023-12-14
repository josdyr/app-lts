import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Comment = () => {
  const [comment, setComment] = useState([]);
  const localURL = "http://localhost:5052/api/comment";
  const azureURL = "https://app-lts.azurewebsites.net/api/comment";
  const fetchData = async () => {
    try {
      const response = await fetch(localURL);
      if (!response.ok) {
        throw new Error(`HTTPS error! status: ${response.status}`);
      }
      const data = await response.json();
      setComment(data);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  function printHello(index) {
    console.log("Hello " + index);
  }
  const renderTable = () => {
    return comment.map((item, index) => {
      return (
        <tr key={index} onClick={() => printHello(item.id)}>
          <td>
            <Link to={`/comment/${item.id}`}>{item.id}</Link>
          </td>
          <td>{item.carId}</td>
          <td>{item.commentDescription}</td>
          <td>{item.user}</td>
        </tr>
      );
    });
  };
  return (
    <div className="appContainer">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>CarId</th>
            <th>CommentDescription</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default Comment;
