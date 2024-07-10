async function fetchCommits(user, repo) {
    return fetch(`https://api.github.com/repos/${user}/${repo}/commits`).then(
        response => response.json()
    );
}

function getCommitsSince(time, commits) {
    return commits.filter((commit) => new Date(commit.commit.committer.date) < time);
}

async function getCommits() {
    const ONE_HOUR = 60 * 60 * 1000;
    console.log(getCommitsSince(new Date(new Date() + ONE_HOUR), await fetchCommits("mecaneer23", "mecaneer23")))
}