import "../features/features.scss";

const Features = ({ featuresData }) => {
    return (
        <div className="featuresWrapper">
            {featuresData.map((feature, index) => 
                <div className="featuresContent" key={index}>
                    <div className="circle">
                        <img src={feature.icon} alt={feature.alt}/>
                    </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                </div>
            )}
        </div>
    );
};

export default Features;
