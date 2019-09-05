import React, { useEffect, useState } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  MarkSeries
} from "react-vis";
import "./Vis.scss"

const LineVis = ({
  data,
  runActivities,
  walkActivities,
  cycleActivities,
  otherActivities
}) => {

  const timestamp = new Date("January 1 2019").getTime();
  const ONE_DAY = 86400000;

  const [running, setRunning] = useState([]);
  const [walking, setWalking] = useState([]);
  const [cycling, setCycling] = useState([]);
  const [other, setOther] = useState([]);
  let otheritems = [];
  let cycleitems = [];
  let runitems = [];
  let walkitems = [];

  useEffect(() => {
    runActivities.sort((a, b) => {
      return new Date(a.ActivityDate) > new Date(b.ActivityDate) ? 1 : -1;
    });
    runActivities.forEach(element => {
      let date = new Date(element.ActivityDate);
      const newEle = {
        x: date,
        y: element.ElapsedTime / 60,
        size: element.ElapsedTime / 60
      };
      runitems.push(newEle);
    });
    walkActivities.sort((a, b) => {
      return new Date(a.ActivityDate) > new Date(b.ActivityDate) ? 1 : -1;
    });
    walkActivities.forEach(element => {
      let date = new Date(element.ActivityDate);
      const newEle = {
        x: date,
        y: element.ElapsedTime / 60,
        size: element.ElapsedTime / 60
      };
      walkitems.push(newEle);
    });
    cycleActivities.sort((a, b) => {
      return new Date(a.ActivityDate) > new Date(b.ActivityDate) ? 1 : -1;
    });
    cycleActivities.forEach(element => {
      let date = new Date(element.ActivityDate);
      const newEle = {
        x: date,
        y: element.ElapsedTime / 60,
        size: element.ElapsedTime / 60
      };
      cycleitems.push(newEle);
    });
    otherActivities.sort((a, b) => {
      return new Date(a.ActivityDate) > new Date(b.ActivityDate) ? 1 : -1;
    });
    otherActivities.forEach((element, index) => {
      let date = new Date(element.ActivityDate);
      const newEle = {
        x: date,
        y: element.ElapsedTime / 60,
        size: element.ElapsedTime / 60
      };
      otheritems.push(newEle);
    });
    setOther(otheritems);
    setCycling(cycleitems);
    setWalking(walkitems);
    setRunning(runitems);
  }, [runActivities, walkActivities, cycleActivities, otherActivities]);



  return (
    <div>
      <XYPlot
        width={1000}
        height={400}
        xDomain={[timestamp - 2 * ONE_DAY, timestamp + 216 * ONE_DAY]}
        xType="time"
      
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis  tickLabelAngle={-90} tickPadding={3}/>
        <YAxis title="Time Ellapsed in Minutes" />
        <MarkSeries
          data={other}
          style={{
            strokeLinejoin: "round",
            fill: "#85144b",
            opacity: ".85",
            stroke: "transparent"
          }}
        />
        <MarkSeries
          data={cycling}
          style={{
            strokeLinejoin: "round",
            fill: "#001f3f",
            opacity: ".85",
            stroke: "transparent"
          }}
        />
        <MarkSeries
          data={running}
          style={{
            strokeLinejoin: "round",
            fill: "#ff4136",
            opacity: ".85",
            stroke: "transparent"
          }}
        />
        <MarkSeries
          data={walking}
          style={{
            strokeLinejoin: "round",
            fill: "#3d9970",
            opacity: ".85",
            stroke: "transparent"
          }}
        />
      </XYPlot>
    </div>
  );
};

export default LineVis;
