# Every Wiki
Wiki service with k8s. (feat. blockchain)  
  
Develop with [LibertyEngine](https://github.com/librewiki/liberty-engine).  
  
## Table of Contents
- [Requirements](#requirements)
- [Build](#build)
  * [main.yaml](#mainyaml)
  * [db.yaml](#dbyaml)
  * [secret.yaml](#secretyaml)
- [Run & Dev]
  * [Run](#run)
  * [Dev](#dev)
  
<br/>
  
## Requirements
* Linux: Ubuntu 18.04.5 LTS (Bionic Beaver)  
* FrontEnd: Vue.js  
* BackEnd: Express.js, Nginx (Reverse Proxy)  
* DataBase: Maria DB (with mroonga)  
  * Mroonga storage engine for fulltext search.
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
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000
      nodeName: wiki-worker2
      containers:
      - name: main-container
        image: e10docker/mainweb:0.5
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
          protocol: TCP
        volumeMounts:
        - name: mainweb-init
          mountPath: /home/ubuntu/Every-Wiki/bin/configData
        - name: mainweb-media-data
          mountPath: /home/ubuntu/Every-Wiki/media
        - name: mainweb-db-data
          mountPath: /var/lib/mysql
      volumes:
      - name: mainweb-init
        configMap:
          name: mainweb-init-config
      - name: mainweb-media-data
        persistentVolumeClaim:
          claimName: web-media-data-pvc
      - name: mainweb-db-data
        persistentVolumeClaim:
          claimName: web-db-data-pvc


```

### configmap.yaml
```yaml
# kubectl apply -f configMap.yaml
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

      "dbHost": "localhost", 
      "dbHostUserName": "root", 
      "dbHostPassword": "ycdc2021", 
      "dbName": "EveryDB", 
      "dbUserName": "EveryDBadm", 
      "dbPassword": "ycdc2021",

      "firstTimeSetup": false,

      "wikiName": "Every Wiki",
      "wikiDomain": "localhost",
      "apiPort": "3001",
      "viewPort": "3000",
      "adminUsername": "wikiadm",
      "adminPassword": "ycdc2021",
      "frontPageName": "main"
    }
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
  
## Run & Upgrade
  
### Run
```bash
kubectl exec {pod} -- npm start
```
### Upgrade
```bash
kubectl exec {pod} -- npm run upgrade
```
