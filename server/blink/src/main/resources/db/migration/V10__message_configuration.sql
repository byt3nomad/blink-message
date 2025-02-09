ALTER TABLE message
    DROP COLUMN encrypted_with_password;

CREATE TABLE message_configuration(
    id text primary key,
    encrypted_with_password bool not null default false,
    view_count integer not null default 1,
    expire_at timestamptz
);

INSERT INTO message_configuration (id, encrypted_with_password, view_count, expire_at)
VALUES ('goOpoA8lFW7zIq3TXYz4z', false,1,null);

ALTER TABLE message ADD COLUMN
    message_configuration_id text not null
    default 'goOpoA8lFW7zIq3TXYz4z' references message_configuration(id);

