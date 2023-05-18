import React,{ useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const Register = (props) => {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        if(props.AuthStore.appState != null){
          if(props.AuthStore.appState.isLoggedIn){
            return props.history.push('/');
          }
        }
    });

    const validationSchema = Yup.object().shape({
        email:Yup
            .string()
            .email('Email is not valid')
            .required('Email is not empty'),
        name:Yup.string().required('Name is not empty'),
        password:Yup.string().required('Password is not empty'),
        password_confirmation:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match')
                
    });
    const handleSubmit = (values) => {
        axios.post('/api/auth/register', {...values})
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
                    props.history.push('/');
                    //location.reload();
                  }
                  else 
                  {
                    alert('You could not login.');
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
          name:'',
          email:'',
          password:'',
          password_confirmation:''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        >
        {({ handleSubmit, handleChange, handleBlur, values, errors, isValid, isSubmitting, touched }) => (
        <div id="page-container">
            <main id="main-container">
                <div className="hero-static">
                    <div className="content">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-4">
                                <div className="block block-themed block-fx-shadow mb-0">
                                    <div className="block-header bg-success">
                                        <h3 className="block-title">Create Account</h3>
                                        <div className="block-options">
                                            <a className="btn-block-option font-size-sm" href="javascript:void(0)" data-toggle="modal" data-target="#one-signup-terms">View Terms</a>
                                            <a className="btn-block-option" href="op_auth_signin.html" data-toggle="tooltip" data-placement="left" title="Sign In">
                                                <i className="fa fa-sign-in-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="block-content">
                                        <div className="p-sm-3 px-lg-4 py-lg-5">
                                            <h1 className="mb-2">OneUI</h1>
                                            <p>Please fill the following details to create a new account.</p>
                                            { arr.length != 0 &&  arr.map((item) => (<p>{item}</p>))}
                                            { error != '' &&  (<p>{error}</p>)}
                                            <form onSubmit={handleSubmit} className="js-validation-signup" action="be_pages_auth_all.html" method="POST">
                                                <div className="py-3">
                                                        
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-lg form-control-alt" id="signup-username" name="name" placeholder="Username" onBlur={handleBlur} onChange={handleChange('name')} values={values.name}/>
                                                        {(errors.name && touched.name) && <p>{errors.name}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-lg form-control-alt" id="signup-email" name="email" onChange={handleChange('email')} values={values.email} placeholder="Email"/>
                                                        {(errors.email && touched.email) && <p>{errors.email}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-lg form-control-alt" id="signup-password" name="password" placeholder="Password" onChange={handleChange('password')} values={values.password}/>
                                                        {(errors.password && touched.password) && <p>{errors.password}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-lg form-control-alt" id="signup-password-confirm" name="password_confirmation" placeholder="Password Confirm" onChange={handleChange('password_confirmation')} values={values.password_confirmation}/>
                                                        {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="signup-terms" name="signup-terms"/>
                                                            <label className="custom-control-label font-w400" htmlFor="signup-terms">I agree to Terms &amp; Conditions</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-6 col-xl-5">
                                                        <button type="submit" className="btn btn-block btn-success"  onClick={handleSubmit}>
                                                            <i className="fa fa-fw fa-plus mr-1"></i> Sign Up
                                                        </button>
                                                        {error && error}
                                                        <Link className="btn btn-block btn-primary" to="/login">Do you have a account?</Link>
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

            </main>
        </div>
        )}
		</Formik>
    )
    
};

export default inject('AuthStore')(observer(Register));