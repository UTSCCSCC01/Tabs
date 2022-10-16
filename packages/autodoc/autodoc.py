from dataclasses import replace
import os, sys
import shutil
from documentation_writer import DocumentationWriter
from documentation_parser import DocumentationParser


# Return arguments passed from shell
def verify_args():
    num_args = len(sys.argv)

    if num_args < 3:
        print('Invalid arguments. Needs a source directory and a build directory.')
        print('i.e. python3 autodoc.py ../src ./build')
        exit()
    
    replace_root = ''

    if num_args == 4:
        replace_root = str(sys.argv[3])

    return str(sys.argv[1]), str(sys.argv[2]), replace_root

# Get all files to check for documentation
def get_files():
    file_listing = []
    for root, dirs, files in os.walk('./'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                file_listing.append(os.path.join(root, file))
    return file_listing


# Build the documentation
def build(build_dir):
    # Destroy everything in existing build directory and remake
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)

    os.makedirs(build_dir)


if __name__ == '__main__':
    user_src_dir, user_build_dir, replace_root = verify_args()
    abs_build = os.path.abspath(user_build_dir)
    os.chdir(user_src_dir)
    user_files = get_files()
    build(abs_build)
    parser = DocumentationParser()
    docs = parser.parse_docs(user_files, replace_root)
    writer = DocumentationWriter()
    writer.write_docs(docs, abs_build)
