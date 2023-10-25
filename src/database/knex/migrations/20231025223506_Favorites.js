exports.up = knex => knex.schema.createTable("favorites", table => {
    table.integer("order_id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("plate_id");

    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("favorites");