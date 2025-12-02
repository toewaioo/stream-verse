
import re

def check_jsx(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    stack = []
    errors = []
    
    # Regex for tags
    tag_re = re.compile(r'</?([a-zA-Z0-9\.]+)(\s[^>]*)?/?>')
    
    for i, line in enumerate(lines):
        line_num = i + 1
        # Simple check for braces
        for char in line:
            if char == '{':
                stack.append(('{', line_num))
            elif char == '}':
                if not stack or stack[-1][0] != '{':
                    errors.append(f"Unmatched '}}' at line {line_num}")
                else:
                    stack.pop()
            elif char == '(':
                stack.append(('(', line_num))
            elif char == ')':
                if not stack or stack[-1][0] != '(':
                    errors.append(f"Unmatched ')' at line {line_num}")
                else:
                    stack.pop()
            elif char == '[':
                stack.append(('[', line_num))
            elif char == ']':
                if not stack or stack[-1][0] != '[':
                    errors.append(f"Unmatched ']' at line {line_num}")
                else:
                    stack.pop()

    if stack:
        errors.append(f"Unclosed elements: {stack[-1]} (Total {len(stack)})")

    return errors

errors = check_jsx('/home/del/Desktop/Laravel/movie-react-api-client/resources/js/Pages/Admin/SeriesForm.jsx')
if errors:
    print("Found errors:")
    for e in errors:
        print(e)
else:
    print("No obvious brace/parenthesis errors found.")
