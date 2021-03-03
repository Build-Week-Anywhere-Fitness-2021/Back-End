
exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable().unique();
      users.string('password', 200).notNullable();
      users.string('email', 320).notNullable().unique();
      users.string('role', 128).notNullable();
      users.timestamps(false, true);
    })
    .createTable('classes', (classes) => {
      classes.increments('class_id');
      classes.string('name', 100).notNullable();
      classes.string('type', 50).notNullable();
      classes.string('startTime', 50).notNullable();
      classes.string('duration', 50).notNullable();
      classes.string('intensityLevel', 50).notNullable();
      classes.string('location', 50).notNullable();
      classes.integer('registered').notNullable().unsigned();
      classes.integer('maxRegistered').notNullable().unsigned();
      classes.string('date', 128).notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('classes');
  await knex.schema.dropTableIfExists('users');
};