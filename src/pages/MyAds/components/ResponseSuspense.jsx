
import { lazy} from 'react';

const ResponseBlock = lazy( () => import("../../../components/MyAds/ResponseBlock") )

const ResponseSuspense = ({func , index, buttonText , task, isWatched, advertisement}) => {
    return (<ResponseBlock  func={func} index={index} buttonText={buttonText} task={task} isWatched={isWatched} {...advertisement} />);
};

export default ResponseSuspense;