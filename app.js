const URL = "https://YOUR_PROJECT.supabase.co";
const KEY = "YOUR_KEY";

// KONVERSI USD
function convert(){
  let rp = document.getElementById("rp").value;
  let kurs = document.getElementById("kurs").value;

  let usd = rp / kurs;

  document.getElementById("usd").innerText = "USD: $" + usd.toFixed(2);
}

// LOAD PRODUK KE DROPDOWN
async function loadProduk(){
  const res = await fetch(`${URL}/rest/v1/products`, {
    headers:{apikey:KEY}
  });

  const data = await res.json();

  let html = "";

  data.forEach(p=>{
    html += `<option value="${p.id}">${p.nama}</option>`;
  });

  document.getElementById("produkSelect").innerHTML = html;
}

// INPUT PENJUALAN
async function tambahPenjualan(){

  const product_id = document.getElementById("produkSelect").value;
  const jumlah = document.getElementById("qty").value;
  const harga = document.getElementById("harga").value;

  await fetch(`${URL}/rest/v1/invoice_detail`, {
    method:"POST",
    headers:{
      apikey:KEY,
      Authorization:`Bearer ${KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      product_id: product_id,
      jumlah: jumlah,
      harga_jual_rp: harga
    })
  });

  alert("Penjualan tersimpan");
  loadLaporan();
}

// LOAD LAPORAN
async function loadLaporan(){

  const produk = await fetch(`${URL}/rest/v1/products`, {headers:{apikey:KEY}}).then(r=>r.json());
  const masuk = await fetch(`${URL}/rest/v1/stock_masuk`, {headers:{apikey:KEY}}).then(r=>r.json());
  const jual = await fetch(`${URL}/rest/v1/invoice_detail`, {headers:{apikey:KEY}}).then(r=>r.json());

  let kurs = 15500; // default

  let html = "";

  produk.forEach(p=>{

    let totalMasuk = masuk
      .filter(x=>x.product_id == p.id)
      .reduce((a,b)=>a + b.jumlah, 0);

    let totalJual = jual
      .filter(x=>x.product_id == p.id)
      .reduce((a,b)=>a + b.jumlah, 0);

    let totalUang = jual
      .filter(x=>x.product_id == p.id)
      .reduce((a,b)=>a + (b.jumlah * b.harga_jual_rp), 0);

    let sisa = totalMasuk - totalJual;
    let usd = totalUang / kurs;

    html += `
    <tr>
      <td>${p.nama}</td>
      <td>${totalMasuk}</td>
      <td>${totalJual}</td>
      <td>${sisa}</td>
      <td>Rp ${totalUang}</td>
      <td>$${usd.toFixed(2)}</td>
    </tr>
    `;
  });

  document.getElementById("laporan").innerHTML = html;
}

// INIT
loadProduk();
loadLaporan();
