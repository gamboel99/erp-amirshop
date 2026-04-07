const URL = "https://YOUR_PROJECT.supabase.co";
const KEY = "YOUR_KEY";

function convertUSD() {
  const rp = document.getElementById("rupiah").value;
  const kurs = document.getElementById("kurs").value;

  const usd = rp / kurs;
  document.getElementById("usd").innerText = "USD: $" + usd.toFixed(2);
}

async function tambahProduk() {
  const nama = document.getElementById("nama_produk").value;
  const harga = document.getElementById("harga_modal").value;

  await fetch(`${URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nama: nama,
      harga_modal_rp: harga
    })
  });

  alert("Produk tersimpan");
  loadProduk();
}

async function loadProduk() {
  const res = await fetch(`${URL}/rest/v1/products`, {
    headers: { apikey: KEY }
  });

  const data = await res.json();

  let html = "";
  data.forEach(p => {
    html += `<li>${p.nama} - Rp ${p.harga_modal_rp}</li>`;
  });

  document.getElementById("produkList").innerHTML = html;
}

loadProduk();
