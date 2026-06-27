# Asset rename checklist (manual, via GitHub web UI)

Code đã trỏ sang tên mới. Bạn cần đổi tên / upload đúng các file dưới đây trong `assets/`.
Scheme: `<prefix>-hero-N.jpg` (hero + ảnh card), `<prefix>-N.jpg` (gallery), `<prefix>-logo.png` (logo). Tất cả ảnh = **.jpg**.

## A. Đổi tên ảnh hero (rename file cũ → tên mới)
| Cũ | Mới |
|---|---|
| room.jpg | grappas-qre-hero-1.jpg |
| atmosphere.jpg | grappas-qre-hero-2.jpg |
| frontage.jpg | grappas-qre-hero-3.jpg |
| mobros.jpg | mostaccioli-hero-1.jpg |
| mobros-pizza.jpg | mo-bros-pizza-hero-1.jpg |
| happy-valley.jpg | happy-valley-hero-1.jpg |
| happy-valley-pizza.jpg | mickey-b-hero-1.jpg |
| gr-gibson.jpg | gissons-hero-1.jpg |
| *(cadillac: đã có cadillac-hero-1..5.jpg — giữ nguyên)* | |

## B. Logo (rename + đổi sang .png)
| Cũ | Mới |
|---|---|
| logo1.png | cadillac-logo.png |
| logo2.png | happy-valley-logo.png |
| logo4.png | mostaccioli-logo.png |
| logo5.png | mo-bros-pizza-logo.png |
| logo6.png | mickey-b-logo.png |
| logo7.png | gissons-logo.png |
| grappas-qre-logo.jpg | grappas-qre-logo.png |

## C. Gallery Grappa's (convert webp→jpg + rename)
p1…p15 → grappas-qre-1.jpg … grappas-qre-15.jpg
(p1–p13 đang .webp, p14–p15 .jpg → đổi hết thành .jpg)
*(cadillac-1..22.jpg đã đúng — giữ nguyên)*

## D. Upload mới
- eatearn-logo.jpg  (logo Eat & Earn — file logo.png bạn gửi, mình đã đặt sẵn)
- eatearn-qr.png    (QR đăng ký — mình tạo sẵn)

## E. Xoá (không còn dùng)
- cadillac.jpg  (card Cadillac giờ dùng cadillac-hero-1.jpg)
- logo3.png, logo8.png  (Inn Side Out / New LA Café — đã gỡ)
- inside-out.jpg, new-la-cafe.jpg
- tiktok.svg, x.svg  (đã gỡ TikTok + X)

## F. Xoá 2 trang outlet trong repo (icon thùng rác)
- inn-side-out.html
- new-la-cafe.html
