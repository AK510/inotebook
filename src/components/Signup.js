import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""});

  //used to redirect user to another page or component
  const navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();

  const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers:{  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password})
    });

    const json = await response.json();
    console.log(json);

    if(json.success){
      //save auth token in local storage and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("User created successfully", "success");
    }
    else{
        props.showAlert("Invalid Credentials", 'danger')
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="name" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="email" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength='5' required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength='5' required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup