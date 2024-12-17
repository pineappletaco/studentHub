# 安裝與執行指引

## 1.下載專案
clone專案並導至專案位置
```
git clone https://github.com/pineappletaco/studentHub.git
cd yourpath/studentHub
```
## 2.安裝及執行前端
進到前端目錄後，安裝所需套件
```bash
cd Front
npm i
```

執行前端
```bash
npm run dev
```

## 3.安裝及執行後端
進到後端目錄後，安裝所需套件
```bash
cd BackDB
npm i
```

將 .env.example 文件重命名為 .env並修改為你的設定

```env
DBUSER = user             # 資料庫使用者
DBPASSWORD=password       # 資料庫密碼
DBHOST=127.0.0.1          # 資料庫連線位置
DBPORT=DBport             # 資料庫連線埠
DBNAME=name               # 資料庫名稱
PORT=0258                 # 後端監聽位置
LogPath=logs              
assetsPath=/assets        
HomePagePath=/index.html  
privateKey=key            
```

執行後端伺服器
```bash
npm run dev
```

## 4.資料庫連接
先安裝MongoDB並啟動，建立`students` collection 並匯入範例數據`studentslist.csv`

範例格式如下:
```json
{
    "userName":"tkume7788",
    "sid":4,
    "name":"****",
    "department":"資訊管理系",
    "grade":"三年級",
    "class":"C",
    "email":"tkume7788@tkuim.com"
}
```

# API 規格說明
## 1.查詢所有學生資料
+ **請求方式**
  - 方法：GET
  - 路徑：`/api/v1/user/findAll`
+ **回應**
    + ```json
        {
            "code": 200,
            "message": "find sucess",
            "body":
                {
                    "_id": "67592089d431b1143e5bc7fb",
                    "userName": "tkume7788",
                    "sid": "4",
                    "name": "要昏倒了",
                    "department": "資訊管理系",
                    "grade": "三年級",
                    "class": "C",
                    "email": "tkume7788@tkuim.com"
                },
        }

        ```
## 2. 根據 ID 查詢學生資料
+ **請求方式**
  - 方法：GET
  - 路徑：`/api/v1/user/findAll?id={request}`
  - 查詢參數：`id`

+ **請求範例**
  ```
  GET /api/v1/user/findById?id=67618323f658c5852f194f1b
  ```

+ **回應格式**
```json
{
    "code": 200,
    "message": "find success", 
    "body": {
        "_id": "67618323f658c5852f194f1b",
        "userName": "tkume0114",
        "sid": "4",
        "name": "taco",
        "department": "資訊管理系",
        "grade": "三年級",
        "class": "C",
        "email": "tkume0114@tkuim.com"
    }
}
```

+ **響應狀態**
  - 成功：200 OK
  - 未找到：404 Not Found
  - 伺服器錯誤：500 Internal Server Error

## 3. 新增學生資料
+ **請求方式**
  - 方法：POST
  - 路徑：`/api/v1/user/insertOne`
  - 請求體：JSON

+ **請求範例**
```json
{
    "userName": "newstudent123",
    "sid": "5",
    "name": "新同學",
    "department": "資訊管理系",
    "grade": "一年級",
    "class": "A",
    "email": "newstudent123@tkuim.com"
}
```

+ **回應格式**
```json
{
    "code": 201,
    "message": "insert success",
    "body": {
        "_id": "新增後的學生ID",
        // 返回新增的完整學生資料
    }
}
```

+ **響應狀態**
  - 成功：201 Created
  - 伺服器錯誤：500 Internal Server Error

## 4. 根據 ID 刪除學生資料
+ **請求方式**
  - 方法：DELETE
  - 路徑：`/api/v1/user/deletedById`
  - 查詢參數：`id`

+ **請求範例**
  ```
  DELETE /api/v1/user/deletedById?id=67592089d431b1143e5bc7fb
  ```

+ **回應格式**
```json
{
    "code": 200,
    "message": "delete success",
    "body": null
}
```

+ **響應狀態**
  - 成功：200 OK
  - 未找到：404 Not Found
  - 伺服器錯誤：500 Internal Server Error

## 5. 根據 ID 更新學生資料
+ **請求方式**
  - 方法：PUT
  - 路徑：`/api/v1/user/updateNameById`
  - 查詢參數：`id`, `name`

+ **請求範例**
  ```
  PUT /api/v1/user/updateNameById?id=67592089d431b1143e5bc7fb&name=新名字
  ```

+ **回應格式**
```json
{
    "code": 200,
    "message": "update success",
    "body": {
        "_id": "67592089d431b1143e5bc7fb",
        "name": "新名字"
    }
}
```

+ **響應狀態**
  - 成功：200 OK
  - 未找到：404 Not Found
  - 伺服器錯誤：500 Internal Server Error
 ## 流程圖
 ![diagram](https://raw.githubusercontent.com/pineappletaco/studentHub/refs/heads/master/%E6%9E%B6%E6%A7%8B%E5%9C%96.png?raw=true)
 ## 架構圖
![diagram](https://github.com/pineappletaco/studentHub/blob/master/%E6%B5%81%E7%A8%8B%E5%9C%96.png?raw=true?raw=true)
