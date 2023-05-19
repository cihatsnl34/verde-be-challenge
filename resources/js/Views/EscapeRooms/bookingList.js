import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Layout from './../../Component/Layout/front.layout'
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
const Index = (props) => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState({
        filteredData: [],
        text: '',
        isFilter: false
    });

    useEffect(() => {
        axios.get(`/api/bookings`, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            if(res.data.success){
                setData(res.data.data);
                resetForm({});
            }
            else 
            {
                swal({
                    title: 'Dont have a bookings',
                    text: '',
                    icon: 'warning'
                })
            }
            console.log(res.data.data);
            
        })
            .catch(e => console.log(e));
    }, [refresh]);

    const filterItem = (e) => {
        const filterText = e.target.value;
        if (filterText != '') {
            const filteredItems = data.filter(
                (item) => (
                    item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
                )
            );

            setFilter({
                filteredData: filteredItems,
                text: filterText,
                isFilter: true
            })
        }
        else {
            setFilter({
                filteredData: [],
                text: '',
                isFilter: false
            })
        }
    };
    const deleteItem = (item) => {
        console.log(item);
        swal({
            title: 'Are you sure you want to delete?',
            text: 'Once deleted, data will not be restored.',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`/api/bookings/${item.id}`, {
                        headers: {
                            Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
                        }
                    }).then((res) => {
                        if (res.data.success) {
                            swal("Good job!", "Deleted", "success");
                        }
                        else {
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
                                        name: 'Escape Room Name',
                                        selector: 'escapeRoomName',
                                        sortable: true
                                    },
                                    {
                                        name: 'Start Time',
                                        selector: 'startTime',
                                        sortable: true
                                    },
                                    {
                                        name: 'End Time',
                                        selector: 'endTime',
                                        sortable: true
                                    },
                                    {
                                        name: 'Delete',
                                        cell: (item) => <button onClick={() => deleteItem(item)} className={"btn btn-danger"}>Delete</button>,
                                        button: true
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
export default inject("AuthStore")(observer(Index));