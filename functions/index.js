const functions = require("firebase-functions")
const cors = require('cors')({origin: true});
const admin = require("firebase-admin")
const AWS = require('aws-sdk');

exports.cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  };



  const pepsi = [93.93, 103.109, 105.18, 110.07, 115.43, 121.87, 121.87, 104.96, 109.86, 113.22, 114.93, 116.01, 120.84,115.84, 116.01, 118.35, 133.23, 135.54, 137.92, 135.63, 132.03, 103.78, 134.36, 135.95, 129.03 ,136.06, 136.46, 141.07 ,139.56 , 144.6 , 148.3, 166.97, 169.76, 171.21, 174.86, 176.54, 170.01, 172.34, 176.23, 179.63, 182.33, 184.09, 185.43]
  const mcdonalds= [117.06, 122.2, 123.65, 115.87, 127.36, 130.25, 150.94, 155.43, 157.74, 172.12, 167.84, 188.51, 189.9, 210.72, 196.7, 194.48, 197.82, 213.97, 197.61, 165.35, 187.56, 194.28, 148.45, 207.66, 213.52, 224.14, 233.89, 242.71, 244.6, 268.07, 259.45, 244.77, 247.28, 213.16, 252.21, 246.88, 247.28, 263.37, 252.28, 230.74, 272.66, 272.79]
  const nestle= [76.7, 74.72, 73.17, 73.06, 75.63, 74.39, 82.49, 89.17, 90.29, 96.38, 99.56, 120.25, 113.49, 105.01, 95.61, 101.85, 105.85, 106.33, 105.76, 103.21, 104, 101.32, 100.56, 98.43, 95.19, 91.92, 87.02, 85.43, 81.02, 80.32, 84.65, 86.11, 86.92, 88.15, 90, 91.57, 94.76, 92.45, 93.76, 96.01, 97.99, 99.98]
  const starbucks= [58.61, 57.29, 60.61, 61.96, 64.97, 65.95, 85.92, 96.3, 87.79, 81.37, 96.56, 90.48, 87.79, 88.13, 90.3, 96.58, 86.42, 92.52, 66.34, 68.75, 69.92, 73.32, 73.93, 71.57, 76.38, 77.92, 71.57, 77.02, 74.16, 73.79, 115.12, 110.66, 114.15, 113.41, 116.97, 117.47, 111.99, 105.3, 102.2, 106.34, 109.7, 102.1]
  const brittania=[48.14, 47.61, 45.1, 41.78, 41.98, 40.56, 51.9, 53.45, 54.76, 57.4, 55.67, 60.76, 63.56, 64.5, 62.52, 67.74, 70.27, 68.65, 66.37, 63.78, 62.97, 64.6, 61.35, 63.87, 65.12, 68.24, 64.67, 67.58, 65.87, 69.04, 72.08, 75.15, 76.78, 74.26, 78.67, 80.04, 81.59, 83.76, 82.53, 85.34, 89.28, 91.27]
  const Tesla=[14.07, 12.42, 16.12, 18.71, 20.58, 21.42, 22.74, 24.44, 25.12, 28.69, 29.53, 31.27, 32.09, 34.99, 34.03, 36.48, 37.97, 36.48, 38.64, 56.01, 36.01, 36.26, 57.26, 65.94, 96.85, 102.86, 125.26, 148.62, 160.85, 182.84, 206.85, 268.79, 285.49, 301.85, 318.62, 326.58, 340.27, 358.39, 382.46, 414.82, 261.92, 174.04]
  const Mercedes=[60.01, 52.47, 55.35, 62.23, 60.23, 62.51, 65.28, 59.27, 59.31, 57.09, 44.44, 42.35, 41.32, 44.78, 41.74, 37.47, 46.54, 43.52, 38.67, 23.95, 28.21, 35.15, 40.96, 51.51, 62.23, 67.45, 66.28, 73.62, 75.96, 78.44, 77.94, 78.16, 61.13, 67.97, 66.38, 68.72, 63.98, 60.77, 56.55, 61.55, 65.45, 66.38]
  const bmw=[82.27, 77.58, 84.2, 89.87, 87.17, 90.12, 94.18, 91.78, 91.11, 85.44, 82.53, 77.23, 75.77, 77, 68.79, 67.47, 67.95, 77.32, 79.46, 68.93, 62.79, 48.50, 44.08, 47.68, 75.92, 82.56, 93.77, 89.12, 100.95, 94.29, 97.11, 104.10, 96.03, 93.35, 84.14, 79.35, 78.58, 80.99, 82.51, 78.88, 84.65, 90.33]
  const gm=[39.33, 40, 38.2, 41, 43.41, 44, 45.67, 41.3, 45.8, 57.79, 61.99, 69.89, 70, 70.41, 72.39, 74, 75, 77.91, 90, 100.01, 96, 98, 97.71, 97, 98.1, 90.81, 89, 91, 92.91, 90.85, 90.1, 89.71, 88.1, 80.8, 79.9, 79.54, 78.61, 60.6, 54.9, 55, 57, 85]
  const tatamotors=[72.98, 54.69, 70.63, 74.22, 102.60, 78.45, 77.56, 66.24, 47.82, 42.44, 30.55, 27.37, 31.85, 32.69, 42.98, 33.32, 32.18, 33.90, 35.77, 30.14, 28.78, 13.86, 20.82, 14.04, 12.84, 33.87, 52.55, 59.32, 63.69, 90.80, 87.84, 92.58, 87.18, 83.49, 78.77, 82.09, 77.73, 74.33, 86.72, 80.97, 74.89, 79.97]
  const sunpharma= [43.03, 36.82, 39.25, 34.93, 45.39, 49.47, 57.89, 54.63, 59.43, 58.08, 63.89, 61.99, 62.12, 64.09,
65.92, 64.39, 69.48, 68.45, 98.35, 100.73, 90.51, 90.73, 94.54, 97.55, 103.43, 110.45, 119.34, 114.29,
110.29, 118.92, 118,52, 119.91, 114.82, 109.24, 102.93, 100.12, 97.23, 98.43, 93.54, 95.74, 91.04,
93.04]
  const sfizer= [33.86, 36.3, 34.33, 42.16, 45.07, 49.73, 51.4, 52.78, 53.11, 52.24, 55.2, 53.54, 58.8, 61.02, 61.25,
62.65, 65.03, 67.89, 70.34, 77.5, 73.9, 85.67, 96.97, 94.5, 100.2, 104.6, 109.96, 107.88, 115.6, 119.4,
118.1, 116.5, 114.6, 118.1, 107.5, 102.76, 98.3, 96.7, 93.9, 91.2, 90.6]
  const bioNtech= [35.76, 37.8, 34.06, 39.07, 49.73, 49.99, 53.64, 55.74, 58.85, 61.25, 64.78, 67.89, 65.45, 72.1, 74.22,
72.34, 78.9, 80.3, 83.3, 86.45, 90.8, 94.5, 93.87, 105.5, 110.7, 116.7, 115.6, 129.4, 135.6, 139.8,
137.1, 125.5, 105.1, 101.65, 105.7, 90.9, 86.4, 82.1, 78.4, 74.5, 72.35]
  const drreddys= [43.12, 42.38, 45.42, 44.65, 46.86, 47.95, 55.73, 57.28, 61.52, 54.95, 54.74, 52.82, 56.57, 59.45,
64.35, 69.69, 67.23, 67.12, 43.12, 42.38, 45.42, 46.86, 47.95, 55.73, 57.28, 61.52, 54.95, 54.74,
52.82, 56.57, 59.45, 64.35, 69.69, 67.23, 67.12, 74.29, 76.14, 77.58, 78.27, 81.99, 85.35, 82.82,
90.04, 96.84, 104.25, 111.11, 118.36, 109.29, 107.35, 103.42, 99.82, 97.03, 95.59, 94.83, 93.25,
92.58, 91.40, 90.49, 88.29]
  const cipla=[37.56, 32.19, 39.75, 46.28, 35.47, 49.65, 58.42, 53.73, 63.21, 57.95, 64.53, 68.01, 54.32, 60.73,
69.43, 58.75, 63.64, 69.78, 81.53, 90.07, 96.56, 93.45, 90.12, 94.43, 88.03, 89.57, 76.89, 80.98,
75.02, 70.88, 86.07, 76.89, 81.53, 93.56, 78.45, 90.12, 96.43, 101.03, 89.57, 113.76, 91.02, 102.88]
  const ikea= [40, 48, 35, 45, 46, 50, 50, 56, 50, 65, 60, 70, 65, 50, 70, 60, 65, 70, 60, 55, 40, 45, 50, 35, 30, 25, 20,
30, 45, 50, 50, 40, 45, 25, 35, 40, 45, 50, 30, 25, 20, 15]
  const bestbuy= [62.85, 63.85, 66.01, 72.03, 79.88, 85.3, 92.46, 97.45, 98.36, 99.04, 99.89, 101.23, 102.67, 104.6,
108.01, 112.89, 116.78, 121.99, 118.67, 113.88, 108.78, 103.55, 99.67, 98.54, 95.54, 92.67, 76.67,
71.06, 69.96, 58.64, 62.89, 69.87, 75.67, 82.45, 89.46, 94.78, 104.67, 118.98, 125.78, 132.78, 145.98,
158.54]
  const homedepot= [75.3, 77.25, 80.13, 82.64, 85.97, 87.64, 95.43, 97.92, 101.24, 103.96, 104.72, 107.64, 109.75,
113.27, 115.76, 117.98, 121.89, 123.54, 120.48, 118.76, 116.42, 113.74, 110.38, 108.65, 109.67,
110.95, 111.64, 111.87, 112.23, 113.14, 120.76, 125.84, 130.62, 137.47, 143.06, 150.38, 135.17,
120.64, 115.53, 102.97, 94.27, 90.84]
  const target= [53.76, 59.56, 64.76, 66.87, 69.85, 75.13, 75.83, 76.8, 74.57, 65.46, 66.54, 70.32, 66.54, 70.65, 69.74,
63.74, 62.45, 60, 59.08, 56.86, 54.67, 52.37, 46.97, 42, 43, 45.64, 47.63, 48.37, 49.24, 50, 44, 48.74,
50.73, 53.65, 54.73, 59, 62, 61, 60.63, 58.65, 56.63, 54]
  const dmart= [47.87, 49.6, 50.17, 51.87, 52.32, 53.46, 54.56, 56.12, 57 , 58.47, 59.15, 61.03, 60.85, 60.59, 59.41,
57.75, 56.14, 55.23, 55.46, 59.23, 63.45, 67.89, 72.67, 76.28, 83.95, 88.67, 94.54, 100.29, 106.18,
116.34, 120.38, 124.04, 125.85, 127.38, 128.67, 131.25, 127.54, 124.39, 122.45, 121.63, 123.85,
126.69] 

