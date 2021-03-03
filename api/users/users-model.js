const db = require("../data/db-config");

module.exports = {
    add,
    find,
    findBy,
    findById,
  };
  
  function find() {
    return db("users").select("user_id", "username").orderBy("user_id");
  }
  
  function findBy(filter) {
    return db("users").where(filter).orderBy("user_id");
  }
  
  async function add(user) {
    const [id] = await db("users").insert(user, "user_id");
    return findById(id);
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }