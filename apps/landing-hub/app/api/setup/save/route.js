import { NextResponse } from 'next/server';

// In-memory store for FDC setup (mock)
let fdcSetup = {};

export async function POST(request) {
  const data = await request.json();
  // Expect fields: fdc_e_grid, fdc_n_grid, sim_dir, ammo_type
  fdcSetup = { ...fdcSetup, ...data };
  return NextResponse.json({ success: true, fdcSetup });
}

export async function GET() {
  return NextResponse.json({ fdcSetup });
}
