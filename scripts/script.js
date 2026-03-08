// all issues inside a massive array of objects
// "all-section" will be made from the allIssues array
// "open-section" will be made from issues in the "allIssues" array with "status:open", and each will have green top border
// "closed-section" will be made from issues in the "allIssues" array with "status:closed", and each will have purple top border
// "status" image will be shown according to the "status" field
// "priority" block will have design according to the "priority" field
// "title", "description" and "assignee" will be shown according to the respective fields
// "created at" will be shown according to the "createdAt" field for "open" issues
// "updated at" will be shown according to the "updatedAt" field for "closed" issues
// dates need to be converted to human readable format
// "labels" field is an array, so, we need another conditional rendering inside, only show the labels that match
// if nothing can be shown because allIssues array is empty or open/closed sections are empty, render the "no issues found" div for those sections
// load a spinner while API is fetching data
// when a user clicks on an issue, a modal will open with the issue details
// a functional search bar that will search for the search query within the allIssues array, and return the matching titles, and this will be using the search api