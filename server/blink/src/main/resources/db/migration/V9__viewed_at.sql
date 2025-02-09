CREATE TABLE message_view(
    id text primary key,
    viewed_at timestamptz not null default now(),
    message_id text not null references message(id) on delete cascade
);
