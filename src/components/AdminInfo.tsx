import { Avatar, Badge, Box, Button, Text, VStack } from '@chakra-ui/react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

type SessionData = Session | null;

const AdminInfo = ({ sessionData }: { sessionData: SessionData }) => {
  if (!sessionData) return null;

  return (
    <VStack align="center" p="6">
      <Avatar size="lg" name={sessionData.user?.name ?? 'User'} src={sessionData.user?.image ?? ''} />
      <Text>
        Hello,{' '}
        <Text as="span" fontWeight="bold">
          {sessionData.user?.name}
        </Text>
      </Text>
      <Text>
        You are logged in with role <Badge>{sessionData.user?.role}</Badge>
      </Text>
      <Button textTransform="uppercase" as={Box} onClick={() => signOut()} variant="outline" size="sm">
        Sign out
      </Button>
    </VStack>
  );
};

export default AdminInfo;
