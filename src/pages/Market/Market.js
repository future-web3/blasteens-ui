import { useState } from 'react'
import React from 'react'
import styles from './Market.module.scss'

const userOwnNft = [
  { image: '/images/nft6.jpeg', button: 'Sell' },
  { image: '/images/nft6.jpeg', button: 'Sell' },
  { image: '/images/nft6.jpeg', button: 'Sell' }
]

const nftStore = [
  { image: '/images/nft2.jpeg', button: 'Buy' },
  { image: '/images/nft3.jpeg', button: 'Buy' },
  { image: '/images/nft4.jpeg', button: 'Buy' },
  { image: '/images/nft3.jpeg', button: 'Buy' },
  { image: '/images/nft2.jpeg', button: 'Buy' },
  { image: '/images/nft4.jpeg', button: 'Buy' },
  { image: '/images/nft6.jpeg', button: 'Buy' }
]

const filterOptions = [
  {
    name: 'Escape From Germs',
    options: ['Weapon', 'Armour', 'Lotto Box', 'Map', 'Shield', 'Wand']
  },
  {
    name: 'Tommy Jumping',
    options: ['Weapon', 'Armour', 'Portion', 'Boot', 'Shield', 'Wand']
  },
  {
    name: 'Snowman Defender',
    options: ['Voucher', 'Boot', 'Shield', 'Wand']
  },
  {
    name: 'Emoji Match',
    options: ['Weapon', 'Armour', 'Portion']
  },
  {
    name: 'Crypto Dungeon',
    options: ['Weapon', 'Armour', 'Portion', 'Treasure', 'Lotto Box', 'Map', 'Voucher', 'Boot', 'Shield', 'Wand']
  }
]

const BuyButton = () => {
  return <button className={styles.buyButton}>Buy</button>
}

const SellButton = () => {
  return <button className={styles.sellButton}>Sell</button>
}

const Filter = () => {
  const [selectedGame, setSelectedGame] = useState('Escape From Germs')

  function getOptionsByName(gameName) {
    const game = filterOptions.find(game => game.name === gameName)
    return game ? game.options : []
  }

  return (
    <div className={styles.filterWrapper}>
      <h2 className={styles.h2}>{selectedGame}</h2>
      <select value={selectedGame} onChange={e => setSelectedGame(e.target.value)} className={styles.select}>
        <option value=''>Select a Game</option>
        {filterOptions.map((game, index) => (
          <option key={index} value={game.name}>
            {game.name}
          </option>
        ))}
      </select>
      <div className={styles.optionList}>
        {getOptionsByName(selectedGame).map((opt, index) => (
          <div key={index} className={styles.optionItem}>
            <input type='checkbox' value={opt} id={opt} />
            <label className={styles.optionLabel} for={opt}>
              {opt}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

const NftCard = ({ imgURL, buttonAction }) => {
  return (
    <div className={styles.NftCard} style={buttonAction === 'Buy' ? { border: '5px solid green' } : { border: '5px solid red' }}>
      <img src={`${imgURL}`} alt='nft' className={styles.image} />
      <div className={styles.infoSection}>
        <div className={styles.p}>0.01B</div>
        {buttonAction === 'Buy' ? <BuyButton /> : <SellButton />}
      </div>
    </div>
  )
}

const Market = () => {
  return (
    <div className={styles.outerLayer}>
      <div className={styles.grid}>
        <section className={styles.leftSection}>
          <div className={styles.assetSection}>
            <h3 className={styles.h3}>Your Wallet</h3>
            <h2 className={styles.h2}>$ 126.345 blast</h2>
            <p className={styles.p}>10.34%</p>
          </div>
          <div className={styles.filterSection}>
            <Filter />
          </div>
        </section>
        <section className={styles.rightSection}>
          <div className={styles.NftsContainer}>
            {userOwnNft.map((nft, index) => (
              <NftCard imgURL={nft.image} key={index} buttonAction={nft.button} />
            ))}
          </div>
          <div>
            <div className={styles.NftsContainer} style={{ borderBottom: 'none' }}>
              {nftStore.map((nft, index) => (
                <NftCard imgURL={nft.image} key={index} buttonAction={nft.button} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Market
