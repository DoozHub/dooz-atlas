import re
import os

with open('/Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-atlas/src/App.jsx', 'r') as f:
    app_content = f.read()

with open('/Users/akshaydoozie/Documents/doozie/01_doozie_company/dooz-ecosystem/dooz-atlas/atlas_files.txt', 'r') as f:
    filesystem_files = [line.strip().replace('./', '') for line in f if line.strip()]

# Filter out dist, node_modules, public, atlas_files.txt, check_links.py
filesystem_files = [f for f in filesystem_files if not f.startswith(('dist/', 'node_modules/', 'public/')) and f not in ('atlas_files.txt', 'check_links.py')]

missing = []
for f in filesystem_files:
    if f not in app_content:
        missing.append(f)

if missing:
    print("Missing files in App.jsx:")
    for m in missing:
        print(f"  {m}")
else:
    print("All files indexed!")
