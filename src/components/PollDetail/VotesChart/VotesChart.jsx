import React from 'react';
import {Chart} from 'react-google-charts';

 
function VotesChart(props) {
  const opts = {
    pieSliceText : "value"
  }
  
  return (
    <div className="votes-chart">
        <Chart
        chartType="PieChart"
        data={props.options}
        width={"100%"}
        options ={opts}
        />
        <p>Total votes : {props.totalVotes}</p>
    </div>
  
  )
}

export default VotesChart