const { db } = require("@vercel/postgres");
const { users, accounts, records } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedAccounts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        name TEXT NOT NULL,
        balance INT NOT NULL
      );
    `;

    console.log(`Created "accounts" table`);

    const insertedUsers = await Promise.all(
      accounts.map(async (user) => {
        return client.sql`
          INSERT INTO accounts (id, user_id, name, balance)
          VALUES (${user.id}, ${user.user_id}, ${user.name}, ${user.balance})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      accounts: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedRecords(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS records (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        account_id UUID NOT NULL,
        amount INT NOT NULL,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        category TEXT,
        note TEXT
      );
    `;

    console.log(`Created "records" table`);

    const insertedUsers = await Promise.all(
      records.map(async (user) => {
        return client.sql`
          INSERT INTO records (id, account_id, amount, date, time, category, note)
          VALUES (${user.id}, ${user.account_id}, ${user.amount}, ${user.date}, ${user.time}, ${user.category}, ${user.note})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      records: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedUsers(client);
  // await seedAccounts(client);
  await seedRecords(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
