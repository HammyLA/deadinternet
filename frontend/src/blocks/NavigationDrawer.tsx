import { Link } from 'react-router-dom'
import '../styles/navigationdrawer/NavigationDrawer.css'

function NavigationDrawer() {
  return (
    <div id='navDrawer'>
        <Link to={'/'}>Home</Link>
        <Link to={'/'}>Other</Link>
        <Link to={'/'}>Stuff</Link>
    </div>
  )
}

export default NavigationDrawer