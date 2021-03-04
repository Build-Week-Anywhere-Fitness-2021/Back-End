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
    const [id] = await db("class").insert(newClass, "classId");
    return getClassById(id);
}

function getClasses() {
  return db.select("*").from("class");
}

function getUsers() {
  return db.select("*").from("user");
}

function updateClass(id, changes) {
  return db("class").where({id}).update(changes);
}

function removeClass(id) {
  return db("class").where("classId", id).del();
}

function getClassById(id) {
  return db('class as c')
    .select('*')
    .where('c.classId', id)
    .first();
}