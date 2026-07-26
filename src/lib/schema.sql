create table if not exists contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  company text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists demo_requests (
  id bigint generated always as identity primary key,
  product text not null,
  name text not null,
  email text not null,
  company text,
  preferred_date date,
  message text,
  created_at timestamptz not null default now()
);
