// Completely disable middleware to prevent routing issues
export default function middleware() {
  return;
}

export const config = {
  matcher: []
};