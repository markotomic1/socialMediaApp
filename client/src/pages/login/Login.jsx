import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>Hello</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
            eligendi quibusdam expedita. Explicabo consectetur dolorem maiores
            fugit, rerum consequuntur quidem.
          </p>
          <span>Don't you have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form>
            <input type='text' placeholder='username' />
            <input type='password' placeholder='password' />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
