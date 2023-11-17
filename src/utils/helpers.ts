

export const getEllipsisTxt = (str: string, n = 3) => {
	if (str) {
		return `${str.slice(0, n)}...${str.slice(str.length - n)}`
	}
	return "";
}


const topCoins:any = {
	'0x1': [  // Ethereum Mainnet
	  { label: 'Ethereum', symbol: 'ETH', contractAddress: '' },
	  { label: 'Wrapped Bitcoin', symbol: 'wBTC', contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
	  { label: 'Tether', symbol: 'USDT', contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
	  { label: 'USD Coin', symbol: 'USDC', contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
	  { label: 'Wrapped TON Crystal', symbol: 'WTON', contractAddress: '0xdB3C2515Da400e11Bcaf84f3b5286f18ffF1868F' },

	  { label: 'Lido DAO Token', symbol: 'LDO', contractAddress: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32' },
	  { label: 'Staked Ether', symbol: 'STETH', contractAddress: '0xDFe66B14D37C77F4E9b180cEb433d1b164f0281D' },
	  { label: 'Chainlink', symbol: 'LINK', contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA' },
	  { label: 'Polygon', symbol: 'MATIC', contractAddress: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0' },
	  { label: 'Shiba Inu', symbol: 'SHIB', contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE' },
	  { label: 'Dai', symbol: 'DAI', contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
	  { label: 'Uniswap', symbol: 'UNI', contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' },
	  { label: 'Paxos Gold', symbol: 'PAXG', contractAddress: '0x45804880De22913dAFE09f4980848ECE6EcbAf78' },
	  { label: 'Arbitrum', symbol: 'ARB', contractAddress: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1' },
	  { label: 'Aave', symbol: 'AAVE', contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9' }
	],
	'0xaa36a7': [ //sepolia testnet
		{ label: 'Ethereum', symbol: 'ETH', contractAddress: '' },
		{ label: 'USDC', symbol: 'USDC', contractAddress: '0x35944808f3937c93f9B46d1a85195A63f1f121df' },
		{ label: 'USDT', symbol: 'USDT', contractAddress: '0xbea3e4C200EcC93537bb36a448B0612Bd99c4389' },
		 
	]
};

export const convertPayoutFormat = (data, network) => {
    return data.map(item => {
        const coinInfo = topCoins[network].find(coin => coin.symbol === item.symbol);
        let contractAddress = '';
        if (coinInfo) {
            contractAddress = coinInfo.contractAddress;
        }
        
        return {
            label: item.name,
            balance: item.balance,
            contractAddress: contractAddress
        };
    });
};

export const getBenefeciariesAutoComplete = (beneficiaries: any) => { 
	const benefeciariesArray = beneficiaries.map((beneficiary: any) => {
		return { label: beneficiary };
	});
	return benefeciariesArray;
}

export const getTopCoins = (chainId: string) => {

	const coins = topCoins[chainId];

	if (coins) {
		return coins;
	}

	return [];
}


function deepEqual(obj1, obj2) {
	if (obj1 === obj2) {
	  return true;
	}
  
	if (
	  typeof obj1 !== "object" ||
	  obj1 === null ||
	  typeof obj2 !== "object" ||
	  obj2 === null
	) {
	  return false;
	}
  
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
  
	if (keys1.length !== keys2.length) {
	  return false;
	}
  
	for (let key of keys1) {
	  if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
		return false;
	  }
	}
  
	return true;
  }
  
export  function objectExistsInArray(object, array) {
	return array.some((item) => deepEqual(object, item));
  }