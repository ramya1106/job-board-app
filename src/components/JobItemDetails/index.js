import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {FaExternalLinkAlt} from 'react-icons/fa'

import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'

import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobsList: [],
    responseStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({responseStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        title: data.job_details.title,
      }
      const formattedSimilarJobsList = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: formattedJobDetails,
        similarJobsList: formattedSimilarJobsList,
        responseStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        responseStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getJobDetails()
  }

  renderJobsItemDetailsPage = () => {
    const {responseStatus, jobDetails, similarJobsList} = this.state
    switch (responseStatus) {
      case apiStatusConstants.success:
        return (
          <div className="job-item-details-page">
            <div className="job-item-details-container">
              <div className="job-header">
                <img
                  src={jobDetails.companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div>
                  <h1 className="job-title">{jobDetails.title}</h1>
                  <div className="icon-text-container">
                    <BsStarFill className="star-icon" />
                    <p className="rating">{jobDetails.rating}</p>
                  </div>
                </div>
              </div>
              <div className="job-details-and-salary">
                <div className="job-details">
                  <div className="icon-text-container">
                    <MdLocationOn />
                    <p className="job-location">{jobDetails.location}</p>
                  </div>
                  <div className="icon-text-container">
                    <BsBriefcaseFill />
                    <p className="job-type">{jobDetails.employmentType}</p>
                  </div>
                </div>
                <p className="job-salary">{jobDetails.packagePerAnnum}</p>
              </div>
              <hr />
              <div className="description-and-visit">
                <h1 className="job-details-section-title">Description</h1>
                <a href={jobDetails.companyWebsiteUrl} className="visit-link">
                  Visit <FaExternalLinkAlt />
                </a>
              </div>
              <p className="job-description">{jobDetails.jobDescription}</p>
              <h1 className="job-details-section-subtitle">Skills</h1>
              <ul className="skills-list-container">
                {jobDetails.skills.map(eachSkill => (
                  <li className="skills-list-item" key={eachSkill.name}>
                    <img
                      src={eachSkill.imageUrl}
                      alt={eachSkill.name}
                      className="skill-logo"
                    />
                    <p className="skill-name">{eachSkill.name}</p>
                  </li>
                ))}
              </ul>

              <div className="life-at-company-container">
                <div>
                  <h1 className="job-details-section-subtitle">
                    Life at Company
                  </h1>
                  <p className="life-at-company-description">
                    {jobDetails.lifeAtCompany.description}
                  </p>
                </div>
                <img
                  src={jobDetails.lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="life-at-company-img"
                />
              </div>
            </div>
            <h1 className="job-details-section-title">Similar Jobs</h1>
            <ul className="similar-jobs-list-container">
              {similarJobsList.map(eachJob => (
                <li className="similar-jobs-list-item" key={eachJob.id}>
                  <div className="job-header">
                    <img
                      src={eachJob.companyLogoUrl}
                      alt="similar job company logo"
                      className="company-logo"
                    />
                    <div>
                      <h1 className="similar-job-title">{eachJob.title}</h1>
                      <div className="icon-text-container">
                        <BsStarFill className="star-icon" />
                        <p className="rating">{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h1 className="job-details-section-subtitle">Description</h1>
                  <p className="similar-job-description">
                    {eachJob.jobDescription}
                  </p>
                  <div className="job-details">
                    <div className="icon-text-container">
                      <MdLocationOn />
                      <p className="job-location">{eachJob.location}</p>
                    </div>
                    <div className="icon-text-container">
                      <BsBriefcaseFill />
                      <p className="job-type">{eachJob.employmentType}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      case apiStatusConstants.loading:
        return (
          <div className="loader-bg">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        )
      case apiStatusConstants.failure:
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
              onClick={this.onRetry}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobsItemDetailsPage()}
      </>
    )
  }
}

export default JobItemDetails
