// import { ethers } from 'ethers'
import './App.css'

export default function App() {
  const wave = () => {}

  return (
    <div className='mainContainer'>
      <div className='dataContainer'>
        <div className='header'>
          <span role='img' aria-label='wave emoji'>
            👋
          </span>{' '}
          Hey there!
        </div>

        <div className='bio'>
          I am Patrick and I'm launchig myself into the web3 world. Want to
          connect? Connect your Ethereum wallet and wave at me!
        </div>

        <button className='waveButton' onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  )
}
