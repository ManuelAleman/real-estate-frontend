import React, { useState, useEffect } from "react";

interface MyHouseInfo {
  id: string;
}

const MyHouses = ({ id }: MyHouseInfo) => {
  const [myHouses, setMyHouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/estates/getEstates")
      .then((response) => response.json())
      .then((data) => {
        data = data.estates;
        setMyHouses(data);
        console.log(data);
      });
  }, []);

  return <div>{id}</div>;
};

export default MyHouses;
