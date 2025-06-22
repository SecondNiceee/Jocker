import { useEffect, useState } from 'react';
import getResponseById from '../functions/api/getResponseById';

const useGetResponseById = ({id}) => {
    const [responseStatus, setResponseStatus] = useState(null);
    const [response, setResponse] = useState(null);
    useEffect( () => {
        getResponseById(id)
        .then((response) => {
            setResponse(response);
            setResponseStatus("fullfiled");
        })
        .catch((err) => {
            setResponseStatus("rejected");
        });
    }, [id] )

    return {responseStatus, response};

};

export default useGetResponseById;