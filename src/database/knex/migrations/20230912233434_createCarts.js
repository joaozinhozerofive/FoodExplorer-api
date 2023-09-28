exports.up = knex => knex.schema.createTable("carts", table => {
    table.integer("order_id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("plate_id").references("plate_id").inTable("plates");
    table.integer("quantity");

    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("carts");