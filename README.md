# Job Board App  

A modern job portal built with **React**, featuring **JWT authentication**, **protected routes**, responsive design (CSS), and API integration for jobs, profile, and job details.  

---

## Features

### Authentication & Authorization
- Login with JWT token stored in cookies.
- Protected routes: only authenticated users can access Home, Jobs, and Job Details pages.
- Redirects unauthenticated users to Login.
- Prevents logged-in users from visiting Login again.
- Error messages displayed for invalid credentials.

### Home Route
- Welcomes authenticated users with profile section.
- "Find Jobs" button navigates to the Jobs route.

### Jobs Route
- Fetch jobs list from jobsApiUrl.
- Loader displayed while fetching data.
- Success, Failure, and Empty (No Jobs) views.
- Search jobs by keyword.
- Apply filters: Employment Type and Salary Range.
- Retry button on API failure.

### Job Item Details
- Fetch job details by ID from jobDetailsApiUrl.
- Loader, Success, and Failure states.
- Shows role, company, description, skills, and life at company.
- Displays list of similar jobs.
- "Visit" button opens company website in new tab.

### Not Found Route
- Invalid URL → navigates to Not Found view.

### Logout
- Logout button clears JWT and redirects to Login.

---

## API Endpoints

- **Login:** POST `https://apis.ccbp.in/login`
    - Returns `jwt_token` on success
- **Profile:** GET `https://apis.ccbp.in/profile` 
- **Jobs:** GET `https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search=`
    - Supports query params for filters (employment type, salary range, search).
- **Job Details:** GET `https://apis.ccbp.in/jobs/:id`

All requests require jwt_token (for authenticated routes).

---

## Tech Stack

- **React.js** (class and functional components)  
- **React Router DOM** (protected routes)  
- **react-icons** (UI icons)  
- **JWT & Cookies** for authentication  
- **API integration** with loaders and error states

---

## Project Structure

job-board-app/  
┣ public/  
┗ src/  
  ┣ components/  
  ┃ ┣ Header/  
  ┃ ┣ Home/  
  ┃ ┣ JobItemDetails/  
  ┃ ┣ Jobs/  
  ┃ ┣ Login/  
  ┃ ┣ NotFound/  
  ┃ ┗ ProtectedRoute/  
  ┣ App.css  
  ┣ App.js  
  ┣ index.js  
  ┗ setupTests.js 

---

## Design Files

<details>
<summary>Login Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Login](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-sm-outputs.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Login](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-lg-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Login Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-failure-lg-output.png)
</details>

<details>
<summary>Home Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Home](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-sm-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Home](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-lg-output.png)
</details>

<details>
<summary>Jobs Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Jobs](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-sm-outputs.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Jobs Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-success-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - No Jobs](https://assets.ccbp.in/frontend/content/react-js/jobby-app-no-jobs-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Profile Failure](https://assets.ccbp.in/frontend/content/react-js/jooby-app-profile-failure-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Jobs Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-output-v0.png)
</details>

<details>
<summary>Job Item Details Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Job Details Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-success-sm-output-v0.png)
- [Extra Small (Size < 576px) and Small (Size >= 576px) - Job Details Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-sm-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Job Details Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-success-lg-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Job Details Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-lg-output.png)
</details>

<details>
<summary>Not Found Route</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px) - Not Found](https://assets.ccbp.in/frontend/content/react-js/jobby-app-not-found-sm-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px) - Not Found](https://assets.ccbp.in/frontend/content/react-js/jobby-app-not-found-lg-output-v0.png)
</details>

---

## Setup Instructions

Clone the repository:

``` 
git clone https://github.com/your-username/job-board-app.git
cd job-board-app 

``` 
Install dependencies:

    npm install

Start the development server
    
    npm start

---

Got suggestions? Let’s connect and build together!  
