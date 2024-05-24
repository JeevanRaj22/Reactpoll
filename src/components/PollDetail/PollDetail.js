import React from 'react'
import "./PollDetail.css"
import Heading from '../Header/Heading';
import VoteDetailsTable from './VoteDetailsTable/VoteDetailsTable';
import VotesChart from './VotesChart/VotesChart';
import { useParams,useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getTotalVotes } from '../home/PollsTable';
import { Button } from '@mui/material';


function PollDetail() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [poll,setPoll] = useState({})
  let getPoll=()=>{
    fetch(`http://localhost:8000/polls/${id}`)
    .then((res)=> res.json())
    .then((polls)=>{
      setPoll(polls.data);
    })   
  }
  
  useEffect(getPoll
  ,[id])

  let voteData = [["Vote","VoteCount"]]
  for (const key in poll["OptionVote"]){
    let voteArr = [key,poll["OptionVote"][key]]
    voteData.push(voteArr)
  }
  const totalVotes = getTotalVotes(poll["OptionVote"]);

  const navigateToVotePage = ()=>{
    navigate(
      `/Vote/${id}`, 
      {state: { 
        Question : poll["Question"],
        id : Number(id),
        options :voteData.map((e,i)=> i===0? e:e[0])
      }})}
  return (
    <div className ="poll">
        <Heading />
        <div className="poll-detail-body">
            <div className="poll-detail">
              <div className="poll-question">
                  <h2>{poll["Question"]}</h2>
                    <Button variant='contained' 
                    id="question-btn" 
                    onClick = {navigateToVotePage} >vote on this poll</Button> 
              </div>
              <div className="poll-ans">
                  <VoteDetailsTable options={voteData} />
                  <div className="tags">Tags: {poll["Tags"] && poll["Tags"].join(",")}</div>
              </div>
            </div>
            <VotesChart options={voteData} totalVotes = {totalVotes}/>
        </div>
    </div>
  );
}

export default PollDetail