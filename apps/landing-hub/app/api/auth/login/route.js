import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock in-memory user store
const mockUsers = [
  { id: '1', username: 'admin', passwordHash: bcrypt.hashSync('admin123', 10), role: 'ADMIN', isActive: true },
  { id: '2', username: 'fo_user', passwordHash: bcrypt.hashSync('fo123', 10), role: 'FO', isActive: true },
];

const JWT_SECRET = 'mock_secret_key'; // default secret

export async function POST(request) {
  const { username, password } = await request.json();
  const user = mockUsers.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid || !user.isActive) {
    return NextResponse.json({ error: 'Invalid credentials or inactive user' }, { status: 401 });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  return NextResponse.json({ token, role: user.role });
}
