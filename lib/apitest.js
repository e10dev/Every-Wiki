const requests = require('./requests')

async function apitest(data) {
    
    return await requests({
        method: 'get',
        path: 'test',
        body: data 
    }).then(response => console.log(response.data))
}

const data = "hello server!"

apitest(data)