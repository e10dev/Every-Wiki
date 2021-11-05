# Every Wiki
Wiki service with k8s. (feat. blockchain)  
  
Develop with [LibertyEngine](https://github.com/librewiki/liberty-engine).  
  
## Table of Contents
- [Requirements](#requirements)
- [Build](#build)
- [nginx Settings](#nginx-settings)
- [Run](#run)
  * [When Mroonga related error occurs](#when-mroonga-related-error-occurs)
  
<br/>

## Requirements
* Linux: Ubuntu 18.04.5 LTS (Bionic Beaver)  
* FrontEnd: Vue.js  
* BackEnd: Express.js, Nginx (Reverse Proxy)  
* DataBase: Maria DB (with mroonga)  
  * Mroonga storage engine for fulltext search. `sudo apt install mariadb-plugin-mroonga`  
* Tools: Nuxt.js, pm2  

## Build
```bash
# install dependencies
sudo apt update
sudo apt install -y vim && sudo apt install -y net-tools
sudo apt install -y mariadb-server
sudo apt install -y mariadb-plugin-mroonga
sudo apt install -y nginx
sudo apt install -y curl && sudo apt install -y git
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs

# install LibertyEngine
git clone https://github.com/e10dev/Every-Wiki.git
cd Every-Wiki
npm i

# modify installConfig.json
vi bin/configData

# setup
npm run setup
```
  
## nginx Settings
```bash
# cd /etc/nginx/sites-available
# sudo mv default default.bak
# sudo vi /etc/nginx/sites-available/localhost
server {
...
  server_name 192.168.13.101 <- Your IP or Domain
...
}
# :w /etc/nginx/sites-available/default
# :q!
```
<br/>

`sudo systemctl restart nginx` -> nginx 재시작
  
## Run
```bash
npm start
```
  
## When Mroonga related error occurs
```bash
sudo mysql
mysql> INSTALL SONAME 'ha_mroonga';
```
