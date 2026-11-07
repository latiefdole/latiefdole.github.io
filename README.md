# Saéfuku — situs resmi

Situs statis untuk brand hijab **Saéfuku** (Sukabumi). Dipublikasikan lewat GitHub Pages ke domain di `CNAME`.

## Struktur

| File | Isi |
| --- | --- |
| `index.html` | Beranda: hero, marketplace, koleksi, keunggulan, cara pesan, Instagram, CTA reseller |
| `about.html` | Tentang Saéfuku |
| `service.html` | Produk, panduan bahan, cara merawat |
| `pesan.html` | Form pesanan yang otomatis membuka WhatsApp |
| `contact.html` | Kontak, form pesan via WhatsApp, peta |
| `404.html` | Halaman tidak ditemukan |
| `css/style.css` | Seluruh gaya situs (token warna, tipografi, komponen) |
| `css/bootstrap.min.css` | Bootstrap 5 build kustom (sumber di `scss/`) |
| `js/main.js` | Header, slideshow hero, reveal, dan form WhatsApp |
| `img/produk/` | Foto produk (real pict) |

Tidak ada proses build. Edit HTML langsung, commit, selesai.

## Mengubah kontak dan tautan toko

Nomor WhatsApp, email, dan tautan marketplace muncul di beberapa tempat. Cari dan ganti:

- `6289657707497` (nomor WhatsApp, format internasional)
- `saefuku@gmail.com`
- `shopee.co.id/search?keyword=saefuku`, `tokopedia.com/search?q=saefuku`, `lazada.co.id/catalog/?q=saefuku` — ganti dengan URL etalase toko kalau sudah ada
- Di `js/main.js`, ubah `WA_NUMBER` agar form pesanan terkirim ke nomor yang benar.

## Menambah produk

1. Simpan foto persegi (1000×1000 px, JPG, di bawah 200 KB) ke `img/produk/`.
2. Salin satu blok `<article class="product-card">` di `index.html` dan `service.html`, lalu ganti foto, nama, bahan, ukuran, dan deskripsi.
3. Tambahkan `<option>` produk yang sama di form `pesan.html` supaya bisa dipilih pembeli.

## Menambah foto hero

Hero di `index.html` adalah slideshow. Tambahkan `<img>` baru di dalam `<div class="hero-slides">`
(disarankan maksimal 3 foto per model, persegi 1000×1000 px). Foto pertama tampil tanpa JavaScript.

## Kredit

Dibangun di atas Bootstrap 5 dan template "Arkitektur" dari HTML Codex (lihat `LICENSE.txt`).
