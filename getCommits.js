async function fetchCommits(user, repo) {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits`).then(
        response => {
            if (!response.ok) {
                alert("Error: invalid username or repository name");
                return;
            }
            return response.json();
        }
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
    document.getElementById("potential-s").innerHTML = filteredCommits.length == 1 ? "" : "s";
    document.getElementById("commit-count").innerHTML = filteredCommits.length;
    textarea.value = formatCommits(filteredCommits);
    textarea.style.display = "block";
}

function copy() {
    alert("Copied to clipboard");
    navigator.clipboard.writeText(textarea.value);
}

async function getMostRecentRepo(user) {
    const url = `https://api.github.com/users/${user}/events/public`;
    return fetch(url)
        .then(async response => {
            data = await response.json();
            if (!response.ok || data.length === 0) {
                return [{ name: "repo_fetch_failed" }];
            }
            return data;
        })
        .then(data => {
            const mostRecentPushEvent = data.find(event => event.type === 'PushEvent');
            if (!mostRecentPushEvent) {
                console.log('No push events found.');
                return;
            }
            return mostRecentPushEvent.repo.name.split("/")[1];
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}

async function autoFillRecentRepo() {
    const user = document.getElementById("user").value;
    if (!user) {
        alert("No user specified");
        return;
    }
    const repo = await getMostRecentRepo(user);
    if (!repo) {
        alert("No repositories found for specified user");
        return;
    }
    document.getElementById("repo").value = repo;
}

const textarea = document.querySelector("textarea");
const countLabel = document.getElementById("count-label");

document.getElementById("hoursOrCommitCount")
    .addEventListener("change", event => {
        countLabel.innerHTML = event.currentTarget.checked ? "Commit count" : "Hours";
    });