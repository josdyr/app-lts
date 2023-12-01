import React from "react";
import { useParams } from "react-router-dom";

export const ObjectDetail = () => {
  const params = useParams();
  const id = params.id;
  return <div>Deatils about {id}</div>;
};
