# Basic-networking

Submission Menjadi Linux System Administrator - Kelas Proyek Konfigurasi SSH Server

[Sertifikat Kompetensi Kelas Menjadi Linux System Administrator](https://www.dicoding.com/certificates/NVP77Q0MOPR0)

## 🚀 Deskripsi Kelas

Kelas Proyek Konfigurasi SSH Server <br>
Disusun oleh: Dicoding Indonesia <br>
Level: Menengah

<div align="center">
  <img src="https://user-images.githubusercontent.com/95717485/225231893-e59de44d-0d3e-4e79-971b-a4d494565a74.png" alt="Dicoding AWS">
</div>

<br>

- **Pengenalan Linux** : Mengenal sistem operasi Linux dengan belajar open source, sistem operasi, dan arsitektur Linux. (2 jam)
- **Berinteraksi dengan Linux** : Mengerti bagaimana cara berinteraksi dengan sistem operasi Linux dengan belajar shell, user, dan user management. (1 jam 40 menit)
- **Filesystem** : Mengerti bagaimana cara bekerja dengan filesystem, mulai dari berinteraksi dengan disk, directory dan file, file permission, hingga file archiving. (2 jam 10 menit)
- **Shell Scripting** : Mengetahui bagaimana cara menulis shell scripting yang baik dan benar, mulai dari variable, data type, control flow, function, hingga input/output. (1 jam 48 menit)
- **Linux Services** : Mengetahui berbagai services yang tersedia di Linux dan memahami bagaimana cara pengelolaannya. (2 jam 30 menit)
- **Pemeliharaan Sistem** : Memahami berbagai praktik dalam memelihara sistem, seperti monitoring dan logging. (1 jam 45 menit)
- **VM dan Container** : Mengerti cara membuat serta mengelola VM dan container di sistem operasi Linux. (1 jam 30 menit)

Evaluasi Pembelajaran:

- Ujian akhir kelas
- Submission (Proyek Akhir) berupa tugas untuk mengonfigurasi SSH server dengan menerapkan kriteria-kriteria yang telah ditentukan.

Total jam yang dibutuhkan untuk menyelesaikan kelas ini adalah 25 jam.

## Tutorial Submission

Tata cara menjalankan project:

1. Buat User baru

```
adduser dicoding
```

2. Cobalah untuk meremote user yang sudah kita buat

```
ssh dicoding@localhost
```

- **Mulai dari ini. Ingat Lah user yang Anda pakai saat ini (selanjutnya disebut mesin pertama) ke alamat localhost dengan user bernama dicoding (selanjutnya disebut mesin kedua)** 

3. Buatlah key pair pada mesin pertama

```
ssh-keygen
```

4. Salin public key ke mesin kedua

```
ssh-copy-id -i ~/.ssh/id_rsa.pub dicoding@localhost
```

5. Ubah konfigurasi pada file /etc/ssh/sshd_config pada mesin pertama

```
Port 2000
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
```

6. Jalankan syntax berikut untuk Restart konfigurasi pada file /etc/ssh/sshd_config

```
systemctl restart sshd.service
```

7. Cobalah kembali untuk meremote mesin kedua

```
ssh -p 2000 dicoding@localhost
```

8. Copy sshd_config untuk bukti konfigurasi

```
cp /etc/ssh/sshd_config sshd_config
```

9. Langkah selanjutnya jalankan syntax berikut dalam mesin pertama untuk mendapatkan daftar user yang ada di sistem Linux Anda 

```
less /etc/passwd > daftar-user.txt
```

10. Jalankan syntax berikut untuk mengenkripsi file daftar-user.txt

```
gpg -c daftar-user.txt
```

11. Jalankan syntax berikut untuk mendapatkan entri log terkait SSH

```
journalctl -u ssh.service > log-ssh.txt
```

12. Jalankan syntax berikut untuk menyimpan entri log terkait SSH dalam bentuk JSON

```
journalctl -b -u ssh -o json-pretty > log-ssh.json
```

13. Buat file untuk konfigurasi shell bash

```
touch hapus-log.sh
```

14. Salinlah syntax berikut didalam file yang sudah kita buat tadi

```
#Proyek Konfigurasi SSH Server by adzkiaadi
#!/bin/bash
#Menggunakan perulangan while supaya semua perintah pada berkas script berjalan terus tanpa henti.
#Syntax while (open)
while true
do
#Menampilkan informasi penggunaan disk dari semua berkas journalctl, baik yang aktif maupun yang diarsipkan.
journalctl -a --disk-usage
echo ""
#Syntax untuk menjeda
sleep 3s
#Menghapus journalctl log hingga ruang disk yang digunakan untuk log berkisar 10 MB.
journalctl --vacuum-size=10M
echo ""
#Syntax untuk menjeda
sleep 3s
#menampilkan kembali informasi penggunaan disk dari semua berkas journalctl, baik yang aktif maupun yang diarsipkan.
journalctl -a --disk-usage
echo ""
#Syntax untuk menjeda
sleep 1m
#Syntax while (close)
done
```

15. Cobalah jalankan file sheel bash yang sudah kita konfigurasi tadi

```
./hapus-log.sh
```

16. Kumpulkan Semua File dalam satu folder/directory dan ubahlah ke bentuk zip
