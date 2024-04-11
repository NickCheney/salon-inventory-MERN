import './Banner.css'
import fringeLogo from './assets/logos/fringe_logo_vectorized.svg'

const Banner = () => {
  return (
    <a href=".">
      <div id="banner">
        <div className="banner1">
          <img src={fringeLogo} alt="Fringe Salon Logo"/>
        </div>
        <div className="banner2">
          <h1>Inventory management system</h1>
        </div>
        <div className="banner1">
          <h2> User info here! </h2>
        </div>
      </div>
    </a>
  )
}
export default Banner;