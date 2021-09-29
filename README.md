# Every Wiki
Wiki service with k8s. (feat. blockchain)  
  
Develop with [LibertyEngine](https://github.com/librewiki/liberty-engine).  
  
## Requirements
* Linux: Ubuntu 18.04.5 LTS (Bionic Beaver)  
* FrontEnd: Vue.js  
* BackEnd: Express.js, Nginx (Reverse Proxy)  
* DataBase: Maria DB (with mroonga)  
  * Mroonga storage engine for fulltext search. `sudo apt install mariadb-plugin-mroonga`  
* Tools: Nuxt.js, pm2  

## Build
root로 빌드 시 media부분에서 403 Error 발생. -> 일반 사용자로 설치 진행.
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
npm run setup
```
  
## Settings
```bash
....
? Do you want to create new database? (sudo) Yes
? Do you want to create mysql user? (sudo) Yes
? Do you want to grant privileges on mysql user? (sudo) Yes
? database name wikidb             <- Database name
? database username dbuser         <- DB username
? database password [hidden]       <- DB password
User/DB setup is complete.
? the name of wiki testwiki        <- Wiki name
? Wiki server domain name (e.g., www.wiki.com) localhost
? Port of the *internal* api server 3001
? Port of the *internal* view server 3000
? Wiki admin username wikiadm      <- Web admin username
? Wiki admin password [hidden]     <- Web admin password
? Wiki front page main             <- Main page name
...
? Nginx config has been created on /root/Every-Wiki/bin/localhost.
Do you want to move this to the /etc/nginx/sites-available and /etc/nginx/sites-enabled ? (sudo) (Y/n) Y
.......
? Are you interested in participating? (Y/n) Y
.......
ℹ Ready to run nuxt start                                             00:33:46
test@ubuntu:~/Every-Wiki$
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

  
  
## WSL service start (if not started)
```bash
sudo service nginx start
sudo service mysql start
```
  
  
## When Mroonga related error occurs
```bash
sudo mysql
mysql> INSTALL SONAME 'ha_mroonga';
```
