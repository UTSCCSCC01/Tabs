# Autodocs

Documentation generator made for the Tabs project.

### Universal tags

| Tag | Requirements   |
| --- | --- |
| Description | Description of the function. Must be written at the top above any tags
| @name | Name of the function/class. Must be present to be included in the documentation |
| @see | (Optional) Other functions/classes or reference material related to the class. |
| @in | (Optional) The parent class that this method/class belongs to. |

> Note: Tag descriptions must be one line as of the current version.

> Note: All tags other than @name are optional.

## Documenting Functions/Methods

### Example
```typescript
/**
 * An example function to demonstrate the wonderes of java.
 * 
 * @name exampleFunction
 * @see ExampleClass
 * @in ExampleClass
 * @param var1 The first variable
 * @param var2 The second variable
 * @param var3
 * @returns The sum of the 3
 * @throws NumberNotFoundExample When one of the 3 is not a number
 * @throws NullPointerException
 */
function exampleFunction(var1, var2, var3) {
    ...
}
```

### Tags

| Tag | Requirements   |
| --- | --- |
| @param | Parameter of the function. First word is the parameter name. Second (optional) is a description of the parameter. |
| @returns | Return value. |
| @throws | Exceptions that can be thrown by the function. First word is the exception name. Second (optional) is a description of when the exception is thrown. |


## Documenting Classes

### Example

```typescript
/**
 * The example class of all example classes.
 * 
 * @name ExampleClass
 * @extends ObjectClass
 * @implements ExampleInterface
 * @field points The points the player has
 * @field distance The distance the player travelled
 * @method exampleFunction
 */
class ExampleClass extends ObjectClass implements ExampleInterface {
    public points;
    public distance;

    public exampleFunction() {
        ...
    }

    ...
}
```

### Tags

| Tag | Requirements   |
| --- | --- |
| @extends | Class name of the class it extends. |
| @implements | Interface the class implements. |
| @field | Class variables. First word is the variable name. Second (optional) is the variable description. |
| @method | Methods of the class. These methods must have "@in ClassName" in their documentation. |



