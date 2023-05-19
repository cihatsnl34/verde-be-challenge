import { inject, observer } from 'mobx-react';
import React,{ useEffect , useState} from 'react';
import Layout from './../Component/Layout/adminFront.layout'
import DataTable from 'react-data-table-component';
import SubHeaderComponent from '../Component/Form/SubHeaderComponent';
import ExpandedComponent from '../Component/Form/ExpandedComponent';
import swal from 'sweetalert';
const Index = (props) => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [filter,setFilter] = useState({
        filteredData:[],
        text:'',
        isFilter:false
    });

    useEffect(() => {
        axios.get(`/api/escapeRoom`,{
            headers:{
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
           setData(res.data.data);
        })
        .catch(e => console.log(e)); 
    },[refresh]);

    const filterItem = (e) => {
        const filterText = e.target.value;
        if(filterText != '')
        {
            const filteredItems = data.filter(
                (item) => (
                    item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.thema && item.thema.toLowerCase().includes(filterText.toLowerCase()) 
                )
            );

            setFilter({
                filteredData:filteredItems,
                text:filterText,
                isFilter:true
            })
        }
        else 
        {
            setFilter({
                filteredData:[],
                text:'',
                isFilter:false
            })
        }
    };
    const deleteItem = (item) => {
        swal({
            title:'Are you sure you want to delete?',
            text:'Once deleted, data will not be restored.',
            icon:'warning',
            buttons:true,
            dangerMode:true
        })
        .then((willDelete) => {
            if(willDelete){
                axios.delete(`/api/escapeRoom/${item.id}`,{
                    headers:{
                        Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
                    }
                }).then((res) => {
                    if(res.data.success){
                        setRefresh(true);
                    }
                    else
                    {
                        swal(res.data.message);
                    }
                })
                .catch(e => console.log(e));
            }   
        })
    }
   

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <DataTable 
                            columns={
                                [
                                    {
                                        name: 'Name',
                                        selector:'name',
                                        sortable:true
                                    },
                                    {
                                        name: 'Thema',
                                        selector:'thema',
                                        sortable:true
                                    },
                                    {
                                        name: 'Price',
                                        selector:'price',
                                        sortable:true
                                    },
                                    {
                                        name:'Edit',
                                        cell:(item) => <button onClick={() => props.history.push(({
                                            pathname: `/admin/escapeRoom/edit/${item.id}`
                                        }))} className={"btn btn-primary"}>Edit</button>
                                    },
                                    {
                                        name:'Delete',
                                        cell:(item) => <button onClick={() => deleteItem(item)}  className={"btn btn-danger"}>Delete</button>,
                                        button:true
                                    }
                                ]
                            }
                            subHeader={true}
                            responsive={true}
                            hover={true}
                            fixedHeader
                            pagination
                            expandableRows
                            expandableRowsComponent={<ExpandedComponent/>}
                            data={(filter.isFilter) ? filter.filteredData : data}
                            subHeaderComponent={<SubHeaderComponent filter={filterItem} action ={{ class:'btn btn-success',uri:() => props.history.push('/admin/escapeRoom/create'),title:'New Escape Room'}} />}
                        />
                    </div>
                </div>
            </div>
            
        </Layout>
    )
};
export default inject("AuthStore")(observer(Index));