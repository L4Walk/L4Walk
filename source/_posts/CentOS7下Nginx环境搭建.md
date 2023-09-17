---
title: CentOS7下Nginx环境
date: 2023-09-17 14:17:16
tags: [nginx, linux, centos]
categorites: [linux, centos]
---

## 一、插件安装

### 1.1 安装 gcc

```bash
yum -y install gcc
```

### 1.2 安装 pcre、pcre-devel

```bash
yum install -y pcre pcre-devel
```

### 1.3 安装 zlib

```bash
yum install -y zlib zlib-devel
```

### 1.4 安装 openssl

```bash
yum install -y openssl openssl-devel
```

## 下载并安装 Nginx

### 2.1 下载 Nginx

Nginx 官方下载网址为：[http://nginx.org/en/download.html](http://nginx.org/en/download.html?spm=a2c6h.12873639.article-detail.7.1f082a30EtNbMH)

在上面可以查看最新版本的 nginx 及下载，当前最新版本为 1.24.0

> 推荐下载 stable 版本，较为稳定

![1694931768237](https://raw.githubusercontent.com/L4Walk/photo/main/1694931768237.png)

这里选择在线下载的方式

```BASH
wget http://nginx.org/download/nginx-1.24.0.tar.gz 	# 如果没有wget，则用 yum install -y wget
```

### 2.2 解压

```bash
tar -xf nginx-1.24.0.tar.gz
```

### 2.3 编译并安装 Nginx

```bash
cd nginx-1.24.0

./configure --with-http_stub_status_module --with-http_ssl_module

make

make install
```

### 2.4 创建软连链接

```bash
ln -s /usr/local/nginx/sbin/nginx  /usr/local/bin
```

## 三 启动 Nginx

### 3.1 检查配置准确性

```bash
nginx -t
```

![image-20230917143542303](https://raw.githubusercontent.com/L4Walk/photo/main/image-20230917143542303.png)

### 3.2 启动

```bash
nginx
```

访问主机的 IP 地址，出现如下界面则表示已经安装成功了

![image-20230917143643077](https://raw.githubusercontent.com/L4Walk/photo/main/image-20230917143643077.png)
