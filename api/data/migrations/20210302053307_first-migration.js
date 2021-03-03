
exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments();
      users.string('username', 200).notNullable().unique();
      users.string('password', 200).notNullable();
      users.string('email', 320).notNullable().unique();
      users.string('role', 128).notNullable();
      users.timestamps(false, true);
    })
    .createTable('classes', (classes) => {
      classes.increments();
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
    .createTable('instructor', (instructor) => {
      instructor.increments('instructor_id');
      instructor
      .integer('user_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      instructor
      .integer('class_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    })
    .createTable('user_classes', tbl => {
      tbl.increments();
      tbl
      .integer('user_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      tbl
      .integer('class_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('user_classes');
  await knex.schema.dropTableIfExists('instructor');
  await knex.schema.dropTableIfExists('classes');
  await knex.schema.dropTableIfExists('users');
};