create table products (
  id serial primary key,
  nama text
);

create table stock_masuk (
  id serial primary key,
  product_id int,
  jumlah int,
  tanggal date
);

create table invoice_detail (
  id serial primary key,
  product_id int,
  jumlah int,
  harga_jual_rp numeric
);
