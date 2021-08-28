# K2L2
Wiki service with k8s. (feat. blockchain)
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
