const db = require("../data/db-config");

module.exports = {
  addUser,
  getUsers,
  findBy,
  getClass,
  getClientClasses,
  getUserById,
  findClassesBy,
  getClassType,
  getClassById, 
  addFavorite,
  getFavoriteClass,
  updateClass,
  removeClass
};

function addUser(user) {
  return db
    .select('*')
    .from('user')
    .insert(user);
}

function getUserById(id) {
  return db
    .select('*')
    .from('user')
    .where({id});
}

function getUsers() {
  return db.select('*').from('user');
}

function findBy(user) {
  return db
    .select('*')
    .from('user')
    .where(user);
}

function getClass() {
  return db.select('*').from('class');
}

function getClassById(id) {
  return db('class').where({id});
}

function findClassesBy(filter) {
  return db("class").where(filter);
}

function getClassType(type) {

  return db('class').where(type);
}

function getClientClasses({user_id}) {
  return db('user_classes')
    .join('user', 'user.id', 'user_classes.user_id')
    .where('user.id', `${user_id}`);
}

function addFavorite(user_id, class_id) {
  return db('user_classes')
    .insert({user_id, class_id})
    .then(() => {
      return getClientClasses(user_id);
    });
}

function getFavoriteClass(id) {
  return db.select('*').from('user_classes').where({user_id:id});

}

function updateClass(id, changes) {
  return db('class')
    .where({id}).update(changes);
}

function removeClass(id) {
  return db('user_classes')
    .where({class_id:id}).del();
}