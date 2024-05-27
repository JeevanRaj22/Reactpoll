// import logo from './logo.svg';
import React from 'react';
import { useState,useEffect } from 'react';
import './main.css';
import Heading from '../Header/Heading';
import SideBar from './Sidebar/SideBar';
import PollsTable from './PollsTable';
import { MainProvider } from './MainContext/MainContext';

function Main() {
  
  let getPolls= ()=>{
    fetch(api)
    .then((res)=> res.json())
    .then((polls)=>{
      setPolls(polls.data);
    })   
}
const [api,setApi] = useState("http://localhost:8000/polls");
const [polls,setPolls] = useState([]);
useEffect(
  getPolls,[api]
);
  return (
    <div className="poll">
      <Heading />
      <div className='poll-body'>
        <MainProvider value = {polls} >
          <SideBar setApi = {setApi}/>
          <PollsTable/>
        </MainProvider>
      </div>
    </div>
  )
}

export default Main;
