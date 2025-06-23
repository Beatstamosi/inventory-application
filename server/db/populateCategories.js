import { Client } from "pg";
import "dotenv/config";

const createCategories = `
INSERT INTO categories (name, description) VALUES
  ('Beach Break', 'Boards for quick, punchy waves and fast take-offs at beach breaks.'),
  ('Big Days', 'Equipment for handling large surf with more power and stability.'),
  ('Points', 'Boards ideal for long, peeling waves at point breaks. Great for carving.'),
  ('Mush Days', 'Go-to boards for small, slow, or sloppy conditions — easy paddlers.');
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
