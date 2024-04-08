import "../singIn/singIn.scss";
import { Link } from 'react-router-dom';
import User from "../../assets/user.svg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer"

const SignIn = () => {
    return (
        <div className="signInWrapper">
            <Header/>
            <div className="formContainer">
                <div className="formWrapper">
                    <img className="userIcon" src={User} alt="icon user"/>
                    <h1>Sign In</h1>
                    <form>

                    <div className="input-wrapper">
                        <label for="username">Username</label>
                        <input type="text" id="username" />
                    </div>

                    <div className="input-wrapper">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>

                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label for="remember-me">Remember me</label>
                    </div>

                    <Link className="sign-in-button" to="/user"><p>Sign In</p></Link>
                    </form>
                </div>
            </div>
            <Footer className="footer"/>
        </div>
    );
};

export default SignIn;