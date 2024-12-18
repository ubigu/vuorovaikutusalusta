execute() {
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "error with $1" >&2
        exit $status
    fi
    return $status
}

execute find . -type f -name "package.json" -maxdepth 2 -execdir sh -c 'rm -rf node_modules && npm i' \; &&
execute docker compose build --no-cache && docker compose up -d