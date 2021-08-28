# Every Wiki
Wiki service with k8s. (feat. blockchain)  
  
Develop with [LibertyEngine](https://github.com/librewiki/liberty-engine).

## Build
root로 빌드 진행.
```bash
# install dependencies
apt update
apt install -y vim && sudo apt install net-tools
apt install -y mariadb-server
apt install -y mariadb-plugin-mroonga
apt install -y nginx
apt install -y curl && apt install -y git
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install -y nodejs

# install LibertyEngine
git clone https://github.com/librewiki/liberty-engine.git
cd liberty-engine
npm i
npm run setup
```
  
## Settings
```bash
....
? Do you want to create new database? (sudo) Yes
? Do you want to create mysql user? (sudo) Yes
? Do you want to grant privileges on mysql user? (sudo) Yes
? database name wikidb <- What you want.
? database username dbuser <- What you want.
? database password [hidden] <- What you want.
User/DB setup is complete.
? the name of wiki testwiki <- What you want.
? Wiki server domain name (e.g., www.wiki.com) localhost
? Port of the *internal* api server 3001
? Port of the *internal* view server 3000
? Wiki admin username wikiadm <- What you want.
? Wiki admin password [hidden] <- What you want.
? Wiki front page  <- Just Enter.
...
? Nginx config has been created on /root/liberty-engine/bin/localhost.
Do you want to move this to the /etc/nginx/sites-available and /etc/nginx/sites-enabled ? (sudo) (Y/n) Y
.......
? Are you interested in participating? (Y/n) Y
.......
ℹ Ready to run nuxt start                                             00:33:46
root@ubuntu:~#
```
  
## Run
```bash
npm start
```

