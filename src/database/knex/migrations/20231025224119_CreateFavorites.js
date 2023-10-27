exports.up = knex => knex.schema.createTable("favorites", table => {
    table.increments("fav_id");
    
    table.integer("plate_id").references("plate_id").inTable("plates").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");


    table.timestamp("created_at").defaultTo(knex.fn.now());


});

exports.down = knex => knex.schema.dropTable("favorites");

