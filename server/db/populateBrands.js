import { Client } from "pg";
import "dotenv/config";

const createBrands = `
INSERT INTO brands (name) VALUES
  ('Channel Islands Surfboards'),
  ('Lost Surfboards'),
  ('JS Industries'),
  ('DHD Surfboards'),
  ('Pyzel Surfboards'),
  ('Haydenshapes Surfboards'),
  ('Firewire Surfboards'),
  ('Rusty Surfboards'),
  ('Grain Surfboards'),
  ('Slater Designs'),
  ('Odysea Surfboards'),
  ('Torq Surfboards'),
  ('NSP Surfboards'),
  ('Walden Surfboards'),
  ('Rip Curl'),
  ('Quiksilver'),
  ('O''Neill'),
  ('Sharp Eye Surfboards'),
  ('Roberts Surfboards'),
  ('Chemistry Surfboards'),
  ('Chilli Surfboards'),
  ('Paradoxal Surfboards'),
  ('Earth Technologies'),
  ('7S Surfboards'),
  ('The Critical Slide Society'),
  ('Creative Army Surfboards'),
  ('Aloha Surfboards'),
  ('McCoy Surfboards'),
  ('John Harris Surfboards');
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  console.log("Connecting");
  await client.connect();
  console.log("Running Query");
  await client.query(createBrands);
  console.log("Done");
  await client.end();
}

main();