const comps = {
    dmart, 
    target, 
    homedepot,
    bestbuy,
    ikea,
    cipla,
    drreddys,
    bioNtech,
    sfizer,
    sunpharma,
    tatamotors,
    gm,
    bmw,
    Mercedes,
    Tesla,
    brittania,
    starbucks,
    nestle,
    mcdonalds,
    pepsi
}


admin.initializeApp();

AWS.config.update({
    region: "ap-south-1",
    accessKeyId: "AKIA44SS2E5ZGSGRRD5G",
    secretAccessKey: "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"
})


const db = new AWS.DynamoDB.DocumentClient();




exports.test = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 
        var investor = "admin";


        const params = {                            //params for bank balance 
            TableName: 'Profile',
            KeyConditionExpression: '#user = :user',  
            ExpressionAttributeValues: {
                ':user': investor
            },
            ExpressionAttributeNames: {
            '#user': 'user'  
            }
            }   

            const company = await db.query(params).promise();

            const quantities = company.Items.map(item => item.quantity);

            var quant = parseInt(quantities)

            response.send(quant);

    })})

exports.Portfolio = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        let email = "arnavmadye@gmail.com";

        const params = {
            TableName: 'Profile',
            KeyConditionExpression: '#user = :user',  
            ExpressionAttributeValues: {
                ':user': email  
        
            },
            ExpressionAttributeNames: {
                '#user': 'user'  
            }
            }; 

            try {
                const result = await db.query(params).promise();
            
                if (result.Items.length > 0) {

                    response.send(result);

                } else { 

                    response.send("Could not find any user.");

                } 

            }catch(err){

                    response.send("Could not integrate with database");
                }
        

     })})

