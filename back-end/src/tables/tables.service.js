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
    .then((tables)=> tables[0]);
}

async function read(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .first();
}

async function readReservation(reservation_id) {
    return knex("reservations")
        .select("people")
        .where({reservation_id: reservation_id})
        .first();
}

async function update(newTableData) {
    console.log(newTableData.reservation_id)
    return knex("tables")
        .select("*")
        .where({table_id: newTableData.table_id})
        .update({
            reservation_id: newTableData.reservation_id
        }, "*");
}

async function destroy(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .update({
            reservation_id: null
        });
}

module.exports = {
    list, 
    create,
    read,
    readReservation,
    update,
    delete: destroy,
}