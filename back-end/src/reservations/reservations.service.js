const knex = require("../db/connection");

async function list(date) {
    return knex("reservations")
        .select("*")
        .where({
            "reservation_date": date
        })
        .whereNot({"status" : "finished"})
        .orderBy("reservation_time")
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

async function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((reservations) => reservations[0])
}

async function read(reservation_Id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_Id})
        .first();
}

async function update(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_id})
        .update({status: "seated"}, "*")
}

function updateReservation(updated) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: updated.reservation_id })
      .update(updated, "*")
      .then((x) => x[0]);
  }

module.exports = {
    list,
    search,
    create,
    read,
    update,
    updateReservation,
}