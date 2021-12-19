import React from 'react';
import Web3Modal, { IProviderControllerOptions } from 'web3modal';
import Rekv from 'rekv';
import Web3 from 'web3';
// import WalletConnectProvider from '@walletconnect/web3-provider';

import { getChainData } from './utils';
import { IAssetData } from './interface';
import { apiGetAccountAssets } from './api';

interface ChainData {
  chianId: number;
  name: string;
  network: string;
  currency: {
    name: string;
    address: string;
    decimals: number;
    symbol: string;
    logoURI: string;
    balance: string;
  };
}

interface Options extends IProviderControllerOptions {
  chainList: ChainData[];
}

interface IAppState {
  fetching: boolean;
  address: string;
  web3: Web3;
  provider: any;
  connected: boolean;
  chainId: number;
  networkId: number;
  assets: IAssetData[];
  showModal: boolean;
  pendingRequest: boolean;
  result: any | null;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: '',
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
};

const state = new Rekv<IAppState>(INITIAL_STATE);

export const ProviderContext = React.createContext<{
  data: IAppState | undefined;
  connect: () => Promise<IAssetData[] | undefined>;
  getAccountAssets: (_address: string, _chainId: number) => Promise<IAssetData[] | undefined>;
  resetApp: () => Promise<IAppState>;
  // @ts-ignore
}>({});

function initWeb3(provider: any) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        // @ts-ignore
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

export default function Web3ModalProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: Options;
}) {
  const web3ModalRef = React.useRef<Web3Modal>(null);

  const value = state.useState(
    'fetching',
    'address',
    'web3',
    'provider',
    'connected',
    'chainId',
    'networkId',
    'assets',
    'showModal',
    'pendingRequest',
    'result',
  );

  const { chainId, web3, address } = value;

  const getNetwork = (cid = chainId) => getChainData(cid)?.network;

  const resetApp = async () => {
    // @ts-ignore
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      // @ts-ignore
      await web3.currentProvider.close();
    }

    await web3ModalRef.current?.clearCachedProvider();
    state.setState({ ...INITIAL_STATE });
    return INITIAL_STATE;
  };

  // eslint-disable-next-line consistent-return
  const getAccountAssets = async (_address: string, _chainId: number) => {
    state.setState({ fetching: true });
    try {
      // get account balances
      const assets = await apiGetAccountAssets(_address, _chainId);

      state.setState({ fetching: false, assets });
      return assets;
    } catch (error) {
      console.error(error); // tslint:disable-line
      state.setState({ fetching: false });
    }
  };

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on('close', () => resetApp());
    provider.on('accountsChanged', async (accounts: string[]) => {
      // eslint-disable-next-line no-underscore-dangle
      const _address = accounts[0];
      await state.setState({ address: _address });
      await getAccountAssets(_address, chainId);
    });
    provider.on('chainChanged', async (cid: number) => {
      const id = +cid;
      // const networkId = await web3.eth.net.getId();
      if (!getNetwork(id)) return;
      state.setState({ chainId: id, networkId: id });
      await getAccountAssets(address, id);
    });

    provider.on('networkChanged', async (networkId: number) => {
      // const cid = await web3.eth.getChainId();
      const id = +networkId;

      if (!getNetwork(+id)) return;
      state.setState({ chainId: +id, networkId: id });
      await getAccountAssets(address, id);
    });
  };

  const onConnect = async () => {
    if (!window.web3 || !window.ethereum) {
      const modalDom = document.querySelector('.web3modal-modal-card');
      if (!modalDom) return;

      modalDom.innerHTML =
        '<div id="installMetaMask" class="p-10 web3modal-provider-wrapper"><a href="https://metamask.io/" target="_blank" class="cjAFRf web3modal-provider-container"><div class="jMhaxE web3modal-provider-icon"><img src="https://metamask.io/images/mm-logo.svg" alt="MetaMask"></div><div class="bktcUM sc-web3modal-provider-name mt-0">Install MetaMask</div><div class="eFHlqH web3modal-provider-description">Connect using browser wallet</div></a></div>';
    }

    try {
      const provider = await web3ModalRef.current?.connect();

      await subscribeProvider(provider);

      const w3 = initWeb3(provider);

      const accounts = await w3.eth.getAccounts();

      const addr = accounts[0];

      const networkId = await w3.eth.net.getId();

      const cid = await w3.eth.getChainId();

      if (!getNetwork(+cid)) return;

      state.setState({
        web3: w3,
        provider,
        connected: true,
        address: addr,
        chainId: cid,
        networkId,
      });

      return getAccountAssets(addr, cid);
    } catch (err) {
      console.log('onConnect error: ', err);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line prefer-object-spread
    const params = Object.assign(
      {
        disableInjectedProvider: false,
      },
      {
        network: getNetwork(), // optional
        cacheProvider: true, // optional
        // providerOptions: {
        //   walletconnect: {
        //     package: WalletConnectProvider,
        //     options: {
        //       infuraId: process.env.REACT_APP_INFURA_ID,
        //     },
        //   },
        // },
      },
      options,
    );

    const w3Modal = new Web3Modal(params);
    // @ts-ignore
    web3ModalRef.current = w3Modal;

    if (w3Modal.cachedProvider) {
      onConnect();
    }
  }, [options]);

  const ctx = {
    data: value,
    connect: onConnect,
    getAccountAssets,
    resetApp,
  };

  return <ProviderContext.Provider value={ctx}>{children}</ProviderContext.Provider>;
}

export const useWalletProvider = () => {
  const ctx = React.useContext(ProviderContext);

  return ctx;
};
