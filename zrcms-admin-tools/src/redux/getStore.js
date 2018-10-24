import storeConfigure from "./storeConfigure";

const store = storeConfigure();

export default function getStore() {
    return store;
}
