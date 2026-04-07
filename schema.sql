create table products (
  id uuid primary key default uuid_generate_v4(),
  nama text,
  harga_modal_rp numeric
);
