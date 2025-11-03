import { NextRequest, NextResponse } from 'next/server'
import { getMembershipById, updateMembershipVerification } from '@/db/membership'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Validate membership ID
    const membershipId = parseInt(id, 10)
    if (isNaN(membershipId)) {
      return NextResponse.json(
        { error: 'Invalid membership ID' },
        { status: 400 }
      )
    }

    // Validate request body
    if (typeof body.verified !== 'boolean') {
      return NextResponse.json(
        { error: 'verified field must be a boolean value' },
        { status: 400 }
      )
    }

    // Check if membership exists
    const existingMembership = await getMembershipById(membershipId)
    if (!existingMembership) {
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      )
    }

    // Update membership verification status
    const updatedMembership = await updateMembershipVerification(membershipId, body.verified)

    if (!updatedMembership) {
      return NextResponse.json(
        { error: 'Failed to update membership verification status' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      {
        message: `Membership ${body.verified ? 'verified' : 'rejected'} successfully`,
        membership: {
          id: updatedMembership.id,
          fullName: updatedMembership.full_name,
          email: updatedMembership.email,
          membershipType: updatedMembership.membership_type,
          verified: updatedMembership.verified,
          updatedAt: updatedMembership.updated_at
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unexpected error in membership verification API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
