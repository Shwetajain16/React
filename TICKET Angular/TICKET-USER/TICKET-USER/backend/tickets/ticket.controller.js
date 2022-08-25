const express = require('express');
const router = express.Router();
const ticketService = require('./ticket.service');

// routes
//router.post('/authenticate', authenticate);
router.post('/create_ticket', create_ticket);
router.get('/', getAllTicket);
//router.get('/current', getCurrent);
router.get('/:id', getTicketById);
router.put('/:id', update1);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function create_ticket(req, res, next) {
    ticketService.create(req.body)
    //console.log(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllTicket(req, res, next) {
    ticketService.getAllTicket()
        .then(tickets => res.json(tickets))
        .catch(err => next(err));
}

// function getCurrent(req, res, next) {
//     userService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

function getTicketById(req, res, next) {
    ticketService.getTicketById(req.params.id)
        .then(ticket => ticket ? res.json(ticket) : res.sendStatus(404))
        .catch(err => next(err));
}

function update1(req, res, next) {
    ticketService.update1(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    ticketService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}