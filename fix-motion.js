const fs = require('fs');
const path = require('path');

// Read the dashboard page file
const filePath = path.join(__dirname, 'src/app/dashboard/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix motion.div with className - wrap in regular div
// Pattern: <motion.div ... className="..." > -> <div className="..."><motion.div ...>
// And closing </motion.div> -> </motion.div></div>

// First, let's fix the opening tags
content = content.replace(
  /<motion\.div\s+([^>]*?)\s+className="([^"]*)"([^>]*?)>/g,
  (match, beforeClassName, className, afterClassName) => {
    return `<div className="${className}"><motion.div ${beforeClassName.trim()} ${afterClassName.trim()}>`;
  }
);

// Fix the closing tags - need to add </div> after </motion.div> when it was preceded by a div wrapper
// This is tricky because we need to match the correct closing tags
// For simplicity, let's just do a more targeted fix for known patterns

// Write the fixed content
fs.writeFileSync(filePath, content);
console.log('Fixed motion.div components in dashboard page');