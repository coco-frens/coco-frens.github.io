import { Link } from 'react-router-dom'

interface FooterType {
  page: string
}

function Footer(props:FooterType) {

  const home = props.page === 'home' ? 'Home  | ' : <><Link to="/home">Home</Link> | </>
  const mint = props.page === 'mint' ? 'Mint  | ' : <><Link to="/mint">Mint</Link> | </>
  const token = props.page === 'token' ? 'DYOR  | ' : <><Link to="/token">DYOR</Link> | </>
  const sets = props.page === 'sets' ? 'Sets' : <Link to="/sets">Sets</Link>
  const acc = [home, mint, token, sets]

  return (
    <div className="mintSection mint">
      <div className='container'>
        {acc.map((content, index) => (
          <div className="mapping" key={index}>
            {content}
          </div>
        ))}
      </div>
      <a href="https://rarible.com/aicoco" target="_blank">Rarible</a> |
      <a href="https://opensea.io/collection/aicoco?" target="_blank">OpenSea</a> |
      <a href="https://etherscan.io/address/0xe6dbeadd1823b0bcfeb27792500b71e510af55b3#code" target="_blank">Etherscan</a> |
      <a href="https://github.com/coco-frens" target="_blank">Github</a>

      <p>© 2023 COCO on ETH</p>
    </div>
  )
}
export default Footer
