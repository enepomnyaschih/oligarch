This is a template for project which will be compiled to plain html files.

Configure Apache:

- DocumentRoot must refer to `public`
- mod_rewrite.so is on
- Directory configuration: AllowOverride All

Build project from project root directory:

jwsdk <mode> jwsdk-config
<mode> is "debug" or "release"

Pages:

- http://localhost/<page_name>
