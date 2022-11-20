import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './../CSS/login.css';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    //used to redirect user to another page or component
    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers:{  
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

        const json = await response.json();
        console.log(json);

        if(json.success){
            //save auth token in local storage and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Logged in Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    return (
    <div className="container-fluid ps-md-0">
        <div className="row g-0">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
                <div className="container">
                <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" placeholder="name@example.com"/>
                        <label htmlFor="email">Email address</label>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password' placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                        </div>

                        <div className="d-grid">
                        <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>
                        <div className="text-center">
                            <a className="small" href="#">Forgot password?</a>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Login