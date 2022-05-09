const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Ticket = db.Ticket;

module.exports = {
    create,
    getAllTicket,
    update1,
    getTicketById,
    delete: _delete
};

// async function authenticate({ username, password }) {
//     const user = await User.findOne({ username });
//     if (user && bcrypt.compareSync(password, user.hash)) {
//         const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
//         return {
//             ...user.toJSON(),
//             token
//         };
//     }
// }

async function getAllTicket() {
    
    return await Ticket.find();
}

async function getTicketById(id) {
    return await Ticket.findById(id);
}

async function create(ticketParam) {
    // validate
    // if (await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    const ticket = new Ticket(ticketParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await ticket.save();
}

async function update1(id, ticketParam) {
    const ticket = await Ticket.findById(id);

    // validate
    if (!ticket) throw 'Ticket not found';
    // if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
    Object.assign(ticket, ticketParam);

    await ticket.save();
}

async function _delete(id) {
    await Ticket.findByIdAndRemove(id);
}