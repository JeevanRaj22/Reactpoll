import React from 'react'
import Heading from '../Header/Heading'
import './Vote.css'
import { useLocation ,useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';


function Vote() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    let formSubmit = (e) => {
        let option = e.target.vote.value
        
        const data = {
             "incrementOption": option
        }
        const config = {
             method: 'PUT',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(data)
         }
         fetch(`http://localhost:8000/polls/${state.id}`,config)
         .then((res)=>res.json())
         .then((res)=> {
             if(!res.success){alert("error")}
             else{alert(res.msg);}
         })
         navigate(`/PollDetail/${state.id}`)
     }
  return (
    <div className='poll'>
        <Heading />
        <div className = "vote-body">
            <div class="poll-question">
                <h2>{state["Question"]}</h2>
            </div>
            <div class="poll-ans-form">
                <form onSubmit={(e)=>{e.preventDefault();formSubmit(e)}}>
                    { state["options"].map((e,index)=>{
                        if(index===0){
                            return null
                        }
                        return(
                            <><input type="radio" name="vote" value={e} className="radio-btn" required/> {e}<br /></>
                        )})}
                    <Button variant='contained' fullWidth type="submit" id="vote-btn">Vote</Button>
                </form>            
            </div>
        </div>
    </div>
  )
}

export default Vote