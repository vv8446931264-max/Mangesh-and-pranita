#!/usr/bin/env python3
"""Build the deployable site into dist/.

Development happens in modules (index.html + css/*.css + js/*.js) so that each part
can be worked on separately. Guests get ONE self-contained index.html: every
<link rel="stylesheet" href="css/..."> and <script src="js/..."></script> is inlined,
so the page loads in a single request, which matters on slow rural mobile data.

    python3 build.py          # writes dist/
"""
import pathlib, re, shutil, sys

ROOT = pathlib.Path(__file__).resolve().parent
DIST = ROOT / 'dist'
ASSETS = ['img', 'audio', 'preview.jpg', '.nojekyll']


def inline(html: str) -> str:
    def css(m):
        # stylesheet urls are relative to css/; once inlined they are relative to the page
        code = (ROOT / m.group(1)).read_text(encoding='utf-8').replace('url(../', 'url(')
        return '<style>\n' + code + '</style>'

    def js(m):
        code = (ROOT / m.group(1)).read_text(encoding='utf-8')
        if re.search(r'</script', code, re.I):
            sys.exit(f'{m.group(1)} contains "</script" and cannot be inlined safely')
        return '<script>\n' + code + '</script>'

    html = re.sub(r'<link rel="stylesheet" href="(css/[\w.-]+\.css)">', css, html)
    html = re.sub(r'<script src="(js/[\w.-]+\.js)"></script>', js, html)
    left = re.findall(r'(?:href|src)="((?:css|js)/[^"]+)"', html)
    if left:
        sys.exit(f'not inlined: {left}')
    return html


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    out = inline((ROOT / 'index.html').read_text(encoding='utf-8'))
    (DIST / 'index.html').write_text(out, encoding='utf-8')
    for a in ASSETS:
        src = ROOT / a
        if src.is_dir():
            shutil.copytree(src, DIST / a)
        elif src.exists():
            shutil.copy2(src, DIST / a)
    print(f'dist/index.html  {len(out.encode()) / 1024:.0f} KB')


if __name__ == '__main__':
    main()
