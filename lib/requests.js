const axios = require('axios')
const qs = require('qs')
const models = require('./models');

module.exports = async ({
    path,
    version = 1,
    method = 'get',
    query,
    body
}) => {
    // block chain api server path
    const blockChainConfig = models.Setting.get('blockchain');
    if (!blockChainConfig) {
        throw Error('No mail config');
    }
    const blockChainApiPath = `http://${blockChainConfig.host}:${blockChainConfig.port}`

    if (query) {
        path += '?' + qs.stringify(query)
    }
    if (path[0] === '/') {
        path = path.slice(1)
    }
    const url = `${blockChainApiPath}/v${version}/${path}`
    return axios({
        url,
        method,
        data: body,
    })
}