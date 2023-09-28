exports.up = knex => knex.schema.createTable("plates", table => {
    table.increments("plate_id");
    table.binary("img"); 
    table.text("name");
    table.text("category");
    table.text("price");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("plates");