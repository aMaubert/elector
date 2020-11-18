import Web3 from 'web3';

const metaMaskProvider  = async function () {
  // Check for injected web3 (mist/metamask)
  const windowAny = window as any;
  let web3js = windowAny.web3;
  if (typeof web3js !== 'undefined') {
    return new Web3(web3js.currentProvider);
  }
  throw Error('Unable to connect to Metamask');
}

export class EthereumProvider {
  private static instance: Web3 | undefined = undefined;

  public static async getInstance(): Promise<Web3> {
    if( !EthereumProvider.instance ) {
      EthereumProvider.instance =  await metaMaskProvider();
    }
    return EthereumProvider.instance
  }
}
