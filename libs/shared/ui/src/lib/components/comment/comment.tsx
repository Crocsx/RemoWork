import { Group, Avatar, Text } from '@mantine/core';

interface CommentProps {
  avatar: string;
  username: string;
  createDate: string;
  comment: string;
}

export function Comment({
  avatar,
  createDate,
  comment,
  username,
}: CommentProps) {
  return (
    <div>
      <Group>
        <Avatar src={avatar} alt={username} radius="xl" />
        <div>
          <Text size="sm">{username}</Text>
          <Text size="xs" c="dimmed">
            {createDate}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {comment}
      </Text>
    </div>
  );
}
