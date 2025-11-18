import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates the admin password
 * @param password - The password to validate
 * @returns boolean indicating if password is valid
 */
function validatePassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn('[Admin API] ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  return password === adminPassword;
}

/**
 * POST /api/admin/validate-password
 * Validates admin password without requiring file upload
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = validatePassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Validate Password API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
