import { createPublicClient, http , formatEther} from 'viem'
import * as viemChains from 'viem/chains';


/**
 * Get all the chains saved on viem that uses ether as native currency
 * @returns A a list of viem chains
 */
function getChains(){
    const [chains, testnets] = Object.values(viemChains).filter(chain => chain.nativeCurrency.symbol === "ETH").reduce(
        ([chainsUsingEther, testnets]:[viemChains.Chain[], viemChains.Chain[]], chain) => chain.name.toLowerCase().includes('testnet') ||
        chain.name.toLowerCase().includes('goerli') ||
        chain.name.toLowerCase().includes('foundry') ||
        chain.name.toLowerCase().includes('hardhat') ||
        chain.name.toLowerCase().includes('localhost') 
            ? [[...chainsUsingEther], [...testnets,chain]]
            : [[...chainsUsingEther,chain], [...testnets]],
        [[],[]]
    )

    return {chains, testnets}
}

function getClients(){
    const {chains} = getChains()
    return chains.map((chain) => {
        return createPublicClient({
            transport:http(),
            chain: chain
        })
    })
}


export async function getBalances(address:string): Promise<Balance[]>{
    // generate a list of promises, requesting ether balance on each chain
    const promises = getClients().map(client => {
        return {
            chainName: client.chain.name,
            promise: client.getBalance({address:address as `0x${string}`})
        }
    })
    // return the values once all of the promises have been fulfilled
    return await Promise.all(promises.map(p => p.promise)).then(values => {
        return promises.map((promise, index) => {
            return {
                chainName: promise.chainName,
                ether: values[index]
            }
        })
    })
}


//getBalances("0x6E401e15ccf23574A063e28a4682F5aECaF5b57C").then(console.log).catch(console.error)

