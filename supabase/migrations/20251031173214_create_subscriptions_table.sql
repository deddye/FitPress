-- enable uuid extension for generating ids
create extension if not exists "uuid-ossp";

-- create subscriptions table
create table if not exists subscriptions (
    id uuid primary key default uuid_generate_v4(),
    email text not null unique,
    created_at timestamp with time zone default now(),
    interests jsonb not null default '[]'::jsonb
);
