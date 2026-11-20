#!/usr/bin/env bash
# Build dist/ and publish it as the gh-pages branch, which GitHub Pages serves at
#   https://vv8446931264-max.github.io/Mangesh-and-pranita/
# Each deploy is a new commit on gh-pages (parented on the previous one), so any
# earlier version can be restored. Source branches are never touched.
#   tools/deploy.sh            build + push
#   tools/deploy.sh --dry-run  build + make the commit, but do not push
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
python3 build.py
src=$(git rev-parse --short HEAD); dirty=$(git status --porcelain -- index.html css js | head -1)
idx=$(mktemp -u); trap 'rm -f "$idx"' EXIT
tree=$(cd dist && GIT_INDEX_FILE="$idx" git --git-dir="$ROOT/.git" --work-tree=. add -A . && GIT_INDEX_FILE="$idx" git --git-dir="$ROOT/.git" write-tree)
parent=()
if git fetch -q origin gh-pages 2>/dev/null; then parent=(-p FETCH_HEAD); fi
msg="Deploy site from ${src}${dirty:+ (with uncommitted changes)}"
commit=$(git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit-tree "$tree" "${parent[@]}" -m "$msg")
echo "tree $tree -> commit $commit: $msg"
git ls-tree -r --name-only "$commit" | sed 's/^/  /'
[[ "${1:-}" == "--dry-run" ]] && { echo "dry run: not pushed"; exit 0; }
for i in 1 2 3 4; do
  if git push origin "$commit:refs/heads/gh-pages"; then echo "pushed gh-pages = $commit"; exit 0; fi
  echo "push failed, retrying in $((2**i))s" >&2; sleep $((2**i))
done
exit 1
