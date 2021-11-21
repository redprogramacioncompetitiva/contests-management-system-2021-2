import Head from 'next/head'
import { useState,forwardRef  } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import ContestsForm from '../components/ContestsForm'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


export default function Contests() {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
    const [tableData, setTableData] = useState([
      {id_contest:'C001',name:'20º RPC Contest Colombia 2021: Century Edition',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C002',name:'Final World Cup RPC 2020',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C003',name:'7° Regional Final Nooby Edition',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C004',name:'April loops 2021',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C005',name:'End of year 2021',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C006',name:'RCP Classification',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C007',name:'10° Bogota Edition Rpc',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},
      {id_contest:'C008',name:'Latam Code Contest',is:'2021-02-12 00:00:00',ie:'2021-02-13 00:00:00',cs:'2021-03-01 00:00:00',ce:'2021-03-01 12:00:00'},

      ])
    const columns=[
        { title: "Id", 
        field: "id_contest", 
        },
        { title: "Name", 
        field: "name", 
        align: "center",
        },
        { title: "Inscription Start", 
        field: "is", 
        },
        { title: "Inscription End", 
        field: "ie", 
        },
        { title: "Contest Start", 
        field: "cs", 
        },
        { title: "Contest End", 
        field: "ce", 
        },

    ]
    return (
            <div>
              <ContestsForm/>
                <MaterialTable columns={columns} 
                data={tableData}
                icons={tableIcons}
                title="Contest List"
                actions={[
                  {
                    icon:tableIcons.Delete,
                    tooltip:'Remove Contest',
                    onClick:(event,rowData)=>alert('You click edit contest: ' + rowData.name)
                  }
                ]}
                options={{
                  grouping: true,
                  filtering: true,
                  exportButton: true,
                }}
                editable={{
                  onRowAdd:(newRow)=> new Promise ((resolve,reject)=>{
                    setTableData([...tableData,newRow])
                    resolve();
                  }),
                  onRowUpdate:(newRow,oldRow)=> new Promise ((resolve,reject)=>{
                    const updateData=[...tableData]
                    updateData[oldRow.tableData.id]=newRow
                    setTableData(updateData)
                    resolve();
                  }),
                  onRowDelete:(selectedRow)=> new Promise ((resolve,reject)=>{
                    const updateData=[...tableData]
                    updateData.splice(selectedRow.tableData.id,1)
                    setTableData(updateData)
                    resolve();
                  })
                }}
                />
            
          </div>

    )
}