exports.IncrementIndex = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 

        try{

        const param = {
            TableName: 'time',
            KeyConditionExpression: 'a = :user ',  
            ExpressionAttributeValues: {
                ':user': 'time'  

        
            },
            }  
    
            var result = await db.query(param).promise();
    
            const { index } = result.Items[0];

        const params = {
            TableName: 'time',
            Key: {
              a: 'time',
              aa: "position"
            },
            UpdateExpression: 'SET #index = :newIndex',
            ExpressionAttributeNames: {
              '#index': 'index'
            },
            ExpressionAttributeValues: {                    //portfolio calculation  
              ':newIndex': index + 1
            },
            ReturnValues: 'UPDATED_NEW'
          };
          
          await db.update(params).promise();

          response.send("Success!")
        } catch (err) {
            response.status(500).send(err)
        }

    })})

    exports.DecrementIndex = functions.https.onRequest(async (request, response) => {
        cors(request, response, async () => { 
    
            try{
    
            const param = {
                TableName: 'time',
                KeyConditionExpression: 'a = :user ',  
                ExpressionAttributeValues: {
                    ':user': 'time'  
    
            
                },
                }  
        
                var result = await db.query(param).promise();
        
                const { index } = result.Items[0];
    
            const params = {
                TableName: 'time',
                Key: {
                  a: 'time',
                  aa: "position"
                },
                UpdateExpression: 'SET #index = :newIndex',
                ExpressionAttributeNames: {
                  '#index': 'index'
                },
                ExpressionAttributeValues: {                    //portfolio calculation  
                  ':newIndex': index - 1
                },
                ReturnValues: 'UPDATED_NEW'
              };
              
              await db.update(params).promise();
    
              response.send("Success!")
            } catch (err) {
                response.status(500).send(err)
            }
    
        })})



exports.indexValue = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 

        const params = {
            TableName: 'time',
            KeyConditionExpression: 'a = :user ',  
            ExpressionAttributeValues: {
                ':user': 'time'  

        
            },
            }  
    
            var result = await db.query(params).promise();
    
            const { index } = result.Items[0];
    
            var str = index.toString();

            response.send(str)

    })

})





exports.buy = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 
        const investor = "arnavmadye@gmail.com";  //email
        const companybuy = "cipla";  //company name
        const stockquant = "1";  //stock quantity

                    
        const params = {
            TableName: 'Profile',
            KeyConditionExpression: '#user = :user AND #company = :company',
            ExpressionAttributeValues: {
              ':user': investor,
              ':company': 'wallet'
            },
            ExpressionAttributeNames: {
              '#user': 'user',
              '#company': 'company'
            },
            ScanIndexForward: true
          };       
            
            const result = await db.query(params).promise();
           
            const results = result.Items.find(item => item['company '] === 'wallet').quantity;

            console.log(results)
            
                    

    })})

exports.sell = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 
            const investor = request.query.email;  //email
            const companysell = request.query.companysell;  //company name
            const stockquant = request.query.amountstocks;  //stock quantity
    
            const params = {
                TableName: 'time',
                KeyConditionExpression: 'a = :user ',  
                ExpressionAttributeValues: {
                    ':user': 'time'  
            
                },
                }  
        
                var result = await db.query(params).promise();
        
                const { index } = result.Items[0];
    
    
                
    
            if(investor.includes("@gmail.com") || investor.includes("@yahoo.com") || investor.includes("singhaniaschools.org")) {
    
                const params = {
                TableName: 'Profile',
                KeyConditionExpression: '#user = :user ',  
                ExpressionAttributeValues: {
                    ':user': investor  
            
                },
                ExpressionAttributeNames: {
                '#user': 'user'  
                }
                }         
    
    
                try {
                    const result = await db.query(params).promise();
                
                    if (result.Items.length > 0) {
                        //buy code - index is your i value (index for companies)
                        
                        var company = comps[companysell];
                        var price = company[index];
                        
    
                        
                        const params = {                            //params for bank balance 
                            TableName: 'Profile',
                            KeyConditionExpression: '#user = :user',  
                            ExpressionAttributeValues: {
                                ':user': investor
                            },
                            ExpressionAttributeNames: {
                            '#user': 'user'  
                            }
                            }    
    
                            const wt = await db.query(params).promise();
    
                            const quantities = wt.Items.map(item => item.quantity);
    
                            const wallet = parseInt(quantities);
    
                        if( stockquant <= company ){ 
    
                            const params = {
                                TableName: 'Profile',
                                KeyConditionExpression: '#user = :user AND company = :company',  
                                ExpressionAttributeValues: {
                                    ':user': investor, 
                                    ':company': companysell
                                },
                                ExpressionAttributeNames: {
                                '#user': 'user'  
                                }
                                }   
                                let company = await db.query(params).promise();
                                let updatestocks= company - stockquant;
                                let updatewallet = wallet + (stockquant*price);
                                response.send(true);
    
                            
                        }else{
                            response.send("no money");
                        }
                        
                        
    
                        }else {
                        response.send("Investor not found")
                    }
    
                }catch (err) {
                    response.status(500).send(err)
                }
            } else {
                response.send("Not a valid email, must end in gmail.com, yahoo.com or singhaniaschools.org")
            }
    
        })})



