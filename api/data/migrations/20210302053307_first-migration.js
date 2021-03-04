
exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('userId');
      users.string('username', 200).notNullable().unique();
      users.string('password', 200).notNullable();
      users.string('email', 320).notNullable().unique();
      users.string('role', 128).notNullable();
      users.timestamps(false, true);
    })
    .createTable('classes', (classes) => {
      classes.increments('classId');
      classes.string('name', 100).notNullable();
      classes.string('type', 50).notNullable();
      classes.string('startTime', 50).notNullable();
      classes.string('duration', 50).notNullable();
      classes.string('intensityLevel', 50).notNullable();
      classes.string('location', 50).notNullable();
      classes.integer('registered').notNullable().unsigned();
      classes.integer('maxRegistered').notNullable().unsigned();
      classes.string('date', 128).notNullable();
    })
    .createTable('user_classes', tbl => {
      tbl.increments();
      tbl.integer('user_id').notNullable().references('userId').inTable('users');
      tbl.integer('class_id').notNullable().references('classId').inTable('classes');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user_classes')
    .dropTableIfExists('classes')
    .dropTableIfExists('users');
};
