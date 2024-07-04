#!/usr/bin/env python3

from subprocess import run
from sys import argv


def main(count: int) -> None:
    remote_url = (
        run("git remote get-url origin".split(), capture_output=True)
        .stdout.decode()
        .rstrip()
        .removesuffix(".git")
    )
    git_log = run(f"git log -n {count}".split(), capture_output=True).stdout.decode()
    shas = filter(lambda x: x.startswith("commit "), git_log.split("\n"))
    for sha in shas:
        print(f"{remote_url}/commit/{sha.split()[1]}\n")


if __name__ == "__main__":
    main(int(argv[1]) if len(argv) > 1 else 1)
