type RequestOption = {
    method: 'GET' | 'POST' |'PUT' | 'DELETE';
    body?: object;
    query?: Map<string, string>;
}

const callApi = (model: RequestOption) => {
    
}