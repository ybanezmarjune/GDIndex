// a simple module provides aria2 supports

import Aria2 from 'aria2';

const KEY_ARIA2_RPC_HOST = 'ARIA2_RPC_HOST';
const KEY_ARIA2_RPC_PORT = 'ARIA2_RPC_PORT';
const KEY_ARIA2_RPC_SECURE = 'ARIA2_RPC_SECURE';
const KEY_ARIA2_RPC_PATH = 'ARIA2_RPC_PATH';
const KEY_ARIA2_RPC_TOKEN = 'ARIA2_RPC_TOKEN';
const KEY_ARIA2_DOWNLOAD_PATH = 'ARIA2_DOWNLOAD_PATH';
const KEY_FETCH_CONCURRENCY = 'DOWNLOAD_FETCH_CONCURRENCY';
const KEY_FETCH_RETRY_TIMES = 'DOWNLOAD_FETCH_RETRY_TIMES';

function getStringFromLocalStorage(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}

function setStringToLocalStorage(key, value) {
    return localStorage.setItem(key, value);
}

const aria2Support = {
    aria2: null,
    getRpcHost: function() {
        return getStringFromLocalStorage(KEY_ARIA2_RPC_HOST);
    },
    setRpcHost: function(host) {
        return setStringToLocalStorage(KEY_ARIA2_RPC_HOST, host);
    },
    getRpcPort: function() {
        let port = getStringFromLocalStorage(KEY_ARIA2_RPC_PORT);
        if (!port) {
            port = 6800;
        }
        return port;
    },
    setRpcPort: function(port) {
        if (Number.isNaN(Number(port))) {
            return false;
        }

        return setStringToLocalStorage(KEY_ARIA2_RPC_PORT, port);
    },
    getRpcSecure: function() {
        return getStringFromLocalStorage(KEY_ARIA2_RPC_SECURE, '0') !== '0';
    },
    setRpcSecure: function(enable) {
        return setStringToLocalStorage(KEY_ARIA2_RPC_SECURE, enable ? '1' : '0');
    },
    getRpcPath: function() {
        return getStringFromLocalStorage(KEY_ARIA2_RPC_PATH, '/jsonrpc');
    },
    setRpcPath: function(path) {
        return setStringToLocalStorage(KEY_ARIA2_RPC_PATH, path);
    },
    getRpcToken: function() {
        return getStringFromLocalStorage(KEY_ARIA2_RPC_TOKEN);
    },
    setRpcToken: function(token) {
        return setStringToLocalStorage(KEY_ARIA2_RPC_TOKEN, token);
    },
    getDownloadPath: function() {
        return getStringFromLocalStorage(KEY_ARIA2_DOWNLOAD_PATH);
    },
    setDownloadPath: function(path) {
        return setStringToLocalStorage(KEY_ARIA2_DOWNLOAD_PATH, path);
    },
    getFetchConcurrency: function() {
        return Number(getStringFromLocalStorage(KEY_FETCH_CONCURRENCY, '5'));
    },
    setFetchConcurrency: function(concurrency) {
        if (Number.isNaN(Number(concurrency))) {
            return false;
        }

        return setStringToLocalStorage(KEY_FETCH_CONCURRENCY, concurrency);
    },
    getFetchRetryTimes: function() {
        return Number(getStringFromLocalStorage(KEY_FETCH_RETRY_TIMES, '3'));
    },
    setFetchRetryTimes: function(retry_times) {
        if (Number.isNaN(Number(retry_times))) {
            return false;
        }

        return setStringToLocalStorage(KEY_FETCH_RETRY_TIMES, retry_times);
    },
    init: function() {
        const options = {
            host: this.getRpcHost(),
            port: this.getRpcPort(),
            secure: this.getRpcSecure(),
            secret: this.getRpcToken(),
            path: this.getRpcPath()
        };
        this.aria2 = new Aria2(options);
    },
    test: async function() {
        if (!this.aria2) {
            this.init();
        }

        return await this.aria2.call('getVersion');
    },
    addDownload: async function(url, downloadPath) {
        if (!this.aria2) {
            this.init();
        }
        const option = {
            dir: downloadPath
        };

        return await this.aria2.call('addUri', [url], option);
    }
};

export default aria2Support;
