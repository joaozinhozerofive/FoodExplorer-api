exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("tag_id");
    table.text("ingredients").notNullable;
    
    table.integer("plate_id").references("plate_id").inTable("plates").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.dropTable("tags");
