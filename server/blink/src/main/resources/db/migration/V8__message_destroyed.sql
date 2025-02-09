ALTER TABLE message
    RENAME COLUMN is_opened TO is_destroyed;

ALTER TABLE message
    RENAME COLUMN opened_at TO destroyed_at;