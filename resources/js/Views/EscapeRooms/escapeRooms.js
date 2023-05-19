import { inject, observer } from 'mobx-react';
import React,{ useEffect , useState} from 'react';
import Layout from './../../Component/Layout/front.layout'
import DataTable from 'react-data-table-component';
const EscapeRooms = (props) => {
    const [data,setData] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const [filter,setFilter] = useState({
        filteredData:[],
        text:'',
        isFilter:false
    });

    useEffect(() => {
        axios.get(`/api/escape-rooms`,{
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
   

    return (
        <Layout>
            <div class="bg-body-light">
                    <div class="content content-full">
                        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                            <h1 class="flex-sm-fill h3 my-2">
                                Escape Room 
                            </h1>
                        </div>
                    </div>
                </div>
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
                                        name:'Review',
                                        cell:(item) => <button onClick={() => props.history.push(({
                                            pathname: `/escapeRoom/${item.id}`
                                        }))} className={"btn btn-primary"}>Review</button>
                                    }
                                ]
                            }
                            subHeader={true}
                            responsive={true}
                            hover={true}
                            fixedHeader
                            pagination
                            data={(filter.isFilter) ? filter.filteredData : data}
                        />
                    </div>
                </div>
            </div>
            
        </Layout>
    )
};
export default inject("AuthStore")(observer(EscapeRooms));