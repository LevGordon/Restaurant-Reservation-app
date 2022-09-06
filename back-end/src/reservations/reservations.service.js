const knex = require("../db/connection");

async function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((reservations) => reservations[0])
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({"reservations.reservation_date" : date})
        .orderBy("reservations.reservation_time")
   } 

async function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .first()

}

module.exports = {
    list,
    create,
    read,
}
