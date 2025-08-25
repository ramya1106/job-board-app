import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch, BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    search: '',
    profileApiStatus: profileApiStatusConstants.initial,
    jobsApiStatus: jobsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileApiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formatted = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formatted,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: jobsApiStatusConstants.loading})
    const {employmentType, minimumPackage, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${search}`
    console.log(url)
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formatted = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: formatted,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  onChangeEmploymentType = event => {
    const {employmentType} = this.state
    const {value} = event.target
    const updatedTypes = employmentType.includes(value)
      ? employmentType.filter(type => type !== value)
      : [...employmentType, value]
    this.setState({employmentType: updatedTypes}, this.getJobsList)
  }

  onChangeMinimumPackage = event =>
    this.setState({minimumPackage: event.target.value}, this.getJobsList)

  onSearch = event => this.setState({search: event.target.value})

  onRetryProfile = () => this.getProfileDetails()

  onRetryJobs = () => this.getJobsList()

  renderJobsSection = () => {
    const {jobsList, jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case jobsApiStatusConstants.loading:
        return (
          <div className="loader-bg" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case jobsApiStatusConstants.success:
        if (jobsList.length === 0) {
          return (
            <div className="loader-bg">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="failure-view-img"
              />
              <h1 className="failure-view-title">No Jobs Found</h1>
              <p className="failure-view-description">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          )
        }
        return (
          <ul className="jobs-list">
            {jobsList.map(job => (
              <Link to={`/jobs/${job.id}`} className="link" key={job.id}>
                <li className="jobs-list-item">
                  <div className="job-header">
                    <img
                      src={job.companyLogoUrl}
                      alt="company logo"
                      className="company-logo"
                    />
                    <div>
                      <h1 className="job-title">{job.title}</h1>
                      <div className="icon-text-container">
                        <BsStarFill className="star-icon" />
                        <p className="rating">{job.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="job-details-and-salary">
                    <div className="job-details">
                      <div className="icon-text-container">
                        <MdLocationOn />
                        <p className="job-location">{job.location}</p>
                      </div>
                      <div className="icon-text-container">
                        <BsBriefcaseFill />
                        <p className="job-type">{job.employmentType}</p>
                      </div>
                    </div>
                    <p className="job-salary">{job.packagePerAnnum}</p>
                  </div>
                  <hr />
                  <h1 className="job-details-section-title">Description</h1>
                  <p className="job-description">{job.jobDescription}</p>
                </li>
              </Link>
            ))}
          </ul>
        )
      case jobsApiStatusConstants.failure:
        return (
          <div className="loader-bg">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-view-img"
            />
            <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
            <p className="failure-view-description">
              We cannot seem to find the page you are looking for
            </p>
            <button
              type="button"
              className="retry-button"
              onClick={this.onRetryJobs}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderProfileSection = () => {
    const {profileDetails, profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiStatusConstants.loading:
        return (
          <div className="loader-bg" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case profileApiStatusConstants.success:
        return (
          <div className="profile-card">
            <img
              src={profileDetails.profileImageUrl}
              alt="profile"
              className="profile"
            />
            <h1 className="username">{profileDetails.name}</h1>
            <p className="about-user">{profileDetails.shortBio}</p>
          </div>
        )
      case profileApiStatusConstants.failure:
        return (
          <button
            className="retry-button"
            type="button"
            onClick={this.onRetryProfile}
          >
            Retry
          </button>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="search-container-sm">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onSearch}
            />
            <button
              className="search-icon"
              type="button"
              data-testid="searchButton"
              onClick={this.getJobsList}
            >
              <BsSearch />
            </button>
          </div>
          <div className="jobs-page-left-panel">
            {this.renderProfileSection()}
            <hr />
            <div className="filter-container">
              <h1 className="filter-title">Type of Employment</h1>
              <ul className="filter-list-container">
                {employmentTypesList.map(type => (
                  <li key={type.employmentTypeId}>
                    <input
                      className="filter-checkbox"
                      type="checkbox"
                      id={type.employmentTypeId}
                      value={type.employmentTypeId}
                      onChange={this.onChangeEmploymentType}
                    />
                    <label
                      htmlFor={type.employmentTypeId}
                      className="filter-label"
                    >
                      {type.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="filter-container">
              <h1 className="filter-title">Salary Range</h1>
              <ul className="filter-list-container">
                {salaryRangesList.map(range => (
                  <li key={range.salaryRangeId}>
                    <input
                      type="radio"
                      className="filter-checkbox"
                      id={range.salaryRangeId}
                      name="salary"
                      value={range.salaryRangeId}
                      onChange={this.onChangeMinimumPackage}
                    />
                    <label
                      htmlFor={range.salaryRangeId}
                      className="filter-label"
                    >
                      {range.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-page-right-panel">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onSearch}
              />
              <button
                className="search-icon"
                type="button"
                data-testid="searchButton"
                onClick={this.getJobsList}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
