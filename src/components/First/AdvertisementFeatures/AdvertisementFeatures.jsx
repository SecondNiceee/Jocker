import "./AdvertisementFeatures.css";
const AdvertisementFeatures = ({features}) => {
    return (
        <>
        {features.length > 0 && (
        <div className="features-container">
            {features.map( (feature) => (
                
            <div key={feature.key} className={`feature ${feature.containerClass}`}>
                <p className={`feature-text ${feature.textClass}`}>{feature.text}</p>
            </div>
            ) )}
        </div>  
        )}
        </>
    );
};

export default AdvertisementFeatures;