import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const Login = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        if(props.AuthStore.appState != null) {
            if(props.AuthStore.appState.isLoggedIn) {
                return props.history.push('/');
            }
        }
    });
 
    const validationSchema = Yup.object().shape({
        email:Yup
            .string()
            .email('Email is not valid')
            .required('Email is not empty'),
        password:Yup.string().required('Password is not empty')
                
    });
    const handleSubmit = (values) => {
        axios.post('/api/auth/login', {...values})
            .then((res) => {
                if(res.data.success){
                    
                    const userData = {
                      id:res.data.id,
                      name:res.data.name,
                      email:res.data.email,
                      access_token:res.data.access_token
                    };
                    const appState = {
                      isLoggedIn:true,
                      user:userData
                    };
                    props.AuthStore.saveToken(appState);
                    if(res.data.role == 0) {
                        props.history.push('/');
                    }
                    if(res.data.role == 1) {
                        props.history.push('/admin');
                    }
                  }
                  else 
                  {
                    alert('Giriş Yapamadiniz');
                  }
          
                })
            .catch(error => {
                if(error.response){
                  let err = error.response.data;
                  setErrors(err.errors);
                  //alert(err.errors)
                }
                else if (error.request){
                  let err = error.request;
                  setError(err);
                }
                else 
                {
                  setError(error.message);
                }
            });
    }
    let arr = [];
    Object.values(errors).forEach(value => {
      arr.push(value)
    });
    return(
        <Formik 
        initialValues={{
          email:'',
          password:'',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        >
        {({ handleSubmit, handleChange, values, errors, isValid, isSubmitting, touched }) => (
        <div id="page-container">
            <main id="main-container">
                <div className="bg-image">
                    <div className="hero-static bg-white-95">
                        <div className="content">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-lg-6 col-xl-4">
                                    <div className="block block-themed block-fx-shadow mb-0">
                                        <div className="block-header">
                                            <h3 className="block-title">Sign In</h3>
                                            <div className="block-options">
                                                <a className="btn-block-option font-size-sm" href="op_auth_reminder.html">Forgot Password?</a>
                                                <a className="btn-block-option" href="op_auth_signup.html" data-toggle="tooltip" data-placement="left" title="New Account">
                                                    <i className="fa fa-user-plus"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="block-content">
                                            <div className="p-sm-3 px-lg-4 py-lg-5">
                                                <h1 className="mb-2">OneUI</h1>
                                                <p>Welcome, please login.</p>
                                                { arr.length != 0 &&  arr.map((item) => (<p>{item}</p>))}
                                                { error != '' &&  (<p>{error}</p>)}
                                                <form onSubmit={handleSubmit} className="js-validation-signin" action="be_pages_auth_all.html" method="POST">
                                                    <div className="py-3">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control form-control-alt form-control-lg" id="login-username" name="email" onChange={handleChange('email')} values={values.email} placeholder="Email"/>
                                                            {(errors.email && touched.email) && <p>{errors.email}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control form-control-alt form-control-lg" id="login-password" name="password" placeholder="Password" onChange={handleChange('password')} values={values.password}/>
                                                            {(errors.password && touched.password) && <p>{errors.password}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="login-remember" name="login-remember"/>
                                                                <label className="custom-control-label font-w400" htmlFor="login-remember">Remember Me</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-6 col-xl-5">
                                                            <button type="submit" className="btn btn-block btn-primary" onClick={handleSubmit}>
                                                                <i className="fa fa-fw fa-sign-in-alt mr-1"></i> Sign In
                                                            </button>
                                                            {error && error}
                                                            <Link className="btn btn-block btn-primary" to="/register">Register</Link>
                                                        </div>
                                                    </div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="content content-full font-size-sm text-muted text-center">
                            <strong>OneUI 4.0</strong> &copy; <span data-toggle="year-copy">2018</span>
                        </div>
                    </div>
                </div>
              

            </main>
            
        </div>
        )}
		</Formik>
    )
};

export default inject('AuthStore')(observer(Login));