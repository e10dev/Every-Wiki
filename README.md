# K2L2
Wiki service with k8s. (feat. blockchain)  
  
Develop with [LibertyEngine](https://github.com/librewiki/liberty-engine).

## Build
```bash
# install dependencies
sudo apt update
sudo apt install -y vim && sudo apt install net-tools
sudo apt install -y mariadb-server
sudo apt install -y mariadb-plugin-mroonga
sudo apt install -y nginx
sudo apt install -y curl && sudo apt install -y git
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs

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
asdf
```
  
## Run
```bash
npm start
```

hihihi
