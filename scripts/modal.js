async function renderCardDetails(issueId) {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<span class="loading loading-infinity loading-xl block mx-auto"></span>`;
  document.getElementById("details_modal").showModal();
  const issue = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  )
    .then((response) => response.json())
    .then((data) => data.data);
  detailsBox.innerHTML = "";
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
        <p class="font-medium px-2 w-fit rounded-full ${
          issue.priority === "high"
            ? "bg-red-500 text-white"
            : issue.priority === "medium"
              ? "bg-yellow-500 text-white"
              : "bg-gray-500 text-white"
        }">${issue.priority}</p>
      </div>
    </div>
  `;
}
