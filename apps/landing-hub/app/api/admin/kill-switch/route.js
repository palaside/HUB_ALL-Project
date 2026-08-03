import { NextResponse } from 'next/server';

// Mock in-memory users store (same as login route for consistency)
let mockUsers = [
  { id: '1', username: 'admin', role: 'ADMIN', isActive: true },
  { id: '2', username: 'fo_user', role: 'FO', isActive: true },
  { id: '3', username: 'fdc_user', role: 'FDC', isActive: true },
];

export async function POST(request) {
  const { userId } = await request.json();
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  user.isActive = false;
  // In a real system, you would broadcast via WebSocket; here we just respond.
  return NextResponse.json({ success: true, message: `User ${userId} deactivated` });
}

export async function GET() {
  // Return current user list (for debugging)
  return NextResponse.json({ users: mockUsers });
}
