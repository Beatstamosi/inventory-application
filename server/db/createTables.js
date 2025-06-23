import { Client } from "pg";
import "dotenv/config";

const createBrands = `
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250)
);
`;

const createCategories = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250)
);
`;

const createBoards = `
    CREATE TABLE IF NOT EXISTS boards (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 250 ),
        size VARCHAR ( 100 ),
        volume VARCHAR ( 100 ),
        price FLOAT,
        brand INTEGER NOT NULL,
        category INTEGER,
        FOREIGN KEY (brand) REFERENCES brands(id),
        FOREIGN KEY (category) REFERENCES categories(id) ON DELETE SET NULL
    );
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  console.log("Connecting");
  await client.connect();
  console.log("Running Queries");
  await client.query(createBrands);
  await client.query(createCategories);
  await client.query(createBoards);
  console.log("Done");
  await client.end();
}

main();
