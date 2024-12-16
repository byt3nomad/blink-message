ALTER TABLE message
    ADD COLUMN created_at timestamptz ,
    ADD COLUMN opened_at timestamptz;