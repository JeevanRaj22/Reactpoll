import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../Header/Heading'
import './CreatePoll.css'
import { Button } from '@mui/material'



function CreatePoll() {
    const navigate = useNavigate();
    let [optionList,setOptionList] = useState([
        {
            value : ""
        },
        {
            value : ""
        }
    ]
    )
    let handleOptionsChange = (e,index)=> {
       let  newOptionList = [ ...optionList]
        newOptionList[index].value = e.target.value
        setOptionList(newOptionList)
    }

    let addOptionField = (e)=>{
        
        let newOptionList = [ ...optionList,{ value : ""}];
        setOptionList(newOptionList);
    }
    let removeOptionField = (index)=>{
        if(optionList.length>2){
        let newOptionList = optionList.filter((element,i)=>i!==index)
        console.log(newOptionList)
        setOptionList(newOptionList);
        }
        else{
            alert("there must be 2 options for a poll")
        }
        
    }

    let handleChange = (e) => {
       let q = e.target.Question.value;
       let t = e.target.Tags.value.split(",");
       let opts = optionList.map( (opt) => {return opt["value"]})
       let options = {}
       opts.forEach((opt)=>{
        if(opt){
            options = { ...options,[opt.split()]:0}
        }
       })
       const data = {
            "Question":q,
            "OptionVote":options,
            "Tags":t
       }
       const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:8000/polls/",config)
        .then((res)=>res.json())
        .then((res)=> {
            if(!res.success){alert("error")}
            else{alert(res.msg);}
        })
        navigate("/")
    }
  return (
    <div className="poll">
        <Heading />
        <div className="create-poll-body">
            <div className="poll-create-form">
                <form onSubmit={(e)=>{ 
                    e.preventDefault();
                    handleChange(e)}} >
                    <div className="form-field">
                        <h4>Question</h4>
                        <input id = "Question-field" type="text" name="Question" className="input-field input-field-hover" placeholder="Type your question here" required/>
                    </div>
                    <div className="form-field">
                        <h3>Answer Options</h3>
                        { optionList.map((opt,index)=>

                            (<div key={index} className="option-field"><input 
                            type="text" 
                            name={`option${index+1}`}
                            className="input-field"
                            placeholder={`Option ${index+1}`}
                            value = {opt.value}
                            onChange={(e)=>{handleOptionsChange(e,index)}} 
                            />
                            {optionList.length > 2 &&
                            <span onClick={()=>{removeOptionField(index)}}className="material-symbols-outlined">do_not_disturb_on</span>
                            }

                            
                          </div>
                            )
                            

                        )}
                       
                        <Button color="inherit" size='small' id="add-options-btn" onClick={(e)=>{
                            e.preventDefault();
                            addOptionField()}}>Add options</Button>
                    </div>
                    <div className="form-field">
                        <h4>Comma Separated Tags</h4>
                        <input type="text" name="Tags" className="input-field input-field-hover"  placeholder="Tags:tag1,tag2" />
                    </div>
            
                      <Button variant="contained" size="large" type="submit" id="submit-btn">Create</Button>
    
                </form>
            </div> 
        </div>

    </div>
  )
}

export default CreatePoll