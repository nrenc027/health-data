import React, { useState, useEffect } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

const BarVis = ({
  data,
  runActivities,
  walkActivities,
  cycleActivities,
  otherActivities
}) => {
  const [all, setall] = useState(0);
  const [running, setRunning] = useState(0);
  const [walking, setWalking] = useState(0);
  const [cycling, setCycling] = useState(0);
  let allMi = 0;
  let cycleMi = 0;
  let runMi = 0;
  let walkMi = 0;

  useEffect(() => {
    if (data.length > 0) {
      data.forEach(element => {
        allMi += Number(element.Distance);
      });

      runActivities.forEach(element => {
        runMi += Number(element.Distance);
      });
      walkActivities.forEach(element => {
        walkMi += Number(element.Distance);
      });
      cycleActivities.forEach(element => {
        cycleMi += Number(element.Distance);
      });
      setCycling(cycleMi);
      setWalking(walkMi);
      setRunning(runMi);
      setall(allMi);
    }
  }, [data]);

  return (
    <div>
      <XYPlot width={300} height={300} stackBy="y" xType="ordinal">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          cluster="Distance"
          color="#3d9970"
          data={[
            { x: "Run", y: running },
            { x: "Walk", y: walking },
            { x: "Cycle", y: cycling }
          ]}
        />
        <VerticalBarSeries
          cluster="Distance"
          color="#001f3f"
          data={[
            { x: "Run", y: all - running },
            { x: "Walk", y: all - walking },
            { x: "Cycle", y: all - cycling }
          ]}
        />
      </XYPlot>
    </div>
  );
};
export default BarVis;
