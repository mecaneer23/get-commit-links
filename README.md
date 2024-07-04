# Get Commit Links

Fetch public links to most recent git commits locally

## Usage

Run in a terminal in the same directory as your git repository

## Options

If running with Python, optionally specify an amount of commits to fetch.

Example: fetching the 3 most recent commits in the current working directory

```bash
python3 get_url.py 3
```

## Todo

- feat: if count isn't specified automatically return all commits from the past hour
  - feat: add argparse; allow for specifying an amount of commits or an amount of time
