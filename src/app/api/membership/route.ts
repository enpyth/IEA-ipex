import { NextRequest, NextResponse } from 'next/server'
import { getMembershipByEmail, createMembership } from '@/db/membership'

interface MembershipFormData {
  fullName: string
  email: string
  membershipType: 'visitor' | 'institutional' | 'corporate' | 'student'
  details: {
    country: string
    affiliation: string
    field: string
    notes: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MembershipFormData = await request.json()
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.membershipType) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, and membershipType are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate membership type
    const validMembershipTypes = ['visitor', 'institutional', 'corporate', 'student']
    if (!validMembershipTypes.includes(body.membershipType)) {
      return NextResponse.json(
        { error: 'Invalid membership type' },
        { status: 400 }
      )
    }

    // Validate details object
    if (!body.details || !body.details.country || !body.details.affiliation || !body.details.field) {
      return NextResponse.json(
        { error: 'Missing required details: country, affiliation, and field are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingMembership = await getMembershipByEmail(body.email)
    
    if (existingMembership) {
      return NextResponse.json(
        { error: 'A membership with this email address already exists' },
        { status: 409 }
      )
    }

    // Create new membership record
    const newMembership = await createMembership(body)

    if (!newMembership) {
      return NextResponse.json(
        { error: 'Failed to create membership record' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      {
        message: 'Membership registration submitted successfully',
        membership: {
          id: newMembership.id,
          fullName: newMembership.full_name,
          email: newMembership.email,
          membershipType: newMembership.membership_type,
          verified: newMembership.verified,
          registeredAt: newMembership.registered_at
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Unexpected error in membership API:', error)
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
