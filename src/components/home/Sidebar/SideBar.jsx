import React from 'react';
import {useEffect, useState} from 'react';

import CreatePollBtn from './CreatePollBtn';
import Filter from './Filter';

function SideBar(props) {
  let getTags= ()=>{
    fetch("http://localhost:8000/polls/tags")
    .then((res)=> res.json())
    .then((tags)=>{
      setTags(tags.data);
    })   
  }
const [tags,setTags] = useState([]);

useEffect(getTags,[]);

    
  return (
    <div className="create-poll">
          <CreatePollBtn />
          <Filter tags = {tags} setApi = {props.setApi}/>
        </div>
  )
}

export default SideBar