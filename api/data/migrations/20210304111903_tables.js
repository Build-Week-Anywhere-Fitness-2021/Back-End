
exports.up = function(knex) {
    return knex.schema
    .createTable('user', tbl => {
        tbl.increments('userId');
        tbl.string('username', 128).notNullable().unique().index();
        tbl.string('email', 200).notNullable().unique();
        tbl.string('password', 200).notNullable();
        tbl.string('role', 128).notNullable();
        tbl.bool('signedUp').defaultTo('false');
      })
  
    .createTable('class', tbl => {
        tbl.increments('classId');
        tbl.string('name', 128).notNullable().unique();
        tbl.string('type', 128).notNullable();
        tbl.string('startTime', 128).notNullable();
        tbl.integer('duration', 128).notNullable();
        tbl.string('intensityLevel', 128).notNullable();
        tbl.string('location', 128).notNullable();
        tbl.integer('registered', 128).defaultTo(0);
        tbl.integer('maxRegistered', 128).notNullable();
        tbl.string('date', 128).notNullable();
      })
    
    .createTable('user_classes', tbl => {
        tbl.increments();
        tbl.integer('user_id').notNullable().references('userId').inTable('user').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer('class_id').notNullable().references('classId').inTable('class').onDelete('CASCADE').onUpdate('CASCADE');
      });
    };
    
    exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('user_classes')
      .dropTableIfExists('user')
      .dropTableIfExists('class');
    };