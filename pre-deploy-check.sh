#!/usr/bin/env bash

# Pre-Deployment Check Script for Softworks Project
# -------------------------------------------------
# Runs automated checks and reminds about manual review steps
# before deploying to Vercel.
#
# Assumes standard npm scripts: `lint`, `test`, `typecheck`, `build`, `preview`.
# Adjust commands if your package.json uses different script names.
#
# Usage:
# 1. Save this script as `pre-deploy-check.sh` in your project root.
# 2. Make it executable: `chmod +x pre-deploy-check.sh`
# 3. Run it: `./pre-deploy-check.sh`

# --- Configuration ---
# Set to true to exit immediately if any command fails
EXIT_ON_ERROR=true

# --- Colors for Output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- Helper Function ---
run_command() {
  local description="$1"
  local command="$2"
  echo -e "\n${BLUE}--- ${description} ---${NC}"
  echo "Running: ${command}"
  eval "${command}" # Using eval to handle complex commands if needed
  local status=$?
  if [ $status -ne 0 ]; then
    echo -e "${RED}!!! Error: '${description}' failed with status ${status}. !!!${NC}"
    if [ "$EXIT_ON_ERROR" = true ]; then
      exit $status
    fi
  else
    echo -e "${GREEN}>>> Success: '${description}' completed.${NC}"
  fi
  return $status
}

# --- Main Script ---
echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}🚀 Starting Pre-Deployment Checks 🚀${NC}"
echo -e "${BLUE}=====================================${NC}"

# 1. Check for required tools
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm could not be found. Please install Node.js and npm.${NC}"
    exit 1
fi

# --- Phase 1: Automated Checks & Cleanup ---

# Linting (e.g., ESLint) - Removed as no 'lint' script found
# run_command "Running Linter" "npm run lint"

# Formatting Check (e.g., Prettier --check) - Removed as no 'format:check' script found
# run_command "Checking Code Formatting" "npm run format:check" || run_command "Checking Code Formatting (Fallback)" "npx prettier --check ."

# Type Checking (TypeScript)
# Using the existing 'check' script with --noEmit flag
run_command "Running TypeScript Type Checker" "npm run check -- --noEmit"

# Dependency Audit (Security)
# Note: `npm audit` might fail for low/moderate issues depending on config.
# Adjust `npm audit --audit-level=high` if needed.
# Appending `|| true` to allow the script to continue even if vulnerabilities are found.
run_command "Checking for Vulnerable Dependencies" "npm audit || true"

# --- Phase 3: Automated Tests ---

# Unit/Integration Tests (e.g., Vitest, Jest) - Removed as no 'test' script found
# run_command "Running Automated Tests" "npm run test -- --watchAll=false"

# --- Phase 4 & 6: Build & Basic Checks ---

# Create Production Build
run_command "Creating Production Build" "npm run build"

# Display Build Size (Informational)
echo -e "\n${YELLOW}--- Build Output Size ---${NC}"
if [ -d "dist" ]; then
  du -sh dist
  echo -e "${YELLOW}Assets:${NC}"
  ls -lh dist/assets 2>/dev/null || echo "(No assets directory found in dist)"
elif [ -d "build" ]; then
   du -sh build
   echo -e "${YELLOW}Assets:${NC}"
   ls -lh build/*/assets 2>/dev/null || ls -lh build/assets 2>/dev/null || echo "(No assets directory found in build)"
else
    echo -e "${YELLOW}Could not find 'dist' or 'build' directory.${NC}"
fi


# --- Reminders for Manual Steps ---

echo -e "\n${YELLOW}======================================${NC}"
echo -e "${YELLOW}🖐️ MANUAL CHECKS REQUIRED 🖐️${NC}"
echo -e "${YELLOW}======================================${NC}"

echo -e "${YELLOW}1. Code Review:${NC}"
echo "   - Review key components for clarity, reusability (SRP)."
echo "   - Check props, state management, useEffect dependencies & cleanup."
echo "   - Ensure effective TypeScript usage (avoid 'any')."
echo "   - Verify consistent Tailwind usage (theme values, minimal custom CSS)."
echo "   - Check for hardcoded secrets/keys (use environment variables!)."
echo "   - Review error handling."

echo -e "\n${YELLOW}2. Functional & UI/UX Testing:${NC}"
echo "   - ${RED}Crucial:${NC} Test responsiveness thoroughly (DevTools mobile/tablet/desktop views)."
echo "   - Test across major browsers (Chrome, Firefox, Safari, Edge)."
echo "   - Test ALL interactive elements: buttons, forms, chat, modals, links."
echo "   - Verify dynamic behavior: animations, state changes, loading indicators."
echo "   - ${RED}Crucial:${NC} Test extensively in BOTH Light and Dark modes."
echo "   - Test edge cases (empty inputs, rapid clicks, long text)."

echo -e "\n${YELLOW}3. Performance Checks:${NC}"
echo "   - Use Browser DevTools (Network tab) to check initial load time & asset sizes."
echo "   - Use DevTools (Performance tab) or React DevTools Profiler for runtime checks."

echo -e "\n${YELLOW}4. Accessibility (a11y) Audit:${NC}"
echo "   - Test keyboard navigation (Tab, Shift+Tab, Enter, Space)."
echo "   - Check semantic HTML structure."
echo "   - Verify form labels, image alt text, aria-labels for icons."
echo "   - Check color contrast in both themes."

echo -e "\n${YELLOW}5. Deployment Preparation:${NC}"
echo "   - Verify Vercel environment variables are set correctly (esp. VITE_ prefixes)."
echo "   - Double-check '.gitignore' (node_modules, dist, .env*)."
echo "   - Ensure 'README.md' is up-to-date."

echo -e "\n${BLUE}--- Test Production Build Locally ---${NC}"
echo "After manual checks, run the production preview:"
echo -e "${GREEN}npm run preview${NC}"
echo "And test the preview build thoroughly in your browser."


echo -e "\n${GREEN}===================================================${NC}"
echo -e "${GREEN}✅ Automated Checks Completed Successfully! ✅${NC}"
echo -e "${YELLOW}🚨 Please perform the manual checks above before committing and deploying. 🚨${NC}"
echo -e "${GREEN}===================================================${NC}"

exit 0 