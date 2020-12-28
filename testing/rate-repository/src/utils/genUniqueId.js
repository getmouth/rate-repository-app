let id = 1;

function* genUniqueId() {
    while (true) {
        yield id++;
    }
}

export default genUniqueId;