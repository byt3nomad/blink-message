ALTER TABLE message
    ADD COLUMN created_at timestamptz default now(),
    ADD COLUMN opened_at timestamptz;