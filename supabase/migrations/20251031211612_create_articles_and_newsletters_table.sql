-- ========================================================
--  TABLE 1: articles
--  Stores both fetched and AI-generated articles
-- ========================================================
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  url text unique,
  summary text,
  published_at timestamptz,
  fetched_at timestamptz default now(),
  source_type text default 'rss' check (source_type in ('rss', 'ai')),
  constraint unique_url_per_category unique (url, category)
);

-- Helpful index for querying by category
create index if not exists idx_articles_category on articles(category);


-- ========================================================
--  TABLE 2: newsletter_issues
--  Stores generated or sent newsletters for each category
-- ========================================================
create table if not exists newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  issue_date date not null default current_date,
  content text not null, -- full markdown or HTML email content
  sent boolean default false,
  created_at timestamptz default now(),
  sent_at timestamptz,
  constraint unique_issue_per_category unique (category, issue_date)
);

-- Index for faster lookups of issues per category
create index if not exists idx_newsletter_category_date
  on newsletter_issues(category, issue_date);
