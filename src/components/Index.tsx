
import { Link } from 'react-router-dom'

import xLogo from '../assets/x.jpeg'
import dextoolsLogo from '../assets/dextools.jpeg'
import telegramLogo from '../assets/tg.png'
import discordLogo from '../assets/discord.png'
import mediumLogo from '../assets/medium.png'
import githubLogo from '../assets/github.png'
import fire256 from '../assets/fire256.png'


const showMintingSite = true

function Index() {

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#story">Story</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div>
          <h1>Welcome to COCO</h1>
          <p>The ultimate meme token on ETH</p>
          <p>0xE6DBeAdD1823B0BCfEB27792500b71e510AF55B3</p>
        </div>
      </header>

      <div className="section story">
        { showMintingSite && 
        <>
          <h2><Link to="Mint">NEW! BURN COCO to Mint AiCOCO</Link></h2>
          <Link to="Mint"><img src={fire256} alt="x" /></Link><br />
          <Link to="Mint">Enter Minting Site</Link><br />
        </>
        }
      </div>

      <div className="section community">
        <h2>Community</h2>
        <p>COCO is a meme coin like no other, embodying the iconic Pepe meme style and offering a unique, organic meme experience. Its limitless creative potential, from the lovable crocodile theme to playful variants like "In love with the coco," ensures a constant stream of engaging content, strong community support.</p>
      </div>

      <div className="section social">
        <div id="social-links">
          <h2>Follow Us</h2>
          <ul>
            <li><a href="https://twitter.com/thecocoethtoken" target="_blank"><img src={xLogo} alt="x" /></a></li>
            <li><a href="https://www.dextools.io/app/en/ether/pair-explorer/0xeae4c727ea43990ea92f427da36ddff8e72f6854" target="_blank"><img src={dextoolsLogo} alt="Dextools" /></a></li>
            <li><a href="https://t.co/XZBGJ8ijrH" target="_blank"><img src={telegramLogo} alt="Telegram" /></a></li>
            <li><a href="https://discord.gg/bMae8xkDvt" target="_blank"><img src={discordLogo} alt="Discord" /></a></li>
            <li><a href="https://medium.com/@cococommunity42069/" target="_blank"><img src={mediumLogo} alt="Medium" /></a></li>
            <li><a href="https://github.com/coco-frens" target="_blank"><img src={githubLogo} alt="Github" /></a></li>
          </ul>
        </div>
      </div>

      <div className="section supporters">
        <h2>Community Supporters</h2>
        thanks to kenyruyter@gmail.com for managing the dextools update!<br />
        thanks to BitcoinJake for inspiring the website<br />
        thanks to Godder for rebooting the telegrams and facebooks<br />
      </div>

      <footer className="footer" >
        <p>© 2023 COCO Meme Token</p>
      </footer>

    </div>
  )
}

export default Index
