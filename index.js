const ethers = require('ethers')
const tokenABI = require("./token_abi.json")
require("dotenv").config()
let mainProvider = ethers.getDefaultProvider("https://rpc-mumbai.matic.today")
const { default: XF } = require('@xend-finance/web-sdk'); 

async function main() {
    const depositAmount = "1";
    const currency = "BUSD";

    const tokenAddress = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
    const myAddress = "0xdBbB50bea2a012Fe18FAa04F2F575d54f29FDe4F"

    const contract = new ethers.Contract(tokenAddress, tokenABI, mainProvider)
    const filter = contract.filters.Transfer(null, myAddress)

    contract.on(filter, (from, to, value, event) => {
        console.log(`Received ${ethers.utils.formatUnits(value, 18)} DERC20 from ${from}`);
    });


    const setup = async () => {
        let chainId = 56
        return await XF(chainId, process.env.PRIVATE_KEY, { env: "mainnet" });
    }

    const makeDeposit = async () => {
        let sdk = await setup()

        let approval = await sdk.xVault.approve(currency, depositAmount);

        if (approval && approval.status) {
            const response = await sdk.xVault.deposit(currency, depositAmount);
            console.log(`response - ${JSON.stringify(response)}`, )
        }

    }

    const withdraw = async () => {
        let sdk = await setup()
        const response = await sdk.xVault.withdraw(currency, depositAmount)

        console.log(`response - ${JSON.stringify(response)}` )
    }
    withdraw()
}

main()
