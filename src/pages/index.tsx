"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import { bscTestnet } from 'viem/chains';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

const Home: NextPage = () => {
  const { switchChain } = useSwitchChain();
  const { isConnected, chain } = useAccount();
  const chainId = useChainId();
  const isMobile = () => {
    return /Android|webOs|iPhone|iPad iPod|BlackBerry|IEMobilelopera Mini/i.test(navigator.userAgent
    )
  };
  useEffect(() => {
    if (isMobile() && isConnected && chain?.id !== bscTestnet.id) {
      //移动端如果连接到错误网络，立即提示切换
      switchChain({ chainId: bscTestnet.id });
    }
  }, [isConnected, chain?.id]);
  return (
    <div className={styles.container}>
      <ConnectButton></ConnectButton>
    </div>
  );
};

export default Home;
