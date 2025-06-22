import { getFeatureConfig } from "./AdvertisementFeatures.config";
import "./AdvertisementFeatures.css";
const AdvertisementFeatures = ({isOutSide = true, isUrgently = true, isWarrantly = true}) => {
    const features = getFeatureConfig({isOutSide, isUrgently, isWarrantly});
    return (
        <div className="features-container">
            {features.map( (feature) => (
            <div key={feature.key} className={`feature ${feature.containerClass}`}>
                <p className={`feature-text ${feature.textClass}`}>{feature.text}</p>
            </div>
            ) )}
        </div>  
    );
};

export default AdvertisementFeatures;