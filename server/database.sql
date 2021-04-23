CREATE TABLE "weekend_to_do_list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (250) NOT NULL,
    "complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "weekend_to_do_list"
    ("task")
VALUES
    ('Laundry'),
    ('Unpack'),
    ('Organize kitchen'),
    ('Taxes'),
    ('Homework');

SELECT * FROM "weekend_to_do_list";
