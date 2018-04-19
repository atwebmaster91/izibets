module.exports = {
    findElementInArray: findElementInArray,
    findElementIndexInArray: findElementIndexInArray
};

/**
 * Find Element in Array
 * @param {array} array 
 * @param {string} key 
 * @param {mixed} value
 * @author Miguel Trevino 
 */
function findElementInArray(arrayType, array, key, value) {
   
    let result = null;
    switch (arrayType) {
        case 'objects':
            result = array.find(object => object[key] === value);
            break;
        case 'strings':
            result = array.indexOf(value);
        default:
            break;
    }
    return result;
}
/**
 * Find element index in array
 * @param {array} array 
 * @param {string} key 
 * @param {mixed} value
 * @author Miguel Trevino 
 */
function findElementIndexInArray(arrayType, array, key, value) {
    let position = -1;
    switch (arrayType) {
        case 'objects':
            position = array.findIndex(object => object[key] === value);
            break;
        case 'strings':
            position = array.indexOf(value);
        default:
            break;
    }
   
    return position;
}