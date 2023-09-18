---
title: php环境搭建
date: 2023-09-17 13:37:44
tags: [php, linux, 环境搭建]
categorites: [linux, centos]
index_img: /img/php.jpeg
---

## 依赖安装

```bash
yum -y install libxml2 libxml2-devel openssl openssl-devel libcurl libcurl-devel install libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel
```

## 源码安装

### 2.1 下载源码并解压

地址为：https://www.php.net

仍下载stable版本

```bash
wget https://www.php.net/distributions/php-8.2.10.tar.gz
```

### 2.2 解压源码

```bash
tar -zxvf php-8.2.10.tar.gz
```

### 2.3 编译源码并安装

```bash
cd php-8.2.10
./configure --prefix=/usr/local/php

```

![image-20230917151114966](G:\Photos\image-20230917151114966.png)

```bash
make && make install
```

### 2.4 配置环境变量

```bash
cd /usr/local/php/bin
./php -v
```

![image-20230917154734344](G:\Photos\image-20230917154734344.png)

```bash
vim /etc/profile
#写入如下内容
export PHP_HOME=/usr/local/php/
export PATH=$PHP_HOME/bin:$PATH
#保存并退出
source /etc/profile
```

![image-20230917155223437](G:\Photos\image-20230917155223437.png)

```bash
#再次查看，是否生效
php -v
```

![image-20230917155246599](G:\Photos\image-20230917155246599.png)

## 三 部署php

编辑nginx

```bash
vim /usr/local/nginx/conf/php.conf

# 输入如下内容
server {
        listen       80;
        server_name  localhost;

        #access_log /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.php index.html index.htm;    }

    location ~ \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME /usr/share/nginx/html$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

