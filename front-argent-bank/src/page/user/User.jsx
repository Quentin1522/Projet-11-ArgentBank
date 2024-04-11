import "../user/user.scss";
import Header from "../../components/header/Header";
import UserName from "../../components/userName/UserName";
import signOut from "../../assets/icon-sign-out.svg";
import Account from "../../components/account/Account";
import Footer from "../../components/footer/Footer";


const User = ({accountData}) => {

    return (
        <div className="userWrapper">
            <Header imgSignOut={signOut} textSignOut="sign Out"/>
            <div className="userContent">
                <UserName/>
                {/*accountData en props*/}
                <Account accountData={accountData}/>
            </div>
            <Footer/>
        </div>
    );
};

export default User;
