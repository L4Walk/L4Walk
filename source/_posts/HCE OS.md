---
title:  HCE OS 配置文档
date:   2023/8/5 14:21:06
tags:   
   - 常用命令
   - HCE OS
   - Linux
categories: 
   - [Linux, HCE OS]
index_img: /img/hceos.png
---

# HCE OS 

## 系统信息

```bash
# cat /etc/os-release
NAME="Huawei Cloud EulerOS"
VERSION="2.0 (x86_64)"
ID="hce"
VERSION_ID="2.0"
PRETTY_NAME="Huawei Cloud EulerOS 2.0 (x86_64)"
ANSI_COLOR="0;31"
```

## 配置可视化操作页面

### 配置yum源

因为HCE OS默认的yum源中没有可视化软件的安装包，所以需要配置新的yum源。

进入/etc/yum.repos.d目录，新建一个openEuler.repo文件，并将以下内容复制到该文件里面。

#### x86镜像

```
[HCEextra_base]
name=base
baseurl=https://repo.huaweicloud.com/openeuler/openEuler-22.03-LTS/everything/x86_64/
enabled=1
gpgcheck=0
 
[HCEextra_EPOL]
name=EPOL
baseurl=https://repo.huaweicloud.com/openeuler/openEuler-22.03-LTS/EPOL/main/x86_64/
enabled=1
gpgcheck=0
```

#### arm镜像

```
[HCEextra_base]
name=base
baseurl=https://repo.huaweicloud.com/openeuler/openEuler-22.03-LTS/everything/aarch64/
enabled=1
gpgcheck=0
 
[HCEextra_EPOL]
name=EPOL
baseurl=https://repo.huaweicloud.com/openeuler/openEuler-22.03-LTS/EPOL/main/aarch64/
enabled=1
gpgcheck=0
```

### 安装

1. 执行**yum install ukui**命令安装图形化界面工具。

2. 安装包下载完成后，执行

   systemctl set-default graphical.target

   命令设置下次启动方式为图形化启动。

   如果不执行此命令，下次启动方式将恢复为命令界面。

