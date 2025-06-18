import { Client } from "pg";
import "dotenv/config";

const addBoards = `
INSERT INTO boards (name, size, volume, price, brand, category) VALUES
  ('FireWire Spitfire', '6''0', '34.9', 250, 7, 3),
  ('Hypto Krypto', '5''8', '33.5', 275, 6, 1),
  ('Lost V3 Rocket', '5''11', '35.0', 260, 2, 4),
  ('Channel Islands Happy Everyday', '6''2', '36.3', 290, 1, 2);
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  console.log("Connecting");
  await client.connect();
  console.log("Running Query");
  await client.query(addBoards);
  console.log("Done");
  await client.end();
}

main();
