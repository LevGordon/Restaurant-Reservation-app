const knex = require("../db/connection");

async function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

async function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((x)=>x[0])
}

// async function create(reservation) {
//     return knex("reservations")
//         .insert(reservation)
//         .returning("*")
//         .then((reservations) => reservations[0])
// }

module.exports = {
    list, 
    create,
}