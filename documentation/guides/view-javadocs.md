# How to View Javadocs

Follow these steps to generate and view the Javadocs for the project:

1. **Navigate to the Project Directory**  
   Open a terminal and navigate to the root directory of the project:
   ```bash
   cd /home/kxs-user/Projects/CPSC 488/zalk
   ```

2. **Generate Javadocs**  
   Use the `javadoc` command to generate the documentation. Run the following command:
   ```bash
   javadoc -d docs -sourcepath src -subpackages com.example
   ```
   - Replace `src` with the path to your source files if different.
   - Replace `com.example` with the base package of your project.

3. **Open the Javadocs**  
   After the command completes, open the `index.html` file located in the `docs` directory in your web browser:
   ```bash
   xdg-open docs/index.html
   ```
   - On macOS, use `open docs/index.html`.
   - On Windows, use `start docs/index.html`.

4. **Verify the Documentation**  
   Ensure all classes, methods, and packages are documented as expected. If any issues are found, update the source code comments and regenerate the Javadocs.

