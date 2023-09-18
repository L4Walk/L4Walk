---
title: CentOS7部署PythonFastAPI项目
date: 2023-09-18 22:33:29
tags: [python, linux, centos]
categorites: [linux, centos]
index_img: /img/CentOS.png
---



部署 FastAPI 应用到 CentOS 服务器可以分为几个步骤。以下是一个简化的

部署流程：

1. **环境准备**:

   - 确保您的 CentOS 服务器已经更新到最新版本。可以使用以下命令进行更新:

     ```
     sudo yum update -y
     ```

2. **安装 Python**:

   - 如果您的服务器上还没有安装 Python，您可以使用以下命令安装 Python 3:

     ```
     sudo yum install python3 -y
     ```

3. **创建虚拟环境**:

   - 创建一个新的 Python 虚拟环境以隔离您的 FastAPI 应用的依赖项:

     ```
     python3 -m venv myenv
     source myenv/bin/activate
     ```

4. **安装 FastAPI 和 Uvicorn**:

   - 使用 pip 安装 FastAPI 和 Uvicorn (一个 ASGI 服务器):

     ```
     pip install fastapi[all] uvicorn
     ```

5. **部署您的 FastAPI 应用**:

   - 将您的 FastAPI 应用代码上传到服务器，然后在虚拟环境中启动应用:

     ```
     uvicorn your_app:app --host 0.0.0.0 --port 8000
     ```

6. **设置反向代理 (可选)**:

   - 为了更好的性能和安全性，建议使用 Nginx 或 Apache 作为反向代理。

   - 安装 Nginx:

     ```
     sudo yum install nginx -y
     ```

   - 配置 Nginx 以转发请求到 Uvicorn。编辑 Nginx 的配置文件并添加以下内容:

     ```
     location / {
         proxy_pass http://127.0.0.1:8000;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     }
     ```

   - 重新启动 Nginx 以应用更改。

7. **设置为服务启动 (可选)**:

   - 使用 systemd 创建一个服务文件，这样您就可以在启动时自动启动应用，并在应用崩溃时自动重启应用。

8. **安全性**:

   - 考虑使用防火墙 (如 firewalld) 限制访问。
   - 使用 HTTPS 来保护您的数据传输。Let's Encrypt 提供了免费的证书。

这只是一个基本的部署指南。在实际部署中，您可能需要考虑很多其他因素，如数据库连接、环境变量管理、日志和监控等。希望这个指南能为您提供一个良好的起点！