3. 执行**reboot**命令，重启后即可以图形界面启动HCE OS系统。

   ![点击放大](https://support.huaweicloud.com/usermanual-hce/zh-cn_image_0000001544270930.png)

4. 恢复repo文件。

   删除openEuler.repo文件，并将步骤[1](https://support.huaweicloud.com/usermanual-hce/hce_02_0068.html#hce_02_0068__li1346631019131)中删除的repo文件通过备份恢复。

## 系统常用命令

### 查看环境变量

```bash
env

```

## 配置MySql

```bash
yum -y install https://repo.mysql.com//mysql80-community-release-el8-7.noarch.rpm

yum -y install mysql-community-server
systemctl start mysqld
systemctl status mysqld

# 生成临时密码
grep ‘temporary password’ /var/log/mysqld.log

#登录并修改密码
mysql -u -root -p
set password = 'NEWpassWord@1';

#查看密码安全策略
show variables like '%policy%';

#查看用户信息
select host,user,authentication_string from mysql.user;

#查看mysql服务器端口号，版本
select @@port,@@version,@@basedir,@@datadir;
+--------+-----------+-----------+-----------------+
| @@port | @@version | @@basedir | @@datadir       |
+--------+-----------+-----------+-----------------+
|   3306 | 8.0.34    | /usr/     | /var/lib/mysql/ |
+--------+-----------+-----------+-----------------+

#修改root@localhost账号允许外网登录
rename user root@localhost to root;

#设置开机自启
systemctl enable mysqld
```

### 配置mysql环境

```shell
mkdir /usr/local/mysql
cd mysql
mkdir data
cd data
mkdir {3306,3307,log}
cd 3306
mkdir {data,log,tmp}
cd ../3307
mkdir {data,log,tmp}
```



```yaml
使用以下配置

# 启动多个mysql实例
[client] 
default-character-set = utf8mb4

[mysqld_multi] 
mysqld = /usr/local/mysql/bin/mysqld_safe
mysqladmin = /usr/local/mysql/bin/mysqladmin
log = /usr/local/mysql/data/log/mysqld_multi.log

[mysqld3306] 
mysqld=mysqld
mysqladmin=mysqladmin
datadir=/usr/local/mysql/data/3306/data
port=3306
user=mysql
performance_schema = off
server_id=3306
socket=/tmp/mysql_3306.sock
MyISAM_buffer_pool_size = 32M         #设置MyISAM 缓存大小
bind_address = 0.0.0.0                  #设置监听IP地址
skip-name-resolve = 0                 #关闭DNS反向解析 
log-output=file
slow_query_log = 1
long_query_time = 1
slow_query_log_file = /usr/local/mysql/data/3306/log/slow.log
log-error = /usr/local/mysql/data/3306/log/error.log
binlog_format = mixed
log-bin = /usr/local/mysql/data/3306/log/mysql3306_bin
explicit_defaults_for_timestamp=true
lower_case_table_names = 1
  
[mysqld3307] 
mysqld=mysqld
mysqladmin=mysqladmin
datadir=/usr/local/mysql/data/3307/data
port=3307
user=mysql
server_id=3307
performance_schema = off
MyISAM_buffer_pool_size = 32M         #设置MyISAM 缓存大小
bind_address = 0.0.0.0                  #设置监听IP地址
skip-name-resolve = 0                 #关闭DNS反向解析 
socket=/tmp/mysql_3307.sock
log-output=file
slow_query_log = 1
long_query_time = 1
slow_query_log_file = /usr/local/mysql/data/3307/log/slow.log
log-error = /usr/local/mysql/data/3307/log/error.log
binlog_format = mixed
log-bin = /usr/local/mysql/data/3307/log/mysql3307_bin
explicit_defaults_for_timestamp=true
lower_case_table_names = 1
```



## 配置FTP服务器

```shell
yum install -y vsftpd

#设置开机自启
systemctl enable vsftpd.service

#启动ftp服务
systemctl start vsftpd.service

#查看ftp端口
netstat -antup | grep ftp
tcp6       0      0 :::21         :::*                    LISTEN      131600/vsftpd   

#创建ftpadmin用户
useradd ftpadmin
passwd ftpadmin

#创建FTP使用的文件目录
mkdir /var/ftp/work01

#将所有者改为登录FTP的本地用户
chown -R ftpadmin:ftpadmin /var/ftp/work01

#设置参数
vi /etc/vsftpd/vsftpd.conf

#主动模式 设置以下参数，不允许匿名登录FTP服务器，允许本地用户登录FTP服务器，并指定FTP本地用户使用的文件目录。
anonymous_enable=NO              #不允许匿名登录FTP服务器
local_enable=YES                 #允许本地用户登录FTP服务器
local_root=/var/ftp/work01       #FTP本地用户使用的文件目录

#设置以下参数，限制用户只能访问自身的主目录。
chroot_local_user=YES                      #所有用户都被限制在其主目录
chroot_list_enable=YES                     #启用例外用户名单
chroot_list_file=/etc/vsftpd/chroot_list   #例外用户名单
allow_writeable_chroot=YES                 

#被动模式 除了需要配置主动模式所需的所有参数外，还需要配置的参数如下：

#设置以下参数，配置FTP支持被动模式。并指定FTP服务器的公网IP地址，以及可供访问的端口范围，端口范围请根据实际环境进行设置。
listen=YES                    
listen_ipv6=NO                
pasv_address=xx.xx.xx.xx      #FTP服务器的公网IP地址
           
pasv_min_port=3000            #被动模式下的最小端口
pasv_max_port=3100            #被动模式下的最大端口

# 创建chroot_list,限制在主目录下的例外用户名单。如果需要设置某个用户不受只可以访问其主目录的限制，可将对应的用户名写入该文件。如果没有例外也必须要有“chroot_list”文件，内容可为空。
cd /etc/vsftpd/
touch chroot_list

#重启服务
systemctl restart vsftpd.service
```

**客户端测试**

打开客户端的计算机，在路径栏输入“ftp://*FTP服务器IP地址*:*FTP端口*”(如果不填端口则默认访问21端口) 。弹出输入用户名和密码的对话框表示配置成功，正确的输入用户名和密码后，即可对FTP文件进行相应权限的操作。



## 配置docker

### 下载Docker

1. 通过wget命令下载RPM包

   登录openEuler社区：[repo.openeuler.org/openEuler-22.03-LTS/](https://repo.openeuler.org/openEuler-22.03-LTS/)

   选择x86_64 Packages[repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/](https://repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/)

2. 查找所需要的rpm包[docker-engine-18.09.0-300.oe2203.x86_64.rpm](https://repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/docker-engine-18.09.0-300.oe2203.x86_64.rpm)，并用wget命令下载

```bash
wget https://repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/docker-engine-18.09.0-300.oe2203.x86_64.rpm

```

3. 安装

   ```bash
   rpm -ivh docker-engine-18.09.0-300.oe2203.x86_64.rpm
   ```

4. 提示缺少`ibcgroup is needed by docker-engine-18.09.0-300.oe2203.x86_64`

5. 使用同样的命令安装依赖

   ```bash
   wget https://repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/libcgroup-0.42.2-1.oe2203.x86_64.rpm
   
   wget https://repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/libcgroup-devel-0.42.2-1.oe2203.x86_64.rpm
   
   wget https://repo.openeuler.org/openEuler-22.03-LTS/OS/x86_64/Packages/libcgroup-help-0.42.2-1.oe2203.x86_64.rpm
   
   rpm -ivh libcgroup-0.42.2-1.oe2203.x86_64.rpm
   rpm -ivh libcgroup-devel-0.42.2-1.oe2203.x86_64.rpm 
   rpm -ivh libcgroup-help-0.42.2-1.oe2203.x86_64.rpm 
   ```

6. 最后安装docker

   ```bash
    rpm -ivh docker-engine-18.09.0-300.oe2203.x86_64.rpm
   ```

   

### 配置Docker

1. 启动docker

   - 通过命令行启动

     ```bash
     docker daemon -D #命令行启动，-D打开调试,若要停止，kill掉docker进程
     ```

     

   - 通过sytemd服务启动

     ```bash
     systemctl start docker   #服务的方式来启动，停止为stop
     ```



2. 修改`docker`配置启动参数

   `vim /usr/lib/systemd/system/docker.service`

   ```bash
   # vim /usr/lib/systemd/system/docker.service
   [Unit]
   Description=Docker Application Container Engine
   Documentation=https://docs.docker.com
   After=network.target
   
   [Service]
   Type=notify
   EnvironmentFile=-/etc/sysconfig/docker
   EnvironmentFile=-/etc/sysconfig/docker-storage
   EnvironmentFile=-/etc/sysconfig/docker-network
   Environment=GOTRACEBACK=crash
   # the default is not to use systemd for cgroups because the delegate issues still
   # exists and systemd currently does not support the cgroup feature set required
   # for containers run by docker
   ExecStart=/usr/bin/docker daemon $OPTIONS \
             $DOCKER_STORAGE_OPTIONS \
             $DOCKER_NETWORK_OPTIONS \
             $ADD_REGISTRY \
             $BLOCK_REGISTRY \
             $INSECURE_REGISTRY
   LimitNOFILE=1048576
   LimitNPROC=1048576
   LimitCORE=infinity
   TimeoutStartSec=0
   # set delegate yes so that systemd does not reset the cgroups of docker containers
   Delegate=yes
   # kill only the docker process, not all processes in the cgroup
   KillMode=process
   
   [Install]
   WantedBy=multi-user.target
   ```

   > 1. 通过“systemctl restart docker”重启服务使配置生效。
   > 2. EnvironmentFile=-/etc/sysconfig/docker，定义环境变量所在的文件。该文件中定义的环境变量可以在/usr/lib/systemd/system/docker.service文件中进行引用。
   > 3. docker服务程序的启动参数需要加到“ExecStart”的后面。

3. 配置`Docker`外网代理

   若要从docker hub上pull镜像，还需要设置代理

   1. 在`/usr/lib/systemd/system/docker.service`中添加

      `Environment="HTTPS_PROXY=https://username:passwd@proxyhk.huawei.com:8080"`

   2. 重启`dameon`使配置生效

      ```shell
      systemctl daempn-reload
      systemctl restart docker
      ```

4. 设置开机自启动

   ```shell
   #设置开机自启动
   systemctl enable docker.service
   ```



## 配置Nginx

### 下载Nginx

```shell
yum
```

### 解决 413 Request Entity Too Large（请求实体太大）

```shell
vim nginx.conf
#在http{}中加入 
client_max_body_size 10m;
#重启
systemctl restart nginx
```





## 配置PHP

> openEuler的[yum源](https://so.csdn.net/so/search?q=yum源&spm=1001.2101.3001.7020)默认使用的是php7.2.10版本，安装其他版本需要编译安装，在此以php7.4.x版本举例。

```shell
#安装依赖包
yum -y install cmake libxml2 libxml2-devel openssl openssl-devel curl-devel libjpeg-devel libpng-devel freetype-devel libzip libzip-devel libsodium sqlite sqlite-devel oniguruma oniguruma-devel libwebp-devel 


#获取压缩包并解压。
tar -xvf php-7.4.9.tar.gz 
cd php-7.4.9

#配置安装参数
./configure --prefix=/usr/local/php7 --with-config-file-path=/usr/local/php7/etc --with-config-file-scan-dir=/usr/local/php7/etc/php.d --enable-mysqlnd --with-mysqli --with-pdo-mysql --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --enable-gd  --with-iconv --with-zlib --enable-xml --enable-shmop --enable-sysvsem --enable-inline-optimization --enable-mbregex --enable-mbstring --enable-ftp --with-openssl --enable-pcntl --enable-sockets --with-xmlrpc --with-zip --with-jpeg --with-webp --enable-soap --without-pear --with-gettext --enable-session --with-curl --with-freetype --enable-opcache --disable-fileinfo

#编译安装
make && make install

#创建软连接并查看版本
ln -s /usr/local/php7/bin/php /usr/bin/php
php -v
# php -v
PHP 7.4.9 (cli) (built: Aug 16 2023 15:22:11) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies

#设置php-fpm开机自启
cp php.ini-production /usr/local/php7/etc/php.ini
cd /usr/local/php7/etc
cp php-fpm.conf.default php-fpm.conf
cp php-fpm.d/www.conf.default php-fpm.d/www.conf
cp /root/php-7.4.9/sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
chmod +x /etc/init.d/php-fpm
chkconfig --add php-fpm
chkconfig php-fpm on
service php-fpm start

#查看php-fpm运行状态
service php-fpm status

```

修改nginx文件以支持PHP

```shell
vim /etc/nginx/conf.d/default.conf

#添加
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
# 执行
service nginx reload

```

3测试

```shell
vim /usr/share/nginx/html/info.php
```

```php
<?php
 phpinfo();
?>
```





## 配置WordPress

> 需要mysql，nginx，php

```shell
#新建数据库
mysql -u root -p

CREATE DATABASE wordpress;

#检查是否创建成功
show databases;

#创建wordpress专属用户并赋予全部权限
CREATE USER L4Walk_wordpress@'localhost' IDENTIFIED BY 'LeoLuljy666!';

GRANT ALL privileges ON wordpress.* TO L4Walk_wordpress@'localhost';

#设置密码永不过期
ALTER USER 'L4Walk_wordpress'@'localhost' PASSWORD EXPIRE NEVER;
```

在wordpress官网上下载安装包，上传到`/usr/share/nginx/html`目录，并进入。

```shell
#解压，解压后生成一个“wordpress”的文件夹。
tar -zxvf /usr/share/nginx/html/wordpress-6.3-zh_CN.tar.gz

#执行以下命令，设置解压后的文件权限。
chmod -R 777 wordpress
```

### wordpress安装插件错误(wp-content)权限问题

```shell
vim wp-config.php

define("FS_METHOD","direct");

define("FS_CHMOD_DIR", 0777);

define("FS_CHMOD_FILE", 0777);
```

### wordpress 安装失败:无法创建目录

```shell
chmod -R 777 /usr/share/nginx/html/wordpress（这个操作不太安全）
```



# Nignx

## 常用命令

### yum方式安装的默认地址和配置的默认地址

```shell
/etc/nginx/nginx.conf  //yum方式安装后默认配置文件的路径
/usr/share/nginx/html  //nginx网站默认存放目录
/usr/share/nginx/html/index.html //网站默认主页路径
```

### 基本操作

```shell
#启动nginx
service nginx start

#停止nginx
service nginx stop

#重载nginx
service nginx reload

#查看进程apache/httpd
ps -ef | grep nginx

#查看服务端口
netstat -anpl | grep 'nginx'
```



## 配置多个server



```nginx
server	{
	listen		80;
	server_name	server1.com;
    
    location /{
        proxy_pass	127.0.0.1:port1;
    }
}

server	{
	listen		80;
	server_name	server2.com;
    
    location /{
        proxy_pass	127.0.0.1:port2;
    }
}
```



## WordPress

---

# .Net的部署和应用

在publish文件夹下，使用`dotnet 项目名.dll`

# Docker

## 常用命令

### 容器自启动

```shell
docker update --restart=always 容器名称
```

### 进入容器内部

```shell
docker exec -it 容器ID /bin/bash		
docker exec -it 容器名称 /bin/bash		
```

### 容器内部下载vim

```shell
#yum
yum update -y && yum install -y vim

#apt
apt-get update && apt-get install -y vim
```



---

## 配置mysql 一主一从

### 下载mysql

```bash
#查询mysql镜像，选择官方版本
docker search mysql

#下载5.7版本
docker pull mysql:5.7

#查看下载的镜像
```

### 搭建MySql主从分布

```bash
#master
docker run -p 3301:3306 --name mysql-master -e MYSQL_ROOT_PASSWORD=LeoLuljy666 -d mysql:5.7

#salve
docker run -p 3302:3306 --name mysql-slave -e MYSQL_ROOT_PASSWORD=LeoLuljy666 -d mysql:5.7

#设置docker容器自启动
docker update --restart=always mysql-master
docker update --restart=always mysql-slave

```

用mysql workbench查看是否开启成功

### 配置Master

进入master容器内部

```shell
docker exec -it 8b71301f25ed /bin/bash		 //8b71301f25ed为容器ID
docker exec -it mysql-master /bin/bash		 //mysql-master为容器名称
```

docker内部安装vim

```shell
#yum
yum update -y && yum install -y vim

#apt
apt-get update && apt-get install -y vim
```

修改`etc/my.cnf`文件

```shell
[mysqld]
## 同一局域网内注意要唯一
server-id=100  
## 开启二进制日志功能，可以随便取（关键）
log-bin=master-bin
binlog-format=ROW     // 二级制日志格式，有三种 row，statement，mixed
binlog-do-db=数据库名  //同步的数据库名称,如果不配置，表示同步所有的库
```

重启mysql服务

```shell
exit

docker restart mysql-master
```

创建数据库同步账户

```shell
docker exec -it mysql-master /bin/bash

#在Master数据库创建数据同步用户，授予用户 slave REPLICATION SLAVE权限和REPLICATION CLIENT权限，用于在主从库之间同步数据。
mysql -uroot -pLeoLuljy666

mysql> CREATE USER 'slave'@'%' IDENTIFIED BY 'LeoLuljy666';

mysql> GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';

```

支持Master配置完成

### 配置Slave

```shell
#进入容器内部
docker exec -it mysql-slave /bin/bash

#下载vim
yum update -y && yum install -y vim

vim my.cnf
[mysqld]
## 设置server_id,注意要唯一
server-id=101  
## 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
log-bin=mysql-slave-bin   
## relay_log配置中继日志
relay_log=mysql-relay-bin  
read_only=1  ## 设置为只读,该项如果不设置，表示slave可读可写

#重启容器
```

### 开启Master-Slave主从复制

```shell
#进入master客户端并登录
docker exec -it mysql-master /bin/bash
mysql -uroot -pLeoLuljy666

#查看status
show master status;

+-------------------+----------+--------------+------------------+-------------------+
| File              | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+-------------------+----------+--------------+------------------+-------------------+
| master-bin.000001 |      617 |              |                  |                   |
+-------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)

#不操作master，进入slave

#查询master的独立ip
docker inspect --format='{{.NetworkSettings.IPAddress}}' mysql-master

docker exec -it mysql-slave /bin/bash
mysql -uroot -pLeoLuljy666

#执行下列命令
change master to master_host='172.17.0.2', master_user='slave', master_password='LeoLuljy666', master_port=3306, master_log_file='master-bin.000001', master_log_pos=617, master_connect_retry=30;

```

> 命令说明
>
> ***master_host*** ：Master库的地址，指的是容器的独立ip,
>
> ***master_port***：Master的端口号，指的是容器的端口号
> ***master_user***：用于数据同步的用户
> ***master_password***：用于同步的用户的密码
> ***master_log_file***：指定 Slave 从哪个日志文件开始复制数据，即上文中提到的 File 字段的值
> ***master_log_pos***：从哪个 Position 开始读，即上文中提到的 Position 字段的值
> ***master_connect_retry***：如果连接失败，重试的时间间隔，单位是秒，默认是60秒

在slave的终端中执行

```mysql
show slave status\G

*************************** 1. row ***************************
               Slave_IO_State: 
                  Master_Host: 172.17.0.2
                  Master_User: slave
                  Master_Port: 3306
                Connect_Retry: 30
              Master_Log_File: master-bin.000001
          Read_Master_Log_Pos: 617
               Relay_Log_File: mysql-relay-bin.000001
                Relay_Log_Pos: 4
        Relay_Master_Log_File: master-bin.000001
             Slave_IO_Running: No
            Slave_SQL_Running: No
              Replicate_Do_DB: 
          Replicate_Ignore_DB: 
           Replicate_Do_Table: 
       Replicate_Ignore_Table: 
      Replicate_Wild_Do_Table: 
  Replicate_Wild_Ignore_Table: 
                   Last_Errno: 0
                   Last_Error: 
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 617
              Relay_Log_Space: 154
              Until_Condition: None
               Until_Log_File: 
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File: 
           Master_SSL_CA_Path: 
              Master_SSL_Cert: 
            Master_SSL_Cipher: 
               Master_SSL_Key: 
        Seconds_Behind_Master: NULL
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error: 
               Last_SQL_Errno: 0
               Last_SQL_Error: 
  Replicate_Ignore_Server_Ids: 
             Master_Server_Id: 0
                  Master_UUID: 
             Master_Info_File: /var/lib/mysql/master.info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: 
           Master_Retry_Count: 86400
                  Master_Bind: 
      Last_IO_Error_Timestamp: 
     Last_SQL_Error_Timestamp: 
               Master_SSL_Crl: 
           Master_SSL_Crlpath: 
           Retrieved_Gtid_Set: 
            Executed_Gtid_Set: 
                Auto_Position: 0
         Replicate_Rewrite_DB: 
                 Channel_Name: 
           Master_TLS_Version: 
1 row in set (0.00 sec)
```

发现` Slave_IO_Running: No Slave_SQL_Running: No`，说明并未进行主从复制

使用`start slave`开启主从复制，并再次查询，发现两个已经为yes。

### 排错

若`Slave_IO_Running`一直是`Connecting`，则说明是一直是连接状态，可以根据`Last_IO_Error`予以排除。

一般有如下原因

1. 网络不通：检查ip,端口
2. 密码不对：检查是否创建用于同步的用户和用户密码是否正确
3. pos不对：检查Master的 Position

### 测试

进行mysql的主从复制有很多方式，此处我们进行一个简单的测试。

1. 在master中创建一个新库`test`

   ```mysql
   mysql> create database test;
   Query OK, 1 row affected (0.00 sec)
   
   mysql> show databases;
   +--------------------+
   | Database           |
   +--------------------+
   | information_schema |
   | mysql              |
   | performance_schema |
   | sys                |
   | test               |
   +--------------------+
   5 rows in set (0.01 sec)
   ```

   此时在slave中应该也有test库

   ```mysql
   mysql> show databases;
   +--------------------+
   | Database           |
   +--------------------+
   | information_schema |
   | mysql              |
   | performance_schema |
   | sys                |
   | test               |
   +--------------------+
   5 rows in set (0.00 sec)
   ```

2. 在`test`库中创建新表`mytbl`，并插入数据

   ```mysql
   mysql> use test
   Database changed
   mysql> create table mytbl (id varchar(16),name varchar(32));
   Query OK, 0 rows affected (0.01 sec)
   
   mysql> insert into mytbl values (1,'L4Walk');
   Query OK, 1 row affected (0.01 sec)
   
   mysql> select * from mytbl;
   +------+--------+
   | id   | name   |
   +------+--------+
   | 1    | L4Walk |
   +------+--------+
   1 row in set (0.00 sec)
   ```

   在`salve`中查看

   ```mysql
   mysql> use test;
   Reading table information for completion of table and column names
   You can turn off this feature to get a quicker startup with -A
   
   Database changed
   mysql> show tables;
   +----------------+
   | Tables_in_test |
   +----------------+
   | mytbl          |
   +----------------+
   1 row in set (0.00 sec)
   
   mysql> select * from mytbl;
   +------+--------+
   | id   | name   |
   +------+--------+
   | 1    | L4Walk |
   +------+--------+
   ```

   至此，mysql的一主一从复制结构就已经完成了

   ### 停止slave从服务复制功能

   `stop slave;`

   ### 重新配置主从

   `stop slave;`

   `reset master`