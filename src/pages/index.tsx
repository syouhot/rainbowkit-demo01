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
  
  useEffect(() => {
    console.log('连接状态:', isConnected);
    console.log('当前链:', chain);
    
    // 如果已连接且不在bscTestnet上，则切换到bscTestnet
    if (isConnected && chain?.id !== bscTestnet.id) {
      console.log('尝试切换到BSC测试网络...');
      switchChain({ chainId: bscTestnet.id }, {
        onSuccess: () => console.log('成功切换到BSC测试网络'),
        onError: (error) => console.error('切换链失败:', error),       
      })
    }
  }, [isConnected, chain?.id, switchChain]);
  
  return (
    <div className={styles.container}>
      <ConnectButton />
      {isConnected && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <p>当前链: {chain?.name || '未知'}</p>
          <p>链ID: {chain?.id}</p>
          <p>是否为BSC测试网络: {chain?.id === bscTestnet.id ? '是' : '否'}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
