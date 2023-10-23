import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'
import Footer from './Footer.tsx'

function Token() {

  return (
    <div className="container">

      <header className="header">
        <div>
          <h1 className="burnHeader">Tokenomics and DYOR</h1>
        </div>
      </header>

      <div className="mintSection mint">
        <p className="burnHeader"><b>The project is 100% community supported.</b></p>
        
        <p className="leftAlign">When <a href="https://twitter.com/KeroNFTs">Kero</a> created his coco meme, an <i>anonymous deployer</i> appeared and <a href="https://etherscan.io/tx/0x06a1e9a2312f9126de52352f49f9bd0dc38299305de4d4851f8e6237e8b056cc">created COCO</a> on ETH. They have since removed themselves and exited from all of their allocations. <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xeae4c727ea43990ea92f427da36ddff8e72f6854">Dextools</a> was updated to reflect this change. There is no communication with this entity, nor do they have any continued role in COCO on ETH. After careful chain analysis, it can be concluded that they no longer have any original stake in the token.</p>

        <p className="leftAlign"><b>Liquidity</b> was provided by the anon deployers, to a Uniswap V2 pool via <a href="https://www.team.finance/view-coin/0xe6dbeadd1823b0bcfeb27792500b71e510af55b3?name=COCO&symbol=COCO">team.finance</a> the lock period is for 100 years. This renders any price manipulation by removing liquidity impossible for the indeterminate future.</p>

        <p className="leftAlign">The <b>deployed contract code</b> was <a href="https://etherscan.io/address/0xe6dbeadd1823b0bcfeb27792500b71e510af55b3#code">verified on etherscan.io</a> using the openZeppelin libraries. It has been checked to ensure the libraries used were not modified. Calling the owner function reveals that ownership of the contract address has been <a href="https://etherscan.io/tx/0xaf391f7d288f1cd215dfc9a06a984bac3c9ca38c6ea4003786e7f496bbe737de">transferred to the zero address.</a></p>

        <p className="leftAlign">The original <b>supply</b> of the token was 420.69 trillion. Over 15 trillion (3.62% as of October 23) has been sent to the burn address. At the time of this writing, almost 40% of the remaining supply is in the uniswap v2 pool. </p>

        <p className="leftAlign">At the time of this writing, The token has been evenly distributed to about <a href="https://ethplorer.io/address/0xe6dbeadd1823b0bcfeb27792500b71e510af55b3#pageSize=100&pageTab=holders&tab=tab-holders">365 holders</a> of a significant position.</p>

      </div>

      <Footer page='token'/>

    </div>

  )

}

export default Token
