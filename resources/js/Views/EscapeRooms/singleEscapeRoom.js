import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Layout from './../../Component/Layout/front.layout'

const SingleEscapeRooms = (props) => {
    const { params } = props.match;
    const [data, setData] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        timeSlots: ''
    });
    const handleChange = (e) => {
        setFormData({
            ['timeSlots']: e.target.value
        });
    };
    const handleSubmit = (e) => {
        const data = new FormData();
        data.append('timeSlots', formData['timeSlots']);
        e.preventDefault();
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }
        
        axios.post('/api/bookings', data, config)
            .then((res) => {
                if (res.data.success) {
                    swal("Success Booking");
                    setSubmitting(false);
                    window.location.reload();
                }
                else {
                    swal(res.data.message);
                    setSubmitting(false);
                }
            })
            .catch(e => console.log(e));
    };
    useEffect(() => {
        axios.get(`/api/escape-rooms/${params.id}`, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setData(res.data.data);
            setLoading(false);
        })
            .catch(e => console.log(e));
    }, []);
    useEffect(() => {
        axios.get(`/api/escape-rooms/${params.id}/time-slots`, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setTimeSlots(res.data.timeSlots);
            setLoading(false);
        })
            .catch(e => console.log(e));
    }, []);
    if (loading) return <div>Loading</div>
    return (
        <Layout>

            <div className="container">
                <div className="bg-body-light">
                    <div className="content content-full">
                        <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                            <h1 className="flex-sm-fill h3 my-2">
                                Single Escape Room
                            </h1>
                        </div>
                    </div>
                </div>

                <a className="block block-link-shadow text-center">

                    <div className="block-header">
                        <h3 className="block-title">Escape Room</h3>
                    </div>
                    <div className="block-content">
                        <div className="font-size-sm py-2">
                            <p>
                                Name : <strong>{data[0]['name']}</strong>
                            </p>
                            <p>
                                Thema : <strong>{data[0]['thema']}</strong>
                            </p>
                            <p>
                                Price : <strong>{data[0]['price']}</strong>
                            </p>
                            <p>
                                Description
                            </p>
                            <p>
                                <div dangerouslySetInnerHTML={{ __html: data[0]['description'] }} />
                            </p>
                            <p>
                                Time Slots
                            </p>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    {timeSlots.map(item => (
                                        <div className="form-check" key={item.id}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id={`example-radios-default${item.id}`}
                                                name="example-radios-default"
                                                onChange={handleChange}
                                                value={item.id}
                                            />
                                            <label className="form-check-label" htmlFor={`example-radios-default${item.id}`}>
                                                {item.startTime} - {item.endTime}
                                            </label>
                                        </div>
                                    ))}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="block-content block-content-full bg-body-light">
                        <button
                            className="btn btn-secondary px-4"
                            onClick={handleSubmit}
                            type='button'
                        >
                            Booking
                        </button>
                    </div>
                </a>
            </div>

        </Layout>
    )
};
export default inject("AuthStore")(observer(SingleEscapeRooms));