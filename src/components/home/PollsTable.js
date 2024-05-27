import React from 'react';
import { useContext,useState } from 'react'
import { MainContext } from './MainContext/MainContext';
//import { TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper,TablePagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Number',flex : 1},
  { field: 'Question', headerName: 'Poll Question', 
  renderCell: (params) => {
    return <a class="question-text"href={"PollDetail/"+params.value["QuestionId"]}>{params.value.Question}</a>;
  },flex :4},
  { field: 'vote', headerName: 'Total Votes',flex : 1},
  { field: 'tags', headerName: 'Tags',flex : 1},
];

let rows = [];

export let getTotalVotes = (Votes)=>{
  let total = 0;
  for(const key in Votes){
    
    total += Votes[key]
  }
  return total;
}
function PollsTable() {
  const polls = useContext(MainContext);

  polls.forEach((poll,index)=>{
    if(index == 0){
      rows = []
      return;
    }
    rows.push(
      {
        id : index,
        Question : poll,
        vote:getTotalVotes(poll["OptionVote"]),
        tags:poll["Tags"].join(","),
      })
  })


  //for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - polls.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  return (
    <div className="poll-table">
       <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {/* <Paper>
          <TableContainer  sx={{"border-spacing": 0}} container = {Paper}>
            <Table>
            <TableHead >
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Poll question</TableCell>
              <TableCell>Total votes</TableCell>
              <TableCell>Tags</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            { (rowsPerPage > 0
            ? polls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : polls
          ).map((poll,index)=>(
              <TableRow key={poll["QuestionId"]}>
                <TableCell>{index+1}</TableCell>
                <TableCell><a class="question-text"href={"PollDetail/"+poll["QuestionId"]}>{poll["Question"]}</a></TableCell>
                <TableCell align='center'>{getTotalVotes(poll["OptionVote"])}</TableCell>
                <TableCell>{poll["Tags"].join(",")}</TableCell>
              </TableRow>
            
            ))
            }
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
            </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component = "div"
            rowsPerPageOptions={[3,5,10]} 
            count={polls.length} 
            rowsPerPage={rowsPerPage} 
            page={page} 
            onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage} 
          />
          </Paper> */}
        </div>
  )
}

export default PollsTable