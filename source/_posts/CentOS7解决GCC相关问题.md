---
title: CentOS7解决GCC相关问题
date: 2023-09-17 17:14:46
tags: [gcc, linux, centos]
categorites: [linux, centos]
---

出现如下报错
![image-20230917171603712](G:\Photos\image-20230917171603712.png)

```bash
strings /usr/lib64/libstdc++.so.6 | grep GLIBC
```

![image-20230917171658468](G:\Photos\image-20230917171658468.png)

发现不存在指定版本，于是重新编译下载



## 升级gcc

### 2.1 安装GCC编译环境

```bash
yum groupinstall "Development Tools" -y
yum install glibc-static libstdc++-static -y
```



### 2.2 下载GCC源码

GCC下载地址，里面有各个版本的源码http://ftp.gnu.org/gnu/gcc/

```bash
wget http://ftp.gnu.org/gnu/gcc/gcc-13.2.0/gcc-13.2.0.tar.gz
```

### 2.3 解压并编译

```bash
 tar -zxvf gcc-13.2.0.tar.xz
 cd gcc-13.2.0
./contrib/download_prerequisites
mkdir build
cd build
```



```bash
../configure --enable-checking=release --enable-languages=c,c++ --disable-multilib
make
```

