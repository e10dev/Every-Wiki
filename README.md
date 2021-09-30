# Every Wiki
Wiki service with k8s. (feat. blockchain)  
  
Develop with [LibertyEngine](https://github.com/librewiki/liberty-engine).  
  
- [Requirements](#requirements)
- [Build](#build)
  * [main.yaml](#mainyaml)
  * [db.yaml](#dbyaml)
  * [secret.yaml](#secretyaml)
- [Run & Dev](#run---dev)
  * [Run](#run)
  * [Dev](#dev)
  
<br/>
  
## Requirements
* Linux: Ubuntu 18.04.5 LTS (Bionic Beaver)  
* FrontEnd: Vue.js  
* BackEnd: Express.js, Nginx (Reverse Proxy)  
* DataBase: Maria DB (with mroonga)  
  * Mroonga storage engine for fulltext search. `sudo apt install mariadb-plugin-mroonga`  
* Tools: Nuxt.js, pm2, Kubernetes  

<br/>

## Build
### main.yaml
```yaml
# kubectl apply -f main.yaml
#
# dbHost: "svc-db",             -> db host name (k8s service name)
# dbHostUserName: "root",       -> db user name (for create user)
# dbHostPassword: "ycdc2021",   -> db user password (for create user)
# dbName: "EveryDB",           -> create db name
# dbUserName: "EveryDBadm",    -> create user name
# dbPassword": "ycdc2021",      -> create user password
#
# adminUsername: "wikiadm",    -> web user name
# adminPassword": "ycdc2021",   -> web user password

apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-main
spec:
  replicas: 1
  selector:
    matchLabels:
      app: main-label
  template:
    metadata:
      name: deployment-main
      labels:
        app: main-label
    spec:
      securityContext:
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      nodeName: wiki-worker2
      containers:
      - name: main-container
        image: e10docker/mainweb:0.3
        imagePullPolicy: Always
        ports:
        - containerPort: 80
          protocol: TCP
        command: ["/bin/sh", "-c", "sudo service nginx start && npm run kubetest"]
        volumeMounts:
        - name: mainweb-init
          mountPath: /home/ubuntu/Every-Wiki/bin/configData/
      volumes:
      - name: mainweb-init
        configMap:
          name: mainweb-init-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: mainweb-init-config
data:
  installConfig.json: |
    {
      "createDbUser": true, 
      "createDatabase": true, 
      "grantDbUser": true, 

      "dbHost": "svc-db", 
      "dbHostUserName": "root", 
      "dbHostPassword": "ycdc2021", 
      "dbName": "EveryDB1", 
      "dbUserName": "EveryDBadm", 
      "dbPassword": "ycdc2021",

      "wikiName": "Every Wiki",
      "wikiDomain": "localhost",
      "apiPort": "3001",
      "viewPort": "3000",
      "adminUsername": "wikiadm",
      "adminPassword": "ycdc2021",
      "frontPageName": "main",

      "nginxMoveCopy": true
    }
```
### db.yaml
```yaml
# kubectl apply -f db.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-db
spec:
  replicas: 1
  selector:
    matchLabels:
      app: db-label
  template:
    metadata:
      name: deployment-mariadb
      labels:
        app: db-label
    spec:
      containers:
      - name: db-container
        image: e10docker/maindb:0.1
        ports:
        - containerPort: 3306
          protocol: TCP
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mariadb-password
              key: password
        volumeMounts:
        - name: mysql-initdb
          mountPath: /docker-entrypoint-initdb.d
      volumes:
      - name: mysql-initdb
        configMap:
          name: mysql-initdb-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-initdb-config
data:
  initdb.sql: |
    INSTALL SONAME 'ha_mroonga';
```
### secret.yaml
```yaml
# kubectl apply -f secret.yaml

apiVersion: v1
data:
  password: Your Password encoded by base64
kind: Secret
metadata:
  name: mariadb-password
type: Opaque
```
  
<br/>
  
## Run & Dev
  
### Run
```bash
npm start
```
### Dev
```bash
npm run dev  # run api server on dev mode
cd view/ && npm run dev  # run web on dev mode
```
