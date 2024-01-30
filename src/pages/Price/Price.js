import React,{useState} from 'react'
import styles from './Price.module.scss'
import Data from './testData.json'
import Listbox from "react-widgets/Listbox"

export default function Price() {
  const [isGamer, setIsGamer] = useState(true);
  const [selected, setSelected] = useState(Data.data[0]);
  

  return (
    <div className = {styles.page}>
    <div className={styles.pricePage}>
      <div className = {styles.contentWrapper}>
        <div className={styles.rankSection}>
          <div className={styles.title}>{selected.Name}</div>
          <div className={styles.poolInfo}>
            <div>Prize Pool:{Data.prizePool} blast</div>
            <div>Claim Closed at: {Data.timeRemain}</div>
          </div>
          <ul className={styles.rankTable}>
              {Data.RankTable.map((item) => (
                <li className={styles.dataRow}>
                  <div className = {styles.data}>#{item.rank}</div>
                  <div className = {styles.data}>{item.points}pt</div>
                  <div className = {styles.data}>{item.address}</div>
                  <div className = {styles.dataGreen}>$6</div>
                  <div className = {styles.dataGreen}>10%</div>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.controlSection}>
          <div className={styles.controlButtons}>
            <div className={styles.switch}>
              <div className= {isGamer? styles.selected : styles.notSelected} onClick = {()=>setIsGamer(true)}>Gamer</div>
              <div className={isGamer? styles.notSelected:styles.selected} onClick={() => setIsGamer(false)}>Developer</div>
            </div>
            <div class="custom-select">
              <select className={styles.dropdown}>
                {Data.data.map((item)=>(
                  <option value={item.value} onClick={() => setSelected(item.value)}>{item.Name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.claimSection}>
            <div>Your Yield:{} 1111 blast</div>
            <button className={styles.claimButton}>Claim</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
