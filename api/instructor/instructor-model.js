const db = require("../data/db-config");

module.exports = {
  addClass,
  updateClass,
  removeClass,
  getClassById,
  getClasses, 
  getUsers
};

async function addClass(newClass) {
    const [id] = await db("classes").insert(newClass, "class_id");
    return getClassById(id);
}

function getClasses() {
  return db.select("*").from("classes");
}

function getUsers() {
  return db.select("*").from("user");
}

function updateClass(id, changes) {
  return db("classes").where({id}).update(changes);
}

function removeClass(id) {
  return db("classes").where("id", id).del();
}

function getClassById(id) {
  return db("classes").where({id}).first();
}