import React, {useState, useEffect} from 'react';
import PieVis from '../components/PieVis';
import LineVis from '../components/LineVis';
import './Sport.scss';


const All =({
  allActivities,
  runActivities,
  walkActivities,
  cycleActivities,
  otherActivities})=>{
 
    const [visualData, setVisualData] = useState([])
    useEffect(()=>{
    let allData = [];
    if(allActivities.length > 0){

    const running = allActivities.filter((act)=>{
        return act.ActivityType.includes("Run");
      })
      let runs = {
        name: 'Running', freq: running.length , fill: '#FF4136',
      }
      allData.push(runs);
      const walking = allActivities.filter((act)=>{
        return act.ActivityType.includes("Walk");
      })
      let walks = {
        name: 'Walking', freq: walking.length , fill: '#3D9970',
      }
      allData.push(walks);
      const riding = allActivities.filter((act)=>{
        return act.ActivityType.includes("Ride");
      })
      let rides = {
        name: 'Cycling', freq: riding.length , fill: '#001F3F',
      }
      allData.push(rides); 
      const other = allActivities.filter((act)=>{
        return !act.ActivityType.includes("Ride") && !act.ActivityType.includes("Walk") && !act.ActivityType.includes("Run");
      })
      let others = {
        name: 'Other Exercises', freq: other.length , fill: '#85144B',
      }
      allData.push(others); 
   
      setVisualData(allData.sort((a,b)=>(a.freq > b.freq ? 1 :-1)));}
    }, [allActivities])


    return(
        <section className="Sport">
            <div className="Sport__sect1"><PieVis  data={visualData}/></div>
            <div className="Sport__sect2">
              <LineVis  
                data={allActivities}
                runActivities={runActivities}
                walkActivities={walkActivities}
                cycleActivities={cycleActivities}
                otherActivities={otherActivities}
              />
              </div>
            <div className="Sport__sect3"><PieVis  data={visualData}/></div>
            {/* <div className="Sport__sect4"><PieVis  data={visualData}/></div> */}

        </section>
    );
}
export default All;