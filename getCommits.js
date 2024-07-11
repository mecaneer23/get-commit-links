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

async function getCommits() {
    await fetchCommits("mecaneer23", "mecaneer23")
}