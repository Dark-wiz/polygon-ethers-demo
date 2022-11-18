const ethers = require('ethers')
const tokenABI = require("./token_abi.json")
let mainProvider = ethers.getDefaultProvider("https://rpc-mumbai.matic.today")

async function main() {
    try {
        const tokenAddress = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
        const myAddress = "0xdBbB50bea2a012Fe18FAa04F2F575d54f29FDe4F"
        
        const contract = new ethers.Contract(tokenAddress, tokenABI, mainProvider)
        const filter = contract.filters.Transfer(null, myAddress)

        contract.on(filter, (from, to, value, event) => {
            console.log(`Received ${ethers.utils.formatUnits(value, 18)} DERC20 from ${from}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()