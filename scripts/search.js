document.getElementById("search-input").addEventListener("input", async () => {
    showLoader("all-issues-container");
  const searchText = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allIssues = data.data;
      hideLoader("all-issues-container");
      renderIssuesHeader("all-issues-header", allIssues.length);
      renderIssueCards(allIssues, "all-issues-container");
    });
  if (searchText === "") {
    showLoader("all-issues-container");
    allIssues = await getAllIssues();
    hideLoader("all-issues-container");
    renderIssuesHeader("all-issues-header", allIssues.length);
    renderIssueCards(allIssues, "all-issues-container");
  }
});
