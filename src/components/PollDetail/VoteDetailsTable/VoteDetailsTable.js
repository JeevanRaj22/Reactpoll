import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID',flex : 1},
  { field: 'option', headerName: 'Options',flex :3},
  { field: 'vote', headerName: 'Vote',flex : 1},
];

let rows = []


export default function VoteDetailsTable(props) {
  props.options.forEach((option,index)=>{
    if(index == 0){
      rows = []
      return;
    }
    rows.push({id : index,option : option[0],vote:option[1]})
  })
  return (
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
  );
}
