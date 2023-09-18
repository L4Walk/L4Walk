---
title: CentOS下部署Python环境
date: 2023-09-18 19:03:28
tags: [python, linux, centos]
categorites: [linux, centos]
index_img: /img/CentOS.png
---

## 一、安装Python

### 1.1查看当前系统中的Python版本

```bash
python --version
```

![image-20230918190545627](G:\Photos\image-20230918190545627.png)

### 1.2 安装开发工具包和其他依赖

```bash
yum groupinstall -y "Development tools"
yum install -y zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel

```

### 1.3 安装python

去官方下载python[Python Source Releases | Python.org](https://www.python.org/downloads/source/)

```bash
wget https://www.python.org/ftp/python/3.10.9/Python-3.10.9.tgz
```

### 1.4 解压并编译Python

```bash
tar zxf Python-3.10.9.tgz -C /usr/src
cd /usr/src/Python-3.10.9/
./configure && make && make install
```

## 二、配置Python

### 2.1 更新系统默认Python版本

```bash
mv /usr/bin/python /usr/bin/python.old
```

### 2.2 删除默认软链接

```bash
rm -f /usr/bin/python-config
```

### 2.3 创建新的Python软连接

```bash
ln -s /usr/local/bin/python3 /usr/bin/python
ln -s /usr/local/bin/python3-config /usr/bin/python-config
ln -s /usr/local/include/python3.8/ /usr/include/python3.8
```

### 2.4 编辑/usr/bin/yum文件

```bash
#!/usr/bin/python2.7

```

![image-20230918202757578](G:\Photos\image-20230918202757578.png)

### 2.5 查看python版本

```bash
python --version
```

![image-20230918202940563](G:\Photos\image-20230918202940563.png)




