const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
async function getAllIssues() {
  const response = await fetch(allUrl);
  const data = await response.json();
  return data.data;
}
let allIssues = [];
let labelDesigns = {
  bug: { icon: "fa-bug", color: "btn-error" },
  "help wanted": { icon: "fa-handshake", color: "btn-warning" },
  enhancement: { icon: "fa-wand-magic-sparkles", color: "btn-success" },
  documentation: { icon: "fa-book", color: "btn-info" },
  "good first issue": { icon: "fa-arrow-trend-up", color: "btn-primary" },
};

function renderIssuesHeader(sectionID, childCount) {
  document.getElementById(sectionID).innerHTML = "";
  document.getElementById(sectionID).innerHTML =
    `<div id="header-left" class="flex items-center gap-2">
        <img
            class="h-12 bg-base-300 rounded-full p-2"
            src="./assets/Aperture.png"
            alt="Aperture Logo"
        />
        <div id="title+sub-title">
            <h2 id="title">
                <span class="text-lg font-bold">
                ${childCount}
                </span>
                Issues
            </h2>
            <p id="sub-title">Track and manage your project issues</p>
        </div>
    </div>
    <div class="flex gap-4">
        <p class="h-min px-2 py-1 rounded">
            <span
                id="open-pallate"
                class="inline-block bg-green-500 rounded-full w-3 h-3 align-text-middle"
            ></span>
            Open
        </p>
        <p class="h-min px-2 py-1 rounded">
            <span
                id="closed-pallate"
                class="inline-block bg-purple-500 rounded-full w-3 h-3 align-text-middle"
            ></span>
            Closed
        </p>
    </div>
  `;
}
function renderIssueCards(issueList, sectionID) {
  document.getElementById(sectionID).innerHTML = "";
  if (issueList.length === 0) {
    let emptyIssueList = document.createElement("div");
    emptyIssueList.className =
      "flex flex-col items-center justify-center gap-4 mt-8";
    emptyIssueList.innerHTML = `
            <img src="./assets/alert-error.png" alt="alert-error" />
            <p class="text-center text-lg font-semibold text-base-content">
                No issues found
            </p>
    `;
    document.getElementById(sectionID).appendChild(emptyIssueList);
    return;
  } else {
    issueList.forEach((issue) => {
      let isOpen = issue.status === "open";
      let renderedIssueCard = document.createElement("div");
      renderedIssueCard.className =
        "issue-card rounded-xl bg-base-100 shadow-sm p-2 flex flex-col justify-between gap-2 hover:bg-base-300 hover:shadow-md cursor-pointer hover:scale-105 transition-all duration-200 h-full " +
        (isOpen
          ? "border-t-4 border-green-600"
          : "border-t-4 border-purple-600");
      renderedIssueCard.innerHTML = `
        <div
         id="card-head"
         class="flex justify-between items-center gap-2"
        >
         ${isOpen ? '<img src="./assets/Open-Status.png" alt="Open Status" />' : '<img src="./assets/Closed-Status.png" alt="Closed Status" />'}
         <p
          class="w-fit text-sm font-semibold rounded-full px-2 py-1 ${
            issue.priority === "high"
              ? "bg-red-100 text-red-600"
              : issue.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600"
          }"
            >
                ${issue.priority}
            </p>
        </div>
            <h3 id="card-title" class="text-lg font-bold">
              ${issue.title}
            </h3>
            <p
              id="card-description"
              class="opacity-70 text-sm font-light text-ellipsis line-clamp-2"
            >
              ${issue.description}
            </p>
            <div id="card-tags" class="flex gap-2 flex-wrap">
            </div>
            <div class="flex flex-col mt-auto border-t-1 border-gray-300 p-1">
              <p class="text-sm font-light opacity-70">#${issue.author}</p>
              <p class="text-sm font-light opacity-70">${
                isOpen
                  ? new Date(issue.createdAt).toLocaleDateString()
                  : new Date(issue.updatedAt).toLocaleDateString()
              }</p>
            </div>
        `;
      issue.labels.forEach((label) => {
        const tag = document.createElement("button");
        tag.className = `btn btn-outline btn-xs rounded-full ${labelDesigns[label] ? labelDesigns[label].color : ""}`;
        tag.innerHTML = labelDesigns[label]
          ? `<i class="fa-solid ${labelDesigns[label].icon}"></i> ${label.toUpperCase()}`
          : "";
        renderedIssueCard.querySelector("#card-tags").appendChild(tag);
      });
      renderedIssueCard.addEventListener("click", () => {
        renderCardDetails(issue.id);
      });
      document.getElementById(sectionID).appendChild(renderedIssueCard);
    });
  }
}

async function renderCardDetails(issueId) {
  const issue = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  )
    .then((response) => response.json())
    .then((data) => data.data);
  let detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <h3 class="text-2xl font-bold">${issue.title}</h3>
    <div class="flex items-center gap-2">
      <span class="badge badge-success rounded-full text-sm font-light">${issue.status}</span>
      &bull;
      <p class="text-sm font-light text-gray-500">opened by ${issue.author}</p>
      &bull;
      <p class="text-sm font-light text-gray-500">created at ${new Date(issue.createdAt).toLocaleDateString()}</p>
    </div>
    <div id="details-tags" class="flex gap-2 flex-wrap">
      ${issue.labels.map((label) => `<button class="btn btn-outline btn-xs rounded-full ${labelDesigns[label] ? labelDesigns[label].color : ""}"><i class="fa-solid ${labelDesigns[label] ? labelDesigns[label].icon : ""}"></i> ${label.toUpperCase()}</button>`).join("")}
    </div>
    <p class="font-light text-gray-500">${issue.description}</p>
    <div class="flex gap-2">
      <div class="flex-1 flex flex-col gap-1">
        <p class="text-sm font-light text-gray-500">assigned by:</p>
        <p class="font-medium">${issue.assignee ? issue.assignee : "N/A"}</p>
      </div>
      <div class="flex-1 flex flex-col gap-1">
        <p class="text-sm font-light text-gray-500">priority:</p>
        <p class="font-medium" + ${
          issue.priority === "high"
            ? "bg-red-500 text-white"
            : issue.priority === "medium"
              ? "bg-yellow-500 text-white"
              : "bg-gray-500 text-white"
        }>${issue.priority}</p>
      </div>
    </div>
  `;
  document.getElementById("details_modal").showModal();
}

async function renderUI() {
  if (allIssues.length === 0) {
    allIssues = await getAllIssues();
  }
  if (document.getElementById("all-tab").checked) {
    renderIssuesHeader("all-issues-header", allIssues.length);
    renderIssueCards(allIssues, "all-issues-container");
  }
  if (document.getElementById("open-tab").checked) {
    const openList = allIssues.filter((issue) => issue.status === "open");
    renderIssuesHeader("open-issues-header", openList.length);
    renderIssueCards(openList, "open-issues-container");
  }
  if (document.getElementById("closed-tab").checked) {
    const closedList = allIssues.filter((issue) => issue.status === "closed");
    renderIssuesHeader("closed-issues-header", closedList.length);
    renderIssueCards(closedList, "closed-issues-container");
  }
}
document.addEventListener("change", (e) => {
  if (e.target.name === "tab") {
    renderUI();
  }
});
renderUI();

// load a spinner while API is fetching data
// // a functional search bar that will search for the search query within the allIssues array, and return the matching titles, and this will be using the search api: `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
