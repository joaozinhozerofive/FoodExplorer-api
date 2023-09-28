exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("order_id");
    table.integer("user_id").references("id").inTable("users");
    table.text("observation");
    table.text("totalPrice");

    table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");