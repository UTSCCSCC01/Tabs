
import operator
from distutils.command.build import build
import os
from pydoc import describe
from documentation_parser import DocumentationElement

DOC_DIR = 'docs'
TABLE_OF_CONTENTS_FILE_NAME = 'table_of_contents.rst'

TWO_COLUMN_ROW = '''
    * - {title}
      - {description}
'''

ONE_COLUMN_ROW = '''
    * - {title}
'''

DESCRIPTION = '''
Description
-----------

{description}
'''

RELATED = '''
Related
-------

{related_list}
'''


PARAMETERS = '''
Parameters
----------

.. list-table::
    :widths: 100 575
    :header-rows: 0

{parameters}
'''

RETURNS = '''
Returns
-------

.. list-table::
    :width: 615
    :header-rows: 0

{returns}
'''

THROWS = '''
Throws
------

.. list-table::
    :widths: 100 575
    :header-rows: 0

{throws}
'''

EXTENDS = '''
Extends
-------

.. list-table::
    :width: 615
    :header-rows: 0

{extends}
'''

IMPLEMENTS = '''
Implements
----------

.. list-table::
    :width: 615
    :header-rows: 0

{implements}
'''

IN = '''
Variable of
-----------

.. list-table::
    :width: 615
    :header-rows: 0

    * - {in_tag}
'''

FIELDS = '''
Fields
------

.. list-table::
    :widths: 100 575
    :header-rows: 0

{fields}
'''

METHODS = '''
Methods
-------

.. list-table::
    :width: 615
    :header-rows: 0

{methods}
'''


DOC_FORMAT = '''
.. _{reference}:

{name}
{name_underline}

From **{source}**

{description}

{related_list}

{in_tag}

{parameters}

{returns}

{throws}

{extends}

{implements}

{methods}

{fields}
'''

TABLE_OF_CONTENTS = '''

Tabs Documentation
==================

.. toctree::
   :maxdepth: 1
   :caption: Table of contents:

{contents}
'''

TABBED = '   {content}\n'

class DocFileReference:
    def __init__(self, name, dir, source, doc):
        self.dir = dir
        self.source = source
        self.name = name
        self.doc = doc

class DocumentationWriter:
    def write_docs(self, docs, build_dir):
        docs_to_write = []
        for file_of_docs in docs:
            for doc in file_of_docs:
                docstring = self.generate_doc_string(doc)

                if len(docstring) > 0:
                    # Get a unique path
                    relative_path = doc.source.replace('../', './')

                    directory_path = relative_path[:doc.source.rindex('/')]
                    modifed_source = os.path.join(directory_path, doc.name.replace('.', '/'))

                    reference = DocFileReference(doc.name, modifed_source, 
                        os.path.join(modifed_source, doc.name.replace('.', '_') + '.'), docstring)
                    docs_to_write.append(reference)
                    
                    print('Generating doc for: ' + reference.name)
        
        self.write_to_build(docs_to_write, build_dir)

    def write_to_build(self, docs, build_dir):
        build_path = os.path.join(build_dir, DOC_DIR)
        os.makedirs(build_path)

        docs.sort(key = lambda x: x.name.lower())

        for doc in docs:
            relative_path = doc.source.replace('../', './')

            directory_path = relative_path[:doc.source.rindex('/')]


            filename = os.path.join(build_path, relative_path)
            filename = filename[:filename.rindex('.')] + '.rst'

            directory_name = os.path.join(build_path, directory_path)

            if not os.path.exists(directory_name):
                os.makedirs(directory_name)

            file = open(filename, 'w')
            file.write(doc.doc)
            file.close()
        
        # Write table of contents
        
        contents = ''

        for doc in docs:
            
            filename = doc.source.replace('./', DOC_DIR + '/').replace('.', '').strip()
            contents += TABBED.format(content = filename)

        table_of_contents = TABLE_OF_CONTENTS.format(contents = contents)

        table_of_contents_filename = os.path.join(build_dir, TABLE_OF_CONTENTS_FILE_NAME)

        file = open(table_of_contents_filename, 'w')
        file.write(table_of_contents)
        file.close()

    def generate_doc_string(self, element):
        if type(element) is DocumentationElement:
 
            element_description = None
            element_related = None
            element_params = None
            element_returns = None
            element_throws = None
            element_extends = None
            element_implements = None
            element_field = None
            element_method = None
            element_in = None

            if element.name == '':
                print('No name found for ' + element.source)
                return ''

            raw_name = element.name
            if element.in_tag != None:
                element.name = element.in_tag + '.' + element.name
                

            element_description = DESCRIPTION.format(description = element.description)


            if len(element.see) > 0:
              
                related_list = ''
                for related in element.see:
                    related_list += '- ' + related + '\n'

                element_related = RELATED.format(related_list = related_list)

                element_in = IN.format(in_tag = element.in_tag)
           

            if len(element.params) > 0:
                param_list = ''
                for param in element.params:
                    space_index = -1

                    if ' ' in param:
                        space_index = param.index(' ')
                    
                        param_list += TWO_COLUMN_ROW.format(
                            title = param[0:space_index],
                            description = param[space_index + 1:]
                        )
                    else:
                        param_list += TWO_COLUMN_ROW.format(
                            title = param,
                            description = ''
                        )
                    
                element_params = PARAMETERS.format(parameters = param_list)

            if len(element.returns) > 0:
                returns_list = ''
                for returns in element.returns:
                    returns_list += ONE_COLUMN_ROW.format(
                        title = returns
                    )
                
                element_returns = RETURNS.format(returns = returns_list)
                
            
            if len(element.throws) > 0:
                throws_list = ''
                for param in element.throws:
                    space_index = -1

                    if ' ' in param:
                        space_index = param.index(' ')
                    
                        throws_list += TWO_COLUMN_ROW.format(
                            title = param[0:space_index],
                            description = param[space_index + 1:]
                        )
                    else:
                        throws_list += TWO_COLUMN_ROW.format(
                            title = param,
                            description = ''
                        )
                    
                element_throws = THROWS.format(throws = throws_list)

            if len(element.extends) > 0:
                extends_list = ''
                for extends in element.extends:
                    extends_list += ONE_COLUMN_ROW.format(
                        title = extends
                    )
                
                element_extends = EXTENDS.format(extends = extends_list)

            if len(element.implements) > 0:
                implements_list = ''
                for implements in element.implements:
                    implements_list += ONE_COLUMN_ROW.format(
                        title = implements
                    )
                
                element_implements = IMPLEMENTS.format(implements = implements_list)
            
            if len(element.field) > 0:
                field_list = ''
                for param in element.field:
                    space_index = -1

                    if ' ' in param:
                        space_index = param.index(' ')
                    
                        field_list += TWO_COLUMN_ROW.format(
                            title = param[0:space_index],
                            description = param[space_index + 1:]
                        )
                    else:
                        field_list += TWO_COLUMN_ROW.format(
                            title = param,
                            description = ''
                        )
                    
                element_field = FIELDS.format(fields = field_list)
            
            if len(element.method) > 0:
                method_list = ''
                for method in element.method:
                    method_list += ONE_COLUMN_ROW.format(
                        title = ':ref:`' + element.name + ' ' + method + '`'
                    )
                
                element_method = METHODS.format(methods = method_list)
         
            return DOC_FORMAT.format(
                reference = element.name.replace('.', ' '),
                name = element.name,
                name_underline = '=' * len(element.name),
                source = element.source.replace('./', ''),
                description = element_description,
                related_list = element_related if element_related != None else '',
                in_tag = element_in if element_in != None else '',
                parameters = element_params if element_params != None else '',
                returns = element_returns if element_returns != None else '',
                throws = element_throws if element_throws != None else '',

                extends = element_extends if element_extends != None else '',
                implements = element_implements if element_implements != None else '',
                methods = element_method if element_method != None else '',
                fields = element_field if element_field != None else ''
            )