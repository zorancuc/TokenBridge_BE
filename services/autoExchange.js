const cron = require("node-cron");
const FuturepiaAccount = require('../models/FuturepiaAccount');
const EthAccount = require('../models/EthereumAccount');
const piaUtils = require('./utils/piaUtils');
const ethUtils = require('./utils/ethUtils');
const httpClient = require('./httpClient');
const exchangeBalance = require('../models/ExchangeBalance');

async function exchangeTIAtoERC20() {
  let futurepiaAccountsData = await FuturepiaAccount.findAll({ attributes: ['user_id', 'wallet_id', 'password']});
  let futurepiaAccounts = [];
  // for (let i = 0; i < futurepiaAccountsData.length; i ++) {
  for (let i = 0; i < 1; i ++) {
    // futurepiaAccounts.push(futurepiaAccountsData[i].dataValues);
    let piaAccountData = futurepiaAccountsData[i].dataValues;
    console.log(piaAccountData.wallet_id);
 
    let response = await piaUtils.getAccountByWalletId(piaAccountData.wallet_id);
    console.log(response);
    let balance = response.result[0].balance;
    console.log(balance);
    // if ( balance > 0 ) 
    {
      let balanceToSend = 1;
      
      let data = {
        "from": piaAccountData.wallet_id,
        "from_pwd": piaAccountData.password,
        "to": "cuczoran",
        "amount": balanceToSend,
        "memo": "",
        "memo_key": response.result[0].memo_key
      }

      console.log(data);
    
      try {
        let response = await httpClient.post('/api/transfer', data);
        
        let ethAccountsData = await exchangeBalance.findOne({ attributes: ['eth_balance'], where: {user_id: piaAccountData.user_id}})
        let ethBalance = ethAccountsData.dataValues.eth_balance;
        console.log(ethBalance);
        ethAccountsData = await exchangeBalance.update({ eth_balance: ethBalance + balanceToSend}, {where: {user_id: piaAccountData.user_id}})
        console.log(response);
      } catch (ex) {
        console.log(ex);
      }
      
      // console.log(response);    

      response = await piaUtils.getAccountByWalletId(futurepiaAccountsData[i].dataValues.wallet_id);
      // balance = response.result[0].balance;
      // console.log(balance);  
    }
    
  }
  console.log(futurepiaAccounts);
  
}

async function exchangePASTA2ERC() {
  let futurepiaAccountsData = await FuturepiaAccount.findAll({ attributes: ['user_id', 'wallet_id', 'password']});
  let futurepiaAccounts = [];
  // for (let i = 0; i < futurepiaAccountsData.length; i ++) {
  for (let i = 0; i < 1; i ++) {
    // futurepiaAccounts.push(futurepiaAccountsData[i].dataValues);
    let piaAccountData = futurepiaAccountsData[i].dataValues;
    console.log(piaAccountData.wallet_id);
    console.log("OKOK");

    let accountInfo = await piaUtils.getAccountByWalletId(piaAccountData.wallet_id);

    let data = {
        "accounts": JSON.stringify([piaAccountData.wallet_id])
    }
    console.log(data);
    
    let response = await httpClient.post('/api/getTokenBalance', data);
    console.log(response);

    let result = response.result;
    for (let j = 0; j < result.length; j ++ ) {
      if (result[j].token == "HELLO") {
        let balance = result[j].balance;
        balance = balance.slice(0, -6);
        balance = parseInt(balance, 10);
        
        if ( balance > 0 ) 
          {
            let balanceToSend = 2;
            
            let data = {
              "from": piaAccountData.wallet_id,
              "wif": piaAccountData.password,
              "to": "cuczoran",
              "amount": balanceToSend.toString(),
              "symbol_name": "HELLO",
              "memo": "",
              "memo_key": accountInfo.result[0].memo_key
            }

            console.log(data);
          
            try {
              let response = await httpClient.post('/api/transferToken', data);
              
              response = await ethUtils.mintToken("0x84056a282b52f9c18cd704926895d3bdf8863536", process.env.DEFAULT_ACCOUNT, balanceToSend );
              
              let ethAccountsData = await exchangeBalance.findOne({ attributes: ['eth_balance'], where: {user_id: piaAccountData.user_id}})
              let ethBalance = ethAccountsData.dataValues.eth_balance;
              console.log(ethBalance);
              ethAccountsData = await exchangeBalance.update({ eth_balance: ethBalance + balanceToSend}, {where: {user_id: piaAccountData.user_id}})
              console.log(response);

            } catch (ex) {
              console.log(ex);
            }
          }
      }
    }
  }
  console.log(futurepiaAccounts);
  
}

async function exchangeERC2PASTA() {
  let ethAccountsData = await EthAccount.findAll({ attributes: ['user_id', 'wallet_address', 'private_key']});
  // for (let i = 0; i < futurepiaAccountsData.length; i ++) {
  for (let i = 0; i < 1; i ++) {
    let ethAccountData = ethAccountsData[i].dataValues;
    console.log(ethAccountData.wallet_address);

    let tokenBalance = await ethUtils.getTokenBalance("0x84056a282b52f9c18cd704926895d3bdf8863536", ethAccountData.wallet_address);
    console.log("Token Balance", tokenBalance);
    
  if ( tokenBalance > 0 ) 
    {
      let balanceToSend = 1 ;
          
      try {
        let response = await ethUtils.burnToken("0x84056a282b52f9c18cd704926895d3bdf8863536", ethAccountData.wallet_address, balanceToSend );
      
        let piaAccountsData = await exchangeBalance.findOne({ attributes: ['pia_balance'], where: {user_id: ethAccountData.user_id}})
        let piaBalance = piaAccountsData.dataValues.pia_balance;
        console.log(piaBalance);
        piaAccountsData = await exchangeBalance.update({ pia_balance: piaBalance + balanceToSend}, {where: {user_id: ethAccountData.user_id}})
        // console.log(response);

      } catch (ex) {
        console.log(ex);
      }
    }
  } 
}

// exchangeERC2PASTA();
// exchangePASTA2ERC();
// exchangeTIAtoERC20();


// cron.schedule("*/5 * * * * *", function() {
//   console.log("---------------------");
//   console.log("Running Cron Job");
  
// });
