async function fetchCommits(user, repo) {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits`).then(
        response => response.json()
    );
}

function getCommitsSince(hours_ago, commits) {
    const ONE_HOUR = 60 * 60 * 1000;
    const time = new Date(new Date() - ONE_HOUR * hours_ago);
    return commits.filter(commit => new Date(commit.commit.committer.date) > time);
}

function getNCommits(n, commits) {
    commits.length = n;
    return commits;
}

function formatCommits(commits) {
    return commits.map(commit => commit.html_url).join("\n\n");
}

async function getCommits() {
    const user = document.getElementById("user").value;
    const repo = document.getElementById("repo").value;
    const count = parseInt(document.getElementById("count").value);
    const hoursOrCommitCount = document.getElementById("hoursOrCommitCount");
    const commits = await fetchCommits(user, repo);
    const filteredCommits = hoursOrCommitCount.checked
        ? getNCommits(count, commits)
        : getCommitsSince(count, commits);
    document.querySelector("button").style.display = "block";
    if (filteredCommits.length != 1) {
        document.getElementById("potential-s").innerHTML = "s";
    }
    document.getElementById("commit-count").innerHTML = filteredCommits.length;
    textarea.value = formatCommits(filteredCommits);
    textarea.style.display = "block";
}

function copy() {
    alert("Copied to clipboard");
    navigator.clipboard.writeText(textarea.value);
}

const textarea = document.querySelector("textarea");
const countLabel = document.getElementById("count-label");

document.getElementById("hoursOrCommitCount")
    .addEventListener("change", event => {
        countLabel.innerHTML = event.currentTarget.checked ? "Commit count" : "Hours";
    });