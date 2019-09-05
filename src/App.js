import React, {useEffect, useState} from 'react';

import SportIcon from './components/svg';
import {Run, All, Walk, Cycle, Other} from './sports/index';

import './App.scss';

const SteinStore = require("stein-js-client");

function App() {
  const apiURL = "https://api.steinhq.com/v1/storages/5d6d3d441ec06404b5572fa9";
  const store = new SteinStore(apiURL);
 
  const [allActivities, setActivities] = useState([]);
  const [runData, setRData] = useState([]);
  const [rideData, setRiData] = useState([]);
  const [walkData, setwData] = useState([]);
  const [otherData, setOData] = useState([]);
  const fetchData = () =>{
    store.read("Activities", {limit:243, ofset:1}).then(data => {
     
      setActivities(data)
      const running = data.filter((act)=>{
        return act.ActivityType.includes("Run");
      })
      const walking = data.filter((act)=>{
        return act.ActivityType.includes("Walk");
      })
      const riding = data.filter((act)=>{
        return act.ActivityType.includes("Ride");
      })
      const other = data.filter((act)=>{
        return !act.ActivityType.includes("Ride") && !act.ActivityType.includes("Walk") && !act.ActivityType.includes("Run");
      })
      setRData(running)
      setRiData(riding)
      setwData(walking)
      setOData(other)
   
      })
  
  }

  useEffect(()=>{
    if (allActivities.length === 0) fetchData();
  })

  const [activeTab, setTab] = useState("ALL");
  const [activeSport, setSport] = useState(null);
  useEffect(()=>{
   
    
    switch(activeTab){
      case "ALL":
          setSport( <All 
            allActivities={allActivities} 
            runActivities={runData} 
            walkActivities={walkData}
            cycleActivities={rideData} 
            otherActivities={otherData}
            />)
      break;
      case "RUN":
          setSport( <Run runActivities={runData} />)
      break;
      case "WALK":
      setSport( <Walk walkActivities={walkData} />)
      break;
      case "CYCLE":
      setSport( <Cycle cycleActivities={rideData} />)
      break;
      case "OTHER":
      setSport( <Other otherActivities={otherData} />)
      break;
      default:
        break;
    }

  },[activeTab, allActivities, runData, walkData, rideData, otherData])


  return (
    <div className="App">
      <section className="App__tabs">
        <button aria-label="Look at All Data" onClick={()=>{setTab("ALL")}}><SportIcon type="All" /></button>
        {/* <button aria-label="Look at Running Data" onClick={()=>{setTab("RUN")}}><SportIcon type="Run" /></button>
        <button aria-label="Look at Walking Data" onClick={()=>{setTab("WALK")}}><SportIcon type="Walk" /></button>
        <button aria-label="Look at Cycling Data" onClick={()=>{setTab("CYCLE")}}><SportIcon type="Cycle" /></button>
        <button aria-label="Look at Other Sports Data" onClick={()=>{setTab("OTHER")}}><SportIcon type="Other" /></button> */}

      </section>
      <section className="App__sport">
        {activeSport}
      </section>
    
    </div>
  );
}

export default App;
