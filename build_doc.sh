echo 'Building frontend documentation'
python3 packages/autodoc/autodoc.py packages/frontend/src doc_source/docs/api/frontend src
echo 'Building backend documentation'
python3 packages/autodoc/autodoc.py packages/backend/src doc_source/docs/api/backend src
make html