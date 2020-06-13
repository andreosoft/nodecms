const User = require('./User.js');

module.exports = class Profile extends User {
    model = [
        { name: 'id' },
        { name: 'phone' },
        { name: 'image' },
        { name: 'address' }
    ];

    constructor() {
        super();
    }
};