exports.login = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 
        const email = request.query.email;
        

        if(email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("singhaniaschools.org")) {

            const params = {
            TableName: 'Profile',
            KeyConditionExpression: '#user = :user',  
            ExpressionAttributeValues: {
                ':user': email  
        
            },
            ExpressionAttributeNames: {
            '#user': 'user'  
            }
            };         


            try {
                const result = await db.query(params).promise();
            
                if (result.Items.length > 0) {

                response.send("success");

                } else { 

                response.send("failure");

                } 

            } catch (error) {
                console.error(error);
                response.status(500).send("Internal server error: Not able to query database")
            }
        } else {
            response.send("Not a valid email")
        }
     
    })}) 



exports.signup = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {    
    // Get the attribute value from the request query parameters
    const email = "arnavmadye@gmail.com";

    if(email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("singhaniaschools.org")) {
   
        // Create a new instance of the DynamoDB.DocumentClient class
        const docClient = new AWS.DynamoDB.DocumentClient();
    
        // Set the table name and the key condition expression for the query
        
        const params = {
        
        TableName: 'Profile',
        KeyConditionExpression: '#user = :user' ,  // Specify the primary key and sort key attributes and their values in the key condition expression
        ExpressionAttributeValues: {
            ':user': email,  // Provide the values for the placeholders in the key condition expression
            
        },
        ExpressionAttributeNames: {
        '#user': 'user'  // Map the expression attribute name '#user' to the actual attribute name 'user'
        }
        }; 
    
    
        // Try to query the table
        try {
          const result = await docClient.query(params).promise();
    
        // If the query returned any items, return them in the response
        if (result.Items.length > 0) {
            response.send(result.Items);
        } else {
        // Email was not found in the table, so create a new item

        var newItemParams;
        try {

            const c = ["tesla", "bmw", "mercedes", "gm", "tata", "dmart", "ikea", "bestbuy", "homedepot", "target", "pepsi", "mcdonalds", "nestle", "britannia", "starbucks", "cipla", "pfizer", "biontech", "drreddy", "sunpharma", "wallet"]; 

            for (let i = 0; i < c.length; i++) {
                if(i === 20){
              const company = c[i];
              newItemParams = {
                TableName: 'Profile',
                Item: {
                  'user': email,
                  'company ': company,
                  'quantity': 10000
                }

                }
              
            } else{
                const company = c[i];
              newItemParams = {
                TableName: 'Profile',
                Item: {
                  'user': email,
                  'company ': company,
                  'quantity': 0
                }

                }
            }

                await docClient.put(newItemParams).promise();

        };
    
        response.send(true);
        } catch (error) {
        console.error(error);
        response.status(500).send("Error creating new item!")
        }
    }
        } catch (error) {
        console.error(error);
        response.status(500).send("Error!")
    
    }
    }  else {
    response.send("Not a valid email")
}
   
})});
   




exports.getwallet = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => { 
        const email = "uid";
        const docClient = new AWS.DynamoDB.DocumentClient();

            const params = {
            TableName: 'Profile',
            KeyConditionExpression: '#user = :user AND company = :company',  
            ExpressionAttributeValues: {
                ':user': email,
                ':company': 'wallet'
                
            },
            ExpressionAttributeNames: {
            '#user': 'user'  
            }
            };         


            try {
                const result = await docClient.query(params).promise();
            
                if (result.Items.length > 0) {

                    response.send(result.Items[0].quantity);

                } else { 

                    response.send(false);

                } 

            } catch (error) {
                console.error(error);
                response.status(500).send("Internal server error: Not able to query database")
            }
        })
     
    })

