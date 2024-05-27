import React from 'react';
import {useState} from 'react'
import { Button } from '@mui/material';


function Filter(props) {
  const [selectedTags,setSelectedTags] = useState([]);
  let handleChange = (e) => {
    let tag = e.target.value;
    if (e.target.checked){
      setSelectedTags( (tags)=> [...tags,tag]);
      
    }
    else{
      setSelectedTags((tags)=> tags.filter((element)=> element !== tag));
    }
  }

  let getPollByTags = ()=>{
    console.log(selectedTags)
    if(selectedTags.length !==0){
      props.setApi( (api)=> `http://localhost:8000/polls?tags=${selectedTags.join(",")}`);
    }
    else{
      props.setApi("http://localhost:8000/polls");
    }
  }
  return (
    <ul className="poll-list">
      { props.tags.map((tag)=>
          <li><input type="checkbox"  name = "tags" value={tag} onChange = {handleChange}/> {tag}</li>
      )}
        <li><Button variant='outlined' color="inherit"size="small" id="filter-btn"onClick={getPollByTags}>Filter by tags</Button></li>
    </ul>
  )
}

export default Filter