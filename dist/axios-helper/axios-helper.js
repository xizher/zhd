import axios from 'axios';
function axiosHelper() {
    const store = {
        url: '',
        params: undefined,
        data: undefined,
        config: undefined,
    };
    const helper = {
        setUrl(url) {
            store.url = url;
            return helper;
        },
        setParams(params) {
            if (!store.params) {
                store.params = {};
            }
            Object.entries(params).forEach(([key, value]) => {
                store.params[key] = value;
            });
            return helper;
        },
        setData(data) {
            store.data = data;
            return helper;
        },
        setConfig(config) {
            store.config = config;
            return helper;
        },
        async mountGet() {
            return (await axios.get(store.url, {
                ...store.config,
                params: store.params
            })).data;
        },
        async mountPost() {
            let url = store.url;
            if (store.params) {
                const paramStrArr = [];
                Object.entries(store.params).forEach(([key, value]) => {
                    paramStrArr.push(`${key}=${value}`);
                });
                url = `${url}?${paramStrArr.join('&')}`;
            }
            return (await axios.post(url, store.data, store.config)).data;
        }
    };
    return helper;
}
export default axiosHelper;
