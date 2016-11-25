/**
 * Created by plter on 2016/11/25.
 */

function cloneObject(obj) {
    let newObj = {};
    for (let k in obj) {
        newObj[k] = obj[k];
    }
    return newObj;
}

module.exports = {
    cloneObject: cloneObject
};