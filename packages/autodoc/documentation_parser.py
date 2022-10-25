from source_language.grammar import CLASS_KEYWORD, END_DOC, FUNCTION_KEYWORD, LINE_START, START_DOC
from doc_language.grammar import EXTENDS, FIELD, IMPLEMENTS, IN, METHOD, PARAMETER, RETURNS, TAGS, THROWS, SEE, NAME

# Data classes for parsed result

# Container data class for many function docs
class FileDocumentationContainer:
    file_name = ''
    docs = []

    def __init__(self, name):
        self.file_name = name

# Data class for @returns string The result string etc.
class TypedDocumentationElement:
    type = ''
    description = ''

    def __init__(self, type):
        self.type = type

# Container data class for one function doc
class DocumentationElement:

    def __init__(self):
        self.source = ''
        self.description = ''
        self.name = ''
        
        self.params = []
        self.returns = []
        self.throws = []
        self.see = []
        
        self.extends = []
        self.implements = []
        self.in_tag = None

        self.field = []
        self.method = []

    def __str__(self):
        return self.name

# Parser class
class DocumentationParser:
    def __init__(self):
        pass

    # Parse one file
    def parse_file_docs(self, doc_file_name, replace_root):
        file_docs = []

        with open(doc_file_name, 'r') as file:
            contents = file.readlines()
        
        if replace_root != '':
            doc_file_name = doc_file_name.replace('./', './' + replace_root + '/')
        
        for line_index in range(0, len(contents)):
            line = contents[line_index]
            
            if START_DOC[0] in line or START_DOC[1] in line:
                line_index, doc = self.parse_file_doc(contents, line_index, doc_file_name)
                if doc != None:
                    file_docs.append(doc)
        return file_docs

    def isolate_doc_lines(self, doc_lines, doc_line_index):
        valid_lines = []

        for i in range(doc_line_index, len(doc_lines)):
            line = doc_lines[i]
            stripped = line.lstrip().rstrip()

            if stripped.startswith(START_DOC[0]):
                valid_lines.append(stripped[len(START_DOC[0]):])
            elif stripped.startswith(START_DOC[1]):
                valid_lines.append(stripped[len(START_DOC[1]):])
            elif stripped.startswith(END_DOC[0]) or stripped.startswith(END_DOC[1]):
                break
            elif stripped.startswith(LINE_START):
                valid_lines.append(stripped[len(LINE_START):].lstrip())
            else:
                break

        return valid_lines, i

    def parse_file_doc(self, doc_lines, doc_line_index, source):
        lines, doc_line_index = self.isolate_doc_lines(doc_lines, doc_line_index)
        doc_line_index += 1
        # Single line doc is invalid
        if len(lines) <= 1:
            return doc_line_index, None

        # Reached end of file
        if len(lines) >= doc_line_index:
            return doc_line_index, None

        while len(doc_lines) < doc_line_index and len(doc_lines[doc_line_index].strip()) == 0:
            doc_line_index += 1
            if len(lines) >= doc_line_index:
                return doc_line_index, None

        doc = self.parse_doc(lines, source)
        
        if doc.name != None:
            return doc_line_index, doc

        return doc_line_index, None

    def parse_doc(self, list, source):

        doc = DocumentationElement()
 
        doc.source = source

        # Get description
        for i in range(len(list)):
            line = list[i]
            has_tag = False
            for tag in TAGS:
                if tag in line:
                    has_tag = True
                    break

            if has_tag:
                break

            if not len(line.strip()) == 0:
                doc.description += line
                doc.description += '\n'
            else:
                doc.description += '\n'

        if len(doc.description) > 0:
            doc.description = doc.description[0:-1]

        # Get tags
        for index in range(i, len(list)):
            line = list[index]

            if RETURNS in line:
                line = line[line.index(RETURNS) + len(RETURNS):]
                line = line.strip()
                doc.returns.append(line)
            elif PARAMETER in line:
                line = line[line.index(PARAMETER) + len(PARAMETER):]
                line = line.strip()
                doc.params.append(line)
            elif THROWS in line:
                line = line[line.index(THROWS) + len(THROWS):]
                line = line.strip()
                doc.throws.append(line)
            elif SEE in line:
                line = line[line.index(SEE) + len(SEE):]
                line = line.strip()
                doc.see.append(line)
            elif NAME in line:
                line = line[line.index(NAME) + len(NAME):]
                line = line.strip()
                doc.name = line
            elif IN in line:
                line = line[line.index(IN) + len(IN):]
                line = line.strip()
                doc.in_tag = line
            elif EXTENDS in line:
                line = line[line.index(EXTENDS) + len(EXTENDS):]
                line = line.strip()
                doc.extends.append(line)
            elif IMPLEMENTS in line:
                line = line[line.index(IMPLEMENTS) + len(IMPLEMENTS):]
                line = line.strip()
                doc.implements.append(line)
            elif FIELD in line:
                line = line[line.index(FIELD) + len(FIELD):]
                line = line.strip()
                doc.field.append(line)
            elif METHOD in line:
                line = line[line.index(METHOD) + len(METHOD):]
                line = line.strip()
                doc.method.append(line)
            else:
                print('Unrecognised tag: ' + line)

        return doc

    def parse_class(self):
        pass

    # Parse many files
    def parse_docs(self, doc_file_array, replace_root):
        total_docs = []
        for file in doc_file_array:
            doc = self.parse_file_docs(file, replace_root)
            if len(doc) > 0:
                total_docs.append(doc)
        return total_docs