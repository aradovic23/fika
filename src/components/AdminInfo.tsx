import { Avatar, Badge, Box, Button, Stack, Text } from '@chakra-ui/react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

type SessionData = Session | null;

const AdminInfo = ({ sessionData }: { sessionData: SessionData }) => {
  if (!sessionData) return null;

  return (
    <Stack align="center" shadow="sm" rounded="xl" p="6">
      <Avatar name={sessionData.user?.name ?? 'User'} src={sessionData.user?.image ?? ''} />
      <Text>
        Hello{' '}
        <Box as="span" fontWeight="bold">
          {sessionData.user?.name}
        </Box>{' '}
      </Text>
      <Text>
        You are logged in with role <Badge>{sessionData.user?.role}</Badge>
      </Text>
      <Button as={Box} onClick={() => signOut()} variant="outline">
        Sign out
      </Button>
    </Stack>
  );
};

export default AdminInfo;
