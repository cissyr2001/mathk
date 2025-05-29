# Array Assignment Examples

The augmented script now supports array assignment with the syntax `@ARR = [@X, @Y, [123]]`.

## Syntax Rules

1. **Only @VARNAME or numeric literals** are allowed as non-array values
2. **Multi-layer arrays** are supported
3. **Numeric values** are parsed as high precision Decimal numbers

## Examples

### Basic Array Assignment
```
@X = 10
@Y = 20
@ARR = [@X, @Y, 123]
```
Result: `@ARR` contains `[10, 20, 123]`

### Nested Arrays
```
@NESTED = [1, [2, 3], 4]
```
Result: `@NESTED` contains `[1, [2, 3], 4]`

### Complex Multi-layer Arrays
```
@X = 5
@Y = 10
@COMPLEX = [@X, [1, [@Y, 2]], [3, [4, 5]]]
```
Result: `@COMPLEX` contains `[5, [1, [10, 2]], [3, [4, 5]]]`

### High Precision Numbers
```
@PRECISION = [1.23456789012345, 2.5e-10, 1e20]
```
All numbers are stored as high-precision Decimal objects.

### Empty Arrays
```
@EMPTY = []
```

### String Interpolation
When arrays are referenced in text, they display as formatted strings:
```
@ARR = [1, 2, [3, 4]]
The array is: @ARR
```
Output: "The array is: [1, 2, [3, 4]]"

## Error Cases

- `@ARR = [invalid_element]` - Only @VARNAME or numbers allowed
- `@ARR = [@UNDEFINED]` - Variable must exist
- `@ARR = [1 + 2]` - No expressions, only literals
- Using arrays in math: `@X = @ARR + 5` - Arrays can't be used in mathematical expressions 