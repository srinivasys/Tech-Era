import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    courseData: {},
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getCourseData()
  }

  apiSuccess = data => {
    const fetchedData = {
      name: data.course_details.name,
      imageUrl: data.course_details.image_url,
      description: data.course_details.description,
    }
    this.setState({
      courseData: fetchedData,
      apiStatus: apiStatusConstant.success,
    })
  }

  apiFailure = () => {
    this.setState({apiStatus: apiStatusConstant.failure})
  }

  getCourseData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.apiSuccess(data)
    } else {
      this.apiFailure()
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseData} = this.state

    const {imageUrl, name, description} = courseData
    return (
      <>
        <Header />
        <div className="course-details-container">
          <div className="card-container">
            <img src={imageUrl} alt={name} className="img" />
            <div className="details-container">
              <h1 className="name">{name}</h1>
              <p className="description">{description}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="fail-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="fail-img"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="fail-des">
        We cannot seem to find the page you are looking for.
      </p>
      <Link to="/courses">
        <button type="button" className="retry-btn">
          Retry
        </button>
      </Link>
    </div>
  )

  renderCourseEraDetails = () => {
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
    return <div>{this.renderCourseEraDetails()}</div>
  }
}
export default CourseDetails
