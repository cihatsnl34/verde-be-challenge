import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from './../Component/Layout/adminFront.layout'
import CustomInput from './../Component/Form/CustomInput';
import { CKEditor } from 'ckeditor4-react';
import swal from 'sweetalert';
const Edit = (props) => {

  const { params } = props.match;
  const [timeSlot, setTimeSlot] = useState([]);
  const [escapeRoom, setEscapeRoom] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSubmit = (values,{ resetForm, setSubmitting}) => {

    const data = new FormData();

      data.append('name',values.name);
      data.append('description',values.text);
      data.append('price',values.price);
      data.append('timeSlot',JSON.stringify(timeSlot));
      data.append('thema',values.thema);
      data.append('_method', 'put');

      const config = {
        headers: {
          'Accept': 'application/json',
          'content-type':'multipart/form-data',
          'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
        }
      }
      axios.post(`/api/escapeRoom/${escapeRoom.id}`, data, config)
      .then((res) => {
        if(res.data.success){
          setSubmitting(false)
      }
      else 
      {
          swal(res.data.message);
          setSubmitting(true);
      }
      })
      .catch(e => console.log(e));
  };

  const newTimeSlot = () => {
    setTimeSlot([...timeSlot, { startTime:'', endTime:''}])
  }

  const removeTimeSlot = (index) => {
    const oldTimeSlot = timeSlot;
    oldTimeSlot.splice(index,1);
    setTimeSlot([...oldTimeSlot]);
  }
  
  const changeTextInput = (event,index) => {
    console.log(event.target.value,index);
    timeSlot[index][event.target.name] = event.target.value;
    setTimeSlot([...timeSlot]);
};

useEffect(() => {
  axios.get(`/api/escapeRoom/${params.id}/edit`, {
    headers: {
      Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
    }
  }).then((res) => {
    if(res.data.success) {
        console.log('sea');
        console.log(res.data);
        setEscapeRoom(res.data.escapeRoom);
        setTimeSlot(res.data.escapeRoom.time_slot);
        setLoading(false);
    }
    else {
        swal(res.data.message);
    }
  })
    .catch(e => console.log(e));
}, [])
  
  if(loading) return <div>Loading</div>

  return (
    
    <Layout>
      <Formik
        initialValues={{
          name:escapeRoom.name,
          price:escapeRoom.price,
          description:escapeRoom.description,
          thema:escapeRoom.thema,
        }}
        onSubmit={handleSubmit}
        validationSchema={
          Yup.object().shape({
            name:Yup.string().required('Escape Room Name Required.'),
            price: Yup.number().positive("Must be more than 0").integer("Must be more than 0").required("Escape Room price required"),
            description:Yup.string().required('Escape Room Description Required.'),
            thema:Yup.string().required('Escape Room Thema Required.')
        
          })
        }
        >
        {({     
                values,
                handleChange,
                handleSubmit,
                errors,
                isValid,
                isSubmitting,
                setFieldValue,
                touched 
          }) => (
          <div className="col-md-12">
            {/* Progress Wizard */}
            <div className="js-wizard-simple block block">
              {/* Step Tabs */}
              <ul className="nav nav-tabs nav-tabs-block nav-justified" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#wizard-progress-step1"
                    data-toggle="tab"
                  >
                    1. Personal
                  </a>
                </li>
              </ul>
              {/* END Step Tabs */}
              {/* Form */}
              <form action="#">
                {/* Wizard Progress Bar */}
                <div className="block-content block-content-sm">
                  <div className="progress" data-wizard="progress" style={{ height: 8 }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* END Wizard Progress Bar */}
                {/* Steps Content */}
                <div
                  className="block-content block-content-full tab-content px-md-5"
                  style={{ minHeight: 300 }}
                >
                  {/* Step 1 */}
                  <div
                    className="tab-pane active"
                    id="wizard-progress-step1"
                    role="tabpanel"
                  >
                    <CustomInput
                      title="Escape Room Name"
                      value={values.name}
                      onChange={handleChange('name')}
                      className="form-control"
                    />
                    {(errors.name && touched.name) && <p className='form-error'>{errors.name}</p>}

                    <CustomInput
                      title="Price"
                      value={values.price}
                      onChange={handleChange('price')}
                      className="form-control"
                    />
                    {(errors.price && touched.price) && <p className='form-error'>{errors.price}</p>}
                    <div className="form-group">
                      <h2>Escape Room Description</h2>
                      <CKEditor
                        data={values.description}
                        onChange={(event) => {
                          const data = event.editor.getData();
                          setFieldValue('description', data);
                        }}
                      />
                    </div>
                    <div className='form-group'>
                      <button type='button' onClick={newTimeSlot} className='btn btn-primary'>New Time Slot</button>
                      {
                        timeSlot.map((item, index) =>(
                          <div className='row mt-3'>
                            <div className='col-md-5'>
                              <label>Start Time:</label>
                              <input type='text' className='form-control' name = "startTime" onChange={(event) => changeTextInput(event,index)} value={item.startTime}/>
                            </div>
                            <div className='col-md-5'>
                              <label>End Time:</label>
                              <input type='text' className='form-control' name = "endTime" onChange={(event) => changeTextInput(event,index)} value={item.endTime}/>
                            </div>
                            <div style={{ display:'flex',justifyContent:'center',alignItems:'flex-end'}} className='col-md-1'>
                              <button onClick={() => removeTimeSlot(index)} type='button' className='btn btn-danger'>X</button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  {/* END Step 1 */}
                </div>
                {/* END Steps Content */}
                {/* Steps Navigation */}
                <div className="block-content block-content-sm block-content-full bg-body-light rounded-bottom">
                <div className="row">
                    <div className="col-12 text-right">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Escape Room Create 
                      </button>
                      
                    </div>
                  </div>
                </div>
                {/* END Steps Navigation */}
              </form>
              {/* END Form */}
            </div>
            {/* END Progress Wizard */}
          </div>
        )}
      </Formik>
    </Layout>
  )
};

export default inject("AuthStore")(observer(Edit));