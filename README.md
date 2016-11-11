# sfdc_oauth

* function说明

因为无法直接在浏览器里做下面的request(Salesforce的 https://login.salesforce.com/services/oauth2/token 尚未支持CORS),所以写了这个lambda function + api gateway用来获取token - URL: https://bpbx6npcml.execute-api.us-west-2.amazonaws.com/token?code=)

```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: 8d4ffbc6-c51e-e458-b056-94a9c6f1dabf" "https://login.salesforce.com/services/oauth2/token?grant_type=authorization_code&client_id=3MVG98XJQQAccJQe5s.9CLZNdWll8Mpr99bCs5xmj7gnDJSQUez7UzTZidWkJKZp7R1eq5AJ796fuIM7mhirM&client_secret=5828632327869003970&code=aPrx9vip.t4qSZeHlp.rXZBTTQi4tSCqjHCMrkCOLZV4NNmYVECFOpvpsCN_hsCNFAinUS14lg&redirect_uri=https://s3-us-west-2.amazonaws.com/jz-playground/sfdc_opp_kanban/index.html"
```

* Makefile

修改index.js后运行`make run`则会删除原有的.zip文件,重新zip,然后上传到s3;在lambda中选择通过s3上传,将.zip文件的url提供即可
