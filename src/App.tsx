import { useState } from 'react'
import Bass from './components/Bass'
import Keyboard from './components/Keyboard'
import { css } from '@emotion/css'

export default function App () {
  const [started, setStarted] = useState(false)

  const styleParagraph = css`
    max-width: 480px;
    padding: 0 1em;
    margin-left: auto;
    margin-right: auto;
  `

  const styleAppWrapper = css`
    text-align: center;
  `

  const styleHeader = css`
    text-shadow: 1px 1px white;
  `

  const styleStartButton = css`
    font-size: 1.5rem;
    padding: 0.5em 1em;
    border: none;
    border-radius: 1em;
    background-color: black;
    color: white;
    text-shadow: 1px 1px blue;
    cursor: pointer;
  `

  const renderApp = () => {
    return (
      <>
        <Bass />
        <Keyboard />
      </>
    )
  }

  const renderPending = () => {
    return (
      <>

        <h2>原作者 William Haynes</h2>
        <h3>改版 Mowtwo</h3>
        <p className={styleParagraph}>
          Stradella低音系统是低音的一种布局
          手风琴的一部分我把它做成了一个互动
          使用网络音频API+React&Jotai&Vite进行演示
          演示stradella低音上的神秘按钮
          对应于钢琴键。
        </p>
        <p className={styleParagraph}>
          当我第一次熟悉手风琴的时候
          迷恋于它的简洁和和声的音乐性
          设计如何相对轻松地为自己提供服务
          伴随着伴奏。
        </p>
        <button
          className={styleStartButton}
          onClick={() => { setStarted(true) }}
        >
          单击此处开始
        </button>
      </>
    )
  }

  return (
    <div className={styleAppWrapper}>
      <h1 className={styleHeader}>
        Stradella Bassx System{' '}
        <span role='img' aria-label='Musical notes'>
          🎵
        </span>
      </h1>
      {started
        ? renderApp()
        : renderPending()}
    </div>
  )
}
