const baseConfig = {
    base: '/api/v1'
};

const API = {
    login: `${baseConfig.base}/login`,
    getCurrentUser: `${baseConfig.base}/getCurrentUser`
};

export default API;