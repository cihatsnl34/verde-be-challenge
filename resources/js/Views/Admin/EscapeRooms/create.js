import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from './../Component/Layout/adminFront.layout'
import CustomInput from './../Component/Form/CustomInput';
import { CKEditor } from 'ckeditor4-react';
import swal from 'sweetalert';
const Create = (props) => {

  const [timeSlot, setTimeSlot] = useState([]);

  const handleSubmit = (values,{ resetForm, setSubmitting}) => {

    const data = new FormData();
      
      data.append('name',values.name);
      data.append('description',values.text);
      data.append('price',values.price);
      data.append('timeSlot',JSON.stringify(timeSlot));
      data.append('thema',values.thema);


      const config = {
        headers: {
          'Accept': 'application/json',
          'content-type':'multipart/form-data',
          'Authorization': 'Bearer ' + props.AuthStore.appState.user.access_token
        }
      }
      axios.post('/api/escapeRoom', data, config)
      .then((res) => {
        if(res.data.success){
          swal("Escape Rooms Added");
          resetForm({});
          setTimeSlot([]);
          setSubmitting(false);
          props.history.push('/admin/escapeRoom');
      }
      else 
      {
          swal(res.data.message);
          setSubmitting(false);
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
    console.log(event.target);
    timeSlot[index][event.target.name] = event.target.value;
    setTimeSlot([...timeSlot]);
};

  return (
    <Layout>
      <Formik
        initialValues={{
          name:'',
          price:'',
          text:'',
          thema:''
        }}
        onSubmit={handleSubmit}
        validationSchema={
          Yup.object().shape({
           name:Yup.string().required('Escape Room Name Required.'),
           price: Yup.number().positive("Must be more than 0").integer("Must be more than 0").required("Escape Room price required"),
           text:Yup.string().required('Escape Room Description Required.'),
           thema:Yup.string().required('Escape Room Thema Required.')
          })
        }
        >
        {({     
                values,
                handleChange,
                handleSubmit,
                handleBlur,
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
                <li className="nav-item">
                  <a className="nav-link" href="#wizard-progress-step2" data-toggle="tab">
                    2. Details
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
                      style={{ width: "50%" }}
                      aria-valuenow={50}
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
                  </div>
                  {/* END Step 1 */}
                  {/* Step 2 */}
                  <div className="tab-pane" id="wizard-progress-step2" role="tabpanel">
                  <div className="form-group">
                      <h2>Escape Rooms Description</h2>
                      <CKEditor
                        data={values.text}
                        onChange={(event) => {
                          const data = event.editor.getData();
                          setFieldValue('text', data);
                        }}
                      />
                    </div>
                    <CustomInput
                      title="Thema"
                      value={values.thema}
                      onChange={handleChange('thema')}
                      className="form-control"
                    />
                    <div className='form-group'>
                      <button type='button' onClick={newTimeSlot} className='btn btn-primary'>New Time Slot</button>
                      {
                        timeSlot.map((item, index) =>(
                          <div className='row mt-3'>
                            <div className='col-md-5'>
                              <label>Start Time:</label>
                              <input type='datetime-local' className='form-control' name = "startTime" onChange={(event) => changeTextInput(event,index)} value={item.startTime}/>
                            </div>
                            <div className='col-md-5'>
                              <label>End Time:</label>
                              <input type='datetime-local' className='form-control' name = "endTime" onChange={(event) => changeTextInput(event,index)} value={item.endTime}/>
                            </div>
                            <div style={{ display:'flex',justifyContent:'center',alignItems:'flex-end'}} className='col-md-1'>
                              <button onClick={() => removeTimeSlot(index)} type='button' className='btn btn-danger'>X</button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  {/* END Step 2 */}
                  
                </div>
                {/* END Steps Content */}
                {/* Steps Navigation */}
                <div className="block-content block-content-sm block-content-full bg-body-light rounded-bottom">
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-wizard="prev"
                      >
                        <i className="fa fa-angle-left mr-1" /> Previous
                      </button>
                    </div>
                    <div className="col-6 text-right">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-wizard="next"
                      >
                        Next <i className="fa fa-angle-right ml-1" />
                      </button>
                      <button
                        onClick={handleSubmit}
                        type='button'
                        className="btn btn-primary d-none"
                        data-wizard="finish"
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

export default inject("AuthStore")(observer(Create));