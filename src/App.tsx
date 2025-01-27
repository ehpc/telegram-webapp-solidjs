import type { Component } from 'solid-js';
import { retrieveLaunchParams } from '@telegram-apps/sdk-solid';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  let params: Record<string, string> = {};
  try {
    const { tgWebAppStartParam = '' } = retrieveLaunchParams();
    const jsonParams = atob(tgWebAppStartParam);
    params = JSON.parse(jsonParams);
  } catch (e) {
    console.error(e);
  }
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          This is the front page of a Telegram Mini App.
        </p>
        <p>
          Chat ID: {params.chatId}
        </p>
      </header>
    </div>
  );
};

export default App;
