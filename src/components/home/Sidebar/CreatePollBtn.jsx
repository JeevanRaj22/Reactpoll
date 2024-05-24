import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreatePollBtn(){
    const navigate = useNavigate();
    function btnClick(){
        navigate("/CreatePoll");
    }
    return (
        <Button variant="contained" id="create-poll-btn" onClick={btnClick}>Create poll</Button>
    );
}

export default CreatePollBtn