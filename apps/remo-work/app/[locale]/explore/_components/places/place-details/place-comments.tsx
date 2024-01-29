'use client';
import { useCallback, useEffect } from 'react';

import { LoadingOverlay, Textarea, Text, Button, Flex } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useInViewport } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { PlaceCommentAddRequest } from '~workspace/lib/feature/place';

import { useAddComment, useGetComments } from './fetcher';

export const PlaceComments = ({ placeId }: { placeId: string }) => {
  const t = useTranslations();
  const { ref, inViewport } = useInViewport();
  const { getInputProps, reset, ...form } = useForm<PlaceCommentAddRequest>();

  const { comments, loading, getComments } = useGetComments({ placeId });
  const { loading: sending, sendComment } = useAddComment({ placeId });

  useEffect(() => {
    if (inViewport) {
      getComments();
    }
  }, [inViewport, getComments, placeId]);

  const submitHandler = useCallback(
    async (formData: PlaceCommentAddRequest) => {
      await sendComment(formData);
      reset();
    },
    [reset, sendComment]
  );

  return (
    <div ref={ref}>
      <LoadingOverlay visible={loading} />
      <Form
        onSubmit={submitHandler}
        form={{ ...form, reset, getInputProps }}
        noValidate
      >
        <Flex direction="column" gap="md">
          <Textarea
            autosize
            minRows={2}
            {...getInputProps('comment')}
          ></Textarea>
          <Button
            type="submit"
            loading={sending}
            leftSection={<IconSend />}
            ml="auto"
          >
            <Text>{t('shared.button.send')}</Text>
          </Button>
        </Flex>
      </Form>
      {comments?.map((c) => c.comment)}
    </div>
  );
};