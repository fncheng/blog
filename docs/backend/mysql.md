Ubuntu安装mysql

```sh
sudo apt install mysql-server
```

检查状态

```sh
sudo systemctl status mysql
```

开机自启

```sh
sudo systemctl enable mysql
```





### 重置密码

- 停止 MySQL 服务：

  ```sh
  sudo systemctl stop mysql
  ```

- 以安全模式启动 MySQL：

  ```sh
  sudo mysqld_safe --skip-grant-tables &
  ```

- 登录 MySQL：

  ```sh
  mysql -u root
  ```

- 修改root用户的密码：

  ```sql
  FLUSH PRIVILEGES;  -- 刷新权限
  ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';  -- 修改密码
  ```

- 退出并重启 MySQL：

  ```sh
  bash
  
  
  复制代码
  sudo systemctl restart mysql
  ```





Lost connection to MySQL server at 'reading initial communication packet', system error: 0

是一个常见的 MySQL 连接问题，通常与服务器和客户端之间的网络连接、MySQL 配置或权限设置相关。

**MySQL 配置文件 (`my.cnf` 或 `my.ini`) 中的设置**

- **bind-address**: 确保该值允许远程连接。例如，将其设置为 `0.0.0.0` 允许来自任何 IP 地址的连接。

- **skip-networking**: 确保没有启用此选项。该选项会禁用 MySQL 的 TCP/IP 网络连接。

```ini
[mysqld]
bind-address = 0.0.0.0
# skip-networking should be disabled
skip-networking = 0
```





```sql
CREATE USER 'username'@'%' IDENTIFIED BY 'your_password'; -- 创建用户
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION; -- 分配权限
FLUSH PRIVILEGES; -- 刷新权限
```

