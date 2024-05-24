import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 10},
  { field: 'option', headerName: 'Options', width: 70,sortable: false },
  { field: 'vote', headerName: 'Vote', width: 20 },
];

// const rows = [
//   { id: 1, option : "yes",vote:34},
//   { id: 2, option : "no",vote:34}
// ];

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
