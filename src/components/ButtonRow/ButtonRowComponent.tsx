import { css } from '@emotion/css'
import { PropsWithChildren } from 'react'

export interface ButtonRawProps {
  label:string
}

export default function ButtonRowComponent (props: PropsWithChildren<ButtonRawProps>) {
  const { label, children } = props

  const styleWrapper = css`
    padding: 0.5em 10vw;
    background-color: #671120;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
  `

  const styleLabel = css`
    color: white;
    text-shadow: 1px 1px black;
    text-align: right;
    width: 20vw;
  `

  const styleRowContainer = css`
    display: flex;
    justify-content: center;
  `

  return (
    <div className={styleWrapper}>
      <span className={styleLabel}>{label}</span>
      <div className={styleRowContainer}>{children}</div>
    </div>
  )
}
