'use client';
import { useCallback, useEffect, useState } from 'react';

import { LoadingOverlay, Textarea, Text, Button, Flex } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useInViewport } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import {
  PlaceComment,
  PlaceCommentAddRequest,
  PlaceCommentsGetRequest,
} from '~workspace/lib/feature/place';
import { useApiRequestLazy, FetchInstance } from '~workspace/lib/shared/utils';

export const PlaceComments = ({ placeId }: { placeId: string }) => {
  const t = useTranslations();
  const { ref, inViewport } = useInViewport();
  const [comments, setComments] = useState<PlaceComment[]>();
  const { getInputProps, reset, ...form } = useForm<PlaceCommentAddRequest>();

  const { loading, execute: loadComments } = useApiRequestLazy({
    onSuccess: useCallback((response: PlaceComment[]) => {
      setComments(response);
    }, []),
    operation: useCallback(
      (filters: PlaceCommentsGetRequest) => {
        return FetchInstance.get<PlaceComment[]>(
          `/places/${placeId}/comments`,
          filters
        );
      },
      [placeId]
    ),
  });
  console.log(FetchInstance.headers);
  const { loading: sending, execute } = useApiRequestLazy({
    operation: useCallback(
      async (values: PlaceCommentAddRequest) =>
        FetchInstance.put(`/places/${placeId}/comments`, values),
      [placeId]
    ),
  });

  useEffect(() => {
    if (inViewport) {
      loadComments({});
    }
  }, [inViewport, loadComments]);

  const submitHandler = useCallback(
    async (formData: PlaceCommentAddRequest) => {
      await execute(formData);
      reset();
    },
    [execute, reset]
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
