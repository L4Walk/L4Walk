---
title: CentOS7下配置mysql
date: 2023-09-17 16:38:43
tags: [mysql, linux, centos]
categorites: [linux, centos]
---

## 一、下载mysql

### 1.1 下载mysql

首先[官方下载MySQL Community Server](https://dev.mysql.com/downloads/mysql/5.5.html#downloads)

然后上传到服务器中



### 1.2 解压mysql

```bash
tar -xzvf mysql-8.0.34-linux-glibc2.28-x86_64.tar.gz                   
 （将mysql-8.0.34-linux-glibc2.28-x86_64.tar.gz压缩包解压到当前路径）
tar -xzvf mysql-8.0.34-linux-glibc2.28-x86_64 /usr /tmp            
 （将mysql-8.0.34-linux-glibc2.28-x86_64.tar.gz压缩包解压到/tmp）
 

```

### 1.3 复制到local文件夹

```bash
 mv  mysql-8.0.34-linux-glibc2.28-x86_64     /usr/local
```

### 1.4 修改文件夹名称

```bash
cd /usr/local
mv mysql-8.0.34-linux-glibc2.28-x86_64  mysql-8.0.34
```

## 二、修改配置

修改配置文件`my.cnf`

```bash
vi /etc/my.cnf

# 设置mysql客户端默认字符集
default-character-set=utf8 
socket=/var/lib/mysql/mysql.sock

[mysqld]
skip-name-resolve
#设置3306端口
port = 3306 
socket=/var/lib/mysql/mysql.sock
# 设置mysql的安装目录, 这里的目录一定要是你解压后并且改了名的目录哟..
basedir=/usr/local/mysql-8.0.34
# 设置mysql数据库的数据的存放目录, 这里的目录一定要是你解压后并且改了名的目录哟..
datadir=/usr/local/mysql-8.0.34/data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
lower_case_table_name=1
max_allowed_packet=16M

```



### 安装mysql

```bash
./scripts/mysql_install_db --user=mysql --basedir=/usr/local/mysql-8.0.34/ --datadir=/usr/local/mysql-8.0.34/data/

```

