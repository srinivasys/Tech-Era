import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    data: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getData()
  }

  apiFailure = () => {
    this.setState({apiStatus: apiStatusConstant.failure})
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const url = 'https://apis.ccbp.in/te/courses'

    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        imageUrl: eachCourse.logo_url,
      }))
      this.setState({data: updatedData, apiStatus: apiStatusConstant.success})
    } else {
      this.apiFailure()
    }
  }

  renderSuccessView = () => {
    const {data} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Courses</h1>
        <ul className="courses-list">
          {data.map(eachItem => (
            <Link to={`/courses/${eachItem.id}`}>
              <li className="courses-item" key={eachItem.id}>
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="image"
                />
                <p className="course-name">{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="fail-des">
        We cannot seem to find the page you are looking for.
      </p>
      <Link to="/">
        <button type="button" className="retry-btn">
          Retry
        </button>
      </Link>
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <Header />
        {this.renderStatusView()}
      </div>
    )
  }
}
export default Home
