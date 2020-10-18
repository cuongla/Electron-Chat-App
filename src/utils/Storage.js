class Storage {
    setItem(key, value) {
        if(!value) return null;
        const sValue = JSON.stringify(value);
        localStorage.setItem(key, sValue);
        return this;
    }

    getItem(key) {
        const item = localStorage.get(key);
        return item ? JSON.parse(item) : {};
    }
}

export default new Storage();