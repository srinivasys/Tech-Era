import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="icon"
      />
      <h1 className="not-head">Page Not Found</h1>
      <p className="not-des">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
