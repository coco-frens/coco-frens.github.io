import fire from '../assets/banners/fire.png'
import art from '../assets/banners/art.png'
import beastie from '../assets/banners/beastie.png'
import gold from '../assets/banners/gold.png'
import space from '../assets/banners/space.png'
import Footer from './Footer.tsx'
import './Sets.css'

function Sets() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="burnHeader">AiCoco Sets</h1>
        </div>
      </header>

      <div className="mintSection mint" >
        <h3>Here are some samples of the sets within the Coco NFT mint. The supply is 420, 240 
          available now and another 180 in a couple months to complete the mint. <br/><br/>There will be many sets, increasing the rarity of each group of NFTs. Here are a few:</h3>

        <img className="bannerImg" src={fire} alt="x" />
        <img className="bannerImg" src={art} alt="x" />
        <img className="bannerImg" src={beastie} alt="x" />
        <img className="bannerImg" src={gold} alt="x" />
        <img className="bannerImg" src={space} alt="x" />
 
      </div>

      <Footer page='sets' />
      
    </div>
  )
}

export default Sets
