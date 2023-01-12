import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1>Hello</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
            eligendi quibusdam expedita. Explicabo consectetur dolorem maiores
            fugit, rerum consequuntur quidem.
          </p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input
              type='text'
              placeholder='username'
              name='username'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='email'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='password'
              name='password'
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='name'
              name='name'
              onChange={handleChange}
            />
            {err && <span>{err}</span>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
