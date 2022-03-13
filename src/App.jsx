import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import PunkClimberABI from './utils/PunkClimber.json'

import './App.css'
import Loading from './assets/Loading'

const contractAddress = '0x9A2d68c545d5943A452C09a5eB09990a90F2688D'
const contractABI = PunkClimberABI.abi

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [waves, setWaves] = useState(null)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const wavePortalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    )

    getWaves(wavePortalContract).then(count => setWaves(count.toNumber()))
  }, [])

  const getWaves = async contract => {
    return await contract.getTotalWaves()
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        let count = await wavePortalContract.getTotalWaves()

        const waveTxn = await wavePortalContract.wave()
        setWaves(null)
        await waveTxn.wait()

        count = await wavePortalContract.getTotalWaves()
        setWaves(count.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mainContainer'>
      <div className='dataContainer'>
        <div className='header'>
          <span role='img' ariaLabel='wave emoji'>
            👋
          </span>{' '}
          Hey there!
        </div>

        <div className='bio'>
          I am <b>Patrick</b> and I'm launchig myself into the world of{' '}
          <b>Web3</b>.
          <br />
          Want to connect? Connect Metamask and wave at me!
        </div>

        <h3
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
          }}
          className='waves'
        >
          Waves: {waves || <Loading width={36} height={36} />}
        </h3>

        <button className='waveButton' onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className='waveButton' onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}

export default App
