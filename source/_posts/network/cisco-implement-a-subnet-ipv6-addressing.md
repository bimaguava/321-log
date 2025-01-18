---
draft: true
comments: true
toc: true
title: 'Cisco: Implement a subnet IPv6 addressing'
date: 2020-09-11T11:33:00.000Z
updated: null
category:
  - network
  - itn
tags:
  - cisco
photos: >-
  https://res.cloudinary.com/bimagv/image/upload/v1608572894/banner/cisco-itn_qy4u8i.png
excerpt: Mempelajari sistem subnet IP version 6 dan implementasi pada Router dan PC
_template: blog_post
---


# **Objectives**

* Menentukan subnet IPv6
* Configure IPv6 Address pada router dan PC
* Verifikasi kontektivitas IPv6

# **Lab**

![](https://res.cloudinary.com/bimagv/image/upload/v1599781824/2020-09/2020-11-09_Jum_06_50_10_ogano1.png)

Berikut jaringan yang simpel dengan 4 LAN yang akan dikonfigurasi dengan menggunakan IPv6 Addressing pada router maupun pc.

# **Tabel Address**

![](https://res.cloudinary.com/bimagv/image/upload/v1599780606/2020-09/2020-11-09_Jum_06_26_24_t6htyx.png)

# 1. Menentukan subnet IPv6

Kita memiliki subnet untuk R1 G0/0/ LAN, yaitu `2001:db8:acad:00c8::/64`. Tugas kita ialah menentukan 4 subnet lagi untuk setiap network

* R1 G0/0/ LAN: **`2001:db8:acad:00c8::/64`**
* R1 G0/1 LAN: ...........................
* R2 G0/0 LAN: ..............................
* R2 G0/1 LAN: ....................................
* R1 to R2 link network: ..................................
