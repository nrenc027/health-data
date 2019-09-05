import React, { useState, useEffect } from "react";

import { RadialChart } from "react-vis";

const PieVis = ({ data }) => {
  const [visData, setVisData] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      let items = [];
      data.forEach(element => {
        let newEl = {};
        newEl.label = element.name;
        newEl.angle = element.freq;
        newEl.color = element.fill;
        items.push(newEl);
      });

      setVisData(items);
    }
  }, [data]);
  return (
    <div>
      <RadialChart
        style={{ strokeWidth: 0 }}
        data={visData}
        width={300}
        height={300}
        colorType={"literal"}
        colorDomain={[0, 100]}
        colorRange={[0, 10]}
      />

      <ul className="Sport__legend">
        {visData.map((dat, index) => {
          return (
            <li key={`item-${index}`}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill={dat.color}/>
              </svg>
              <p>{dat.label} ({dat.angle})</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default PieVis;
