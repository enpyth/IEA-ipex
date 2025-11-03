'use client';

import { Membership } from '@/db/membership';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Person,
  Email,
  Business,
  LocationOn,
  School,
  Notes,
  CalendarToday,
  Verified,
  Pending
} from '@mui/icons-material';

interface MembershipDetailsProps {
  membership: Membership;
}

export default function MembershipDetails({ membership }: MembershipDetailsProps) {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(`/api/membership/${membership.id}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: true })
      });

      if (response.ok) {
        toast.success('Membership verified successfully!');
        router.refresh(); // Refresh the page to show updated data
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to verify membership');
      }
    } catch (error) {
      console.error('Error verifying membership:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsVerifying(false);
      setVerifyDialogOpen(false);
    }
  };

  const handleReject = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(`/api/membership/${membership.id}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: false })
      });

      if (response.ok) {
        toast.success('Membership rejected');
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to reject membership');
      }
    } catch (error) {
      console.error('Error rejecting membership:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsVerifying(false);
      setRejectDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'primary';
      case 'institutional': return 'secondary';
      case 'corporate': return 'success';
      case 'visitor': return 'default';
      default: return 'default';
    }
  };

  const getMembershipTypeLabel = (type: string) => {
    switch (type) {
      case 'student': return 'Student';
      case 'institutional': return 'Institutional';
      case 'corporate': return 'Corporate';
      case 'visitor': return 'Visitor';
      default: return type;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Status Alert */}
      {!membership.verified && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          This membership application is pending verification.
        </Alert>
      )}

      {/* Main Information Card */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Person color="primary" />
              <Typography variant="h5" component="h2">
                {membership.full_name}
              </Typography>
              <Chip
                icon={membership.verified ? <Verified /> : <Pending />}
                label={membership.verified ? 'Verified' : 'Pending'}
                color={membership.verified ? 'success' : 'warning'}
                variant="outlined"
              />
            </Box>
          }
          subheader={`Membership ID: ${membership.id}`}
        />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Basic Information */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="action" />
                <Typography variant="body2" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="body1">{membership.email}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business color="action" />
                <Typography variant="body2" color="text.secondary">
                  Membership Type:
                </Typography>
                <Chip
                  label={getMembershipTypeLabel(membership.membership_type)}
                  color={getMembershipTypeColor(membership.membership_type) as any}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="action" />
                <Typography variant="body2" color="text.secondary">
                  Registered:
                </Typography>
                <Typography variant="body1">{formatDate(membership.registered_at)}</Typography>
              </Box>

              {membership.updated_at !== membership.registered_at && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Last Updated:
                  </Typography>
                  <Typography variant="body1">{formatDate(membership.updated_at)}</Typography>
                </Box>
              )}
            </Box>

            {/* Additional Details */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="action" />
                <Typography variant="body2" color="text.secondary">
                  Country:
                </Typography>
                <Typography variant="body1">{membership.details.country}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business color="action" />
                <Typography variant="body2" color="text.secondary">
                  Affiliation:
                </Typography>
                <Typography variant="body1">{membership.details.affiliation}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <School color="action" />
                <Typography variant="body2" color="text.secondary">
                  Field:
                </Typography>
                <Typography variant="body1">{membership.details.field}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Notes Section */}
          {membership.details.notes && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Notes color="action" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Additional Notes:
                  </Typography>
                  <Typography variant="body1">{membership.details.notes}</Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!membership.verified && (
        <Card>
          <CardHeader title="Verification Actions" />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
                onClick={() => setVerifyDialogOpen(true)}
                disabled={isVerifying}
              >
                Approve Membership
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={() => setRejectDialogOpen(true)}
                disabled={isVerifying}
              >
                Reject Application
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Verification Confirmation Dialog */}
      <Dialog open={verifyDialogOpen} onClose={() => setVerifyDialogOpen(false)}>
        <DialogTitle>Approve Membership</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this membership application? This will verify the member and grant them access to member benefits.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerifyDialogOpen(false)} disabled={isVerifying}>
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            color="success"
            variant="contained"
            disabled={isVerifying}
            startIcon={isVerifying ? <CircularProgress size={20} /> : <CheckCircle />}
          >
            {isVerifying ? 'Approving...' : 'Approve'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Confirmation Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
        <DialogTitle>Reject Membership Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject this membership application? This action can be reversed later if needed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)} disabled={isVerifying}>
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            color="error"
            variant="contained"
            disabled={isVerifying}
            startIcon={isVerifying ? <CircularProgress size={20} /> : <Cancel />}
          >
            {isVerifying ? 'Rejecting...' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
