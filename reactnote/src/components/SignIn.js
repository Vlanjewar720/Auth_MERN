import React, { useState, useEffect } from "react";
// import Axios from "axios";
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await Axios.post(`http://localhost:4000/user/signIn`, {
  //       email,
  //       password,
  //     });
  //     console.log(result);
  //     const data =  result.data;
  //     if (data.token) {
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("user", JSON.stringify(data.userInfo));
  //       alert("Sign In Successful");
  //       window.location.href = "/Notes";
  //     } else {
  //       alert("Please check email and password");
  //     }
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       alert("Sorry a user does not exist. Check email");
  //     }
  //     if (error.response.status === 500) {
  //       alert("SignIn failed");
  //     }
  //   }
  // };
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   console.log(email, password);
  //   fetch(`http://localhost:4000/user/signIn`, {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data.data);
  //       if (data.status === "ok") {
  //         alert("login successful");
  //         window.localStorage.setItem("token", data.data);
  //         window.localStorage.setItem("loggedIn", true);

  //          window.location.href = "./Notes";
  //       }
  //     });
  // }

  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/Notes')
    }
  }, [navigate])
  const handleSubmit = async () =>{
    console.log(email, password)
    let result = await fetch('http://localhost:4000/user/signIn',{
      method:'post',
      body: JSON.stringify({email, password}),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result);
    if(result.auth){
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/Notes')
    }else{
      alert("Please enter Correct details")
    }
  }

  return (
    <>
      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
