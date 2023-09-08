-- Database name: "painless_panes"

-- For cookie session (required by connect-pg-simple)
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- For email authentication
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(345) UNIQUE NOT NULL
);

-- project table init
CREATE TABLE "project" (
"id" SERIAL PRIMARY KEY,
"zip" VARCHAR(10),
"user_id" INT REFERENCES "user" NOT NULL
);

-- SELECT * FROM "project";

-- location table init
CREATE TABLE "location" (
"id" SERIAL PRIMARY KEY,
"level" VARCHAR(80),
"access" VARCHAR(120)
);

INSERT INTO "location" (level, access)
VALUES ('First floor', 'Foot'),
('First floor', 'Ladder'),
('Basement', 'Below ground'),
('Second floor', 'Foot'),
('Second floor', 'Ladder'),
('Second floor', 'Roof/deck/ladder');

-- SELECT * FROM location;

-- frame table init
CREATE TABLE "frame" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(80),
"description" TEXT,
"image" TEXT -- this is open for discussion but will probably contain a hash/something that can identify the S3 bucket where we will store the image. can also potentially 
);			 -- just be a path to a local image

INSERT INTO "frame" (name, description)
VALUES ('Casement', 'A casement frame'),
('Single or double hung', 'A single or double hung frame'),
('Egress (basement)', 'An egress frame'),
('Bay or bow', 'A bay or bow frame'),
('Fixed', 'A non-opening frame');

-- SELECT * FROM "frame";

-- window table init
CREATE TABLE "window" (
"id" SERIAL PRIMARY KEY,
"image" TEXT, -- link to stored image in S3 || hash value of image
"height" INT, -- for both height and width, we can discuss what the proper precision is/if decimals are needed
"width" INT,
"location_id" INT REFERENCES "location",
"current_frame_id" INT REFERENCES "frame",
"desired_frame_id" INT REFERENCES "frame",
"project_id" INT REFERENCES "project" NOT NULL
);

-- SELECT * FROM "window";