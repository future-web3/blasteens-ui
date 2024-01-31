import React,{useState, useEffect} from 'react'
import styles from './Price.module.scss'
import Data from './testData.json'

export default function Price() {
  const [isGamer, setIsGamer] = useState(true);
  const [selected, setSelected] = useState(Data.data[0]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(`.${styles.selectSection}`)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

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
              <div className= {isGamer ? styles.selected : styles.notSelected} onClick = {()=>setIsGamer(true)}>Gamer</div>
              <div className={isGamer ? styles.notSelected : styles.selected} onClick={() => setIsGamer(false)}>Developer</div>            </div>
            <div className={styles.selectSection}>
                <div className={isOpen?  styles.selectedNameOpen: styles.selectedName} onClick={() => setIsOpen(!isOpen)}>{selected.Name}</div>
                {isOpen && <div className={styles.dropdown}>
                  {Data.data.map((item) => (
                  <div className={styles.selectItem} onClick={() => {setSelected(item); setIsOpen(false)}}>{item.Name}</div>
                ))}
                </div>}
            </div>
          </div>
          <div className={styles.claimSection}>
            <div className = {styles.yieldText}>Your Yield:<div className={styles.textGreen}>1111 blast</div></div>
            <button className={styles.claimButton}>Claim</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
