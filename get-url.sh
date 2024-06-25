get-recent-commit-url() {
    echo "$(git remote get-url origin)/commit/$(git log -n 1 | grep commit | awk '{print $2}')"
}
get-recent-commit-url