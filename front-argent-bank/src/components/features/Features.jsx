import "../features/features.scss";
import iconChat from "../../assets/icon-chat.png";
import iconMoney from "../../assets/icon-money.png";
import iconSecurity from "../../assets/icon-security.png";

const Features = () => {
    return (
        <div className="featuresWrapper">

            <div className="featuresContent">
                <div className="circle">
                    <img src={iconChat} alt="icon chat"/>
                </div>
                <h3>You are our #1 priority</h3>
                <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.</p>
            </div>

            <div className="featuresContent">
                <div className="circle">
                    <img src={iconMoney} alt="icon money"/>
                </div>
                <h3>More savings means higher rates</h3>
                <p>The more you save with us, the higher your interest rate will be!</p>
            </div>

            <div className="featuresContent">
                <div className="circle">
                    <img src={iconSecurity} alt="icon security"/>
                </div>
                <h3>Security you can trust</h3>
                <p>We use top of the line encryption to make sure your data and money is always safe.</p>
            </div>

        </div>
    );
};

export default Features;