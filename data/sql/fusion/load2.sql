DROP TABLE IF EXISTS public.panels;
DROP TABLE IF EXISTS public.usergrids;
DROP TABLE IF EXISTS public.grids;
DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY
  , username VARCHAR(255) UNIQUE NOT NULL 
  , userrole VARCHAR(255) DEFAULT 'user'
  , dbu VARCHAR(255) DEFAULT CURRENT_USER
  , created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

ALTER TABLE public.users OWNER to gridadmin;

CREATE TABLE public.grids (
  gid SERIAL PRIMARY KEY
  , gridname VARCHAR(255) UNIQUE NOT NULL
  , panels JSONB
  , dbu VARCHAR(255) DEFAULT CURRENT_USER
  , created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.grids OWNER to gridadmin;

CREATE TABLE public.usergrids (
  ugid SERIAL PRIMARY KEY
  , id INT REFERENCES users(id) ON DELETE CASCADE
  , gid INT REFERENCES grids(gid) ON DELETE CASCADE 
  , isactive BOOLEAN DEFAULT TRUE
  , dbu VARCHAR(255) DEFAULT CURRENT_USER
  , created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.usergrids OWNER to gridadmin;

CREATE TABLE public.panels (
  pid SERIAL PRIMARY KEY
  , "name" VARCHAR(255) UNIQUE NOT NULL
  , links JSONB
  , dbu VARCHAR(255) DEFAULT CURRENT_USER
  , created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "panels" OWNER to gridadmin;


-- DATA STARTS 

INSERT INTO public.users (username,userrole) VALUES 
  ('unknown','user')
  ,('codemarc','admin')
  ,('info','user')
  ;


INSERT INTO public.panels ("name",links) VALUES
  ('comms',pg_read_file('/gridjson/comms.json')::jsonb)
, ('devtools',pg_read_file('/gridjson/devtools.json')::jsonb)
, ('genai',pg_read_file('/gridjson/genai.json')::jsonb)
, ('devops',pg_read_file('/gridjson/devops.json')::jsonb)
, ('msft',pg_read_file('/gridjson/msft.json')::jsonb)
, ('amzn',pg_read_file('/gridjson/amzn.json')::jsonb)
, ('goog',pg_read_file('/gridjson/goog.json')::jsonb)
, ('apache',pg_read_file('/gridjson/apache.json')::jsonb)
, ('fintech',pg_read_file('/gridjson/fintech.json')::jsonb)
, ('banking',pg_read_file('/gridjson/banking.json')::jsonb)
, ('house',pg_read_file('/gridjson/house.json')::jsonb)
, ('cloud',pg_read_file('/gridjson/cloud.json')::jsonb)
, ('services',pg_read_file('/gridjson/services.json')::jsonb)
, ('stream',pg_read_file('/gridjson/stream.json')::jsonb)
, ('shopify',pg_read_file('/gridjson/shopify.json')::jsonb)
;

INSERT INTO public.grids (gridname,panels) VALUES 
  ('builtin','[1,2,3,4,5,6,7,8]')
  , ('personal','[1,9,10,11,3,12,13,14]')
  ;

INSERT INTO public.usergrids (id,gid,isactive) VALUES 
(1,1,FALSE), (2,1,FALSE),(2,2,TRUE), (3,1,FALSE)
;
