
import { Link } from 'react-router-dom'

import xLogo from '../assets/x.jpeg'
import dextoolsLogo from '../assets/dextools.jpeg'
import telegramLogo from '../assets/tg.png'
import discordLogo from '../assets/discord.png'
import mediumLogo from '../assets/medium.png'
import githubLogo from '../assets/github.png'
import fire256 from '../assets/fire256.png'
import Footer from './Footer'

const showMintingSite = true

function Index() {

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="burnHeader">Welcome to COCO</h1>
          <p>The ultimate meme token on ETH</p>
          <p>0xE6DBeAdD1823B0BCfEB27792500b71e510AF55B3</p>
        </div>
      </header>

      <div className="section story">
        { showMintingSite && 
        <div className="burnHeader">
          <h2 className="burnHeader"><Link to="/mint">NEW! BURN COCO to Mint AiCOCO</Link></h2>
            <Link to="/mint"><img src={fire256} alt="x" /></Link><br />
            <Link to="/mint">Enter Minting Site</Link> | <Link to="/sets">Sets</Link><br />
        </div>
        }
      </div>

      <div className="section community">
        <h2 className="burnHeader">Coco On ETH</h2>
        <p>COCO is a meme coin like no other, embodying the iconic Pepe meme style and offering a unique, organic meme experience. 
          Its limitless creative potential, from the lovable crocodile theme to playful variants like "In love with the coco," 
          ensures a constant stream of engaging content, strong community support.</p>
        <h2 className="burnHeader"><Link to="/token">DYOR</Link></h2>
      </div>

      <div className="section social">
        <div>
          <h2 className="burnHeader">Follow Us</h2>


          <a href="https://twitter.com/thecocoethtoken" target="_blank"><img className="social-img" src={xLogo} alt="x" /></a>
          <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xeae4c727ea43990ea92f427da36ddff8e72f6854" target="_blank"><img className="social-img" src={dextoolsLogo} alt="Dextools" /></a>
          <a href="https://t.co/XZBGJ8ijrH" target="_blank"><img className="social-img" src={telegramLogo} alt="Telegram" /></a>
          <a href="https://discord.gg/bMae8xkDvt" target="_blank"><img className="social-img" src={discordLogo} alt="Discord" /></a>
          <a href="https://medium.com/@cococommunity42069/" target="_blank"><img className="social-img" src={mediumLogo} alt="Medium" /></a>
          <a href="https://github.com/coco-frens" target="_blank"><img className="social-img" src={githubLogo} alt="Github" /></a>


        </div>
      </div>

      <div className="section supporters">
        <h2 className="burnHeader">Community Supporters</h2>
        thanks to <div className="burnHeaderInline">Snowkidind</div> for dev-ing the AiCoco NFT<br />
        thanks to <div className="burnHeaderInline">BitcoinJake</div> for inspiring the website<br />
        thanks to <div className="burnHeaderInline">Godder</div> for rebooting the telegrams and facebooks<br />
      </div>

      <Footer page="home"/>

    </div>
  )
}

export default Index
