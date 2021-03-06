export const storageUtils = {
    local: {
        set(key, value) {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            return storageUtils.local;
        },
        get(key) {
            const value = localStorage.getItem(key);
            if (value) {
                return value;
            }
            else {
                return null;
            }
        },
        getUseJSON(key) {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
            else {
                return null;
            }
        },
        remove(key) {
            localStorage.removeItem(key);
            return storageUtils.local;
        },
        clear() {
            localStorage.clear();
            return storageUtils.local;
        }
    },
    session: {
        set(key, value) {
            sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            return storageUtils.session;
        },
        get(key) {
            const value = sessionStorage.getItem(key);
            if (value) {
                return value;
            }
            else {
                return null;
            }
        },
        getUseJSON(key) {
            const value = sessionStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
            else {
                return null;
            }
        },
        remove(key) {
            sessionStorage.removeItem(key);
            return storageUtils.session;
        },
        clear() {
            sessionStorage.clear();
            return storageUtils.session;
        }
    },
};
