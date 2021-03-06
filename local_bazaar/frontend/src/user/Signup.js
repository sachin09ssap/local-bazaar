import React, {useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        firstname: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {firstname,email,password,error,success} = values

    const handleChange = name => event => {
        setValues({...values,error:false,[name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values,error:false})
        console.log(firstname,email,password)
        signup({firstname,email,password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else {
                setValues({
                    ...values,
                    firstname:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                });
            }
        })
        .catch(console.log("Error in signup"));
    };
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                className="form-control"
                                onChange={handleChange("firstname")}
                                type ="text"
                                value={firstname} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type ="email" value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type ="password" value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block"  >Submit</button>
                    </form>
                </div>

            </div>
        )
    }

    const successMessage = () => {
        return (<div className="alert alert-success" style={{display:success?"":"none"}} >
            New account was created successfully. Please {" "}
            <Link to="/signin">Login Here</Link>
        </div>)
    };

    const errorMessage = () => {
        return (<div className="alert alert-danger" style={{display:error?"":"none"}} >
        {error}
        </div>)
    };


    return(
        <Base title="Sign up page" description="A place to register yourself as customer or seller">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}

        </Base>
    )
}

export default Signup;