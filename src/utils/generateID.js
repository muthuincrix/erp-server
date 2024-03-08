const { v4: uuidv4 } = require('uuid');
exports.generateCategoryID = () =>{
    let id = '';
    // Generate UUID
    for (let i = 0; i < 10; i++) {
        id += uuidv4().split('-').join('');
    }
    // Append timestamp
    const timestamp = Date.now().toString(16); // Convert timestamp to hexadecimal string
    id += timestamp;
    return id.substring(0, 6); // Truncate to desired length
}

exports.generateProductID = () =>{
    let id = '';
    // Generate UUID
    for (let i = 0; i < 10; i++) {
        id += uuidv4().split('-').join('');
    }
    // Append timestamp
    const timestamp = Date.now().toString(16); // Convert timestamp to hexadecimal string
    id += timestamp;
    return id.substring(0, 10); // Truncate to desired length
}