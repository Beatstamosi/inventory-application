import { Client } from "pg";
import "dotenv/config";

const createCategories = `
INSERT INTO categories (name) VALUES
  ('Beach Break'),
  ('Big Days'),
  ('Points'),
  ('Mush Days');
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  console.log("Connecting");
  await client.connect();
  console.log("Running Query");
  await client.query(createCategories);
  console.log("Done");
  await client.end();
}

main();
