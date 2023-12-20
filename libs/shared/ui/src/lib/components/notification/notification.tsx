import {
  notifications as mantineNotification,
  NotificationData,
} from '@mantine/notifications';
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconInfoCircleFilled,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type NotificationCommonProps = {
  title?: React.ReactNode;
  message?: React.ReactNode;
};

const Title = ({
  type,
  title,
}: {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: React.ReactNode;
}) => {
  const t = useTranslations('shared');

  if (title === null) return null;

  return title ? title : t('alert.title', { type });
};

const Message = ({ message }: { message?: React.ReactNode }) => {
  if (message === null) return null;

  return message;
};

const getInfoNotificationProps = ({
  title,
  message,
}: NotificationCommonProps) => ({
  color: 'blue',
  icon: <IconInfoCircleFilled />,
  title: <Title type="info" title={title} />,
  message: <Message message={message} />,
});

const getSuccessNotificationProps = ({
  title,
  message,
}: NotificationCommonProps) => ({
  color: 'green',
  icon: <IconCircleCheckFilled />,
  title: <Title type="success" title={title} />,
  message: <Message message={message} />,
});

const getWarningNotificationProps = ({
  title,
  message,
}: NotificationCommonProps) => ({
  color: 'yellow',
  icon: <IconAlertCircleFilled />,
  title: <Title type="warning" title={title} />,
  message: <Message message={message} />,
});

const getErrorNotificationProps = ({
  title,
  message,
}: NotificationCommonProps) => ({
  color: 'red',
  icon: <IconCircleXFilled />,
  title: <Title type="error" title={title} />,
  message: <Message message={message} />,
});

const mantineNotificationWrapper = (options: NotificationData) => {
  mantineNotification.show({
    ...options,
  });
};

mantineNotificationWrapper.info = (options?: NotificationData) => {
  const { title, message, ...others } = options || {};

  mantineNotification.show({
    ...getInfoNotificationProps({ title, message }),
    ...others,
  });
};

mantineNotificationWrapper.success = (options?: NotificationData) => {
  const { title, message, ...others } = options || {};

  mantineNotification.show({
    ...getSuccessNotificationProps({ title, message }),
    ...others,
  });
};

mantineNotificationWrapper.warning = (options?: NotificationData) => {
  const { title, message, ...others } = options || {};

  mantineNotification.show({
    ...getWarningNotificationProps({ title, message }),
    ...others,
  });
};

mantineNotificationWrapper.error = (options?: NotificationData) => {
  const { title, message, ...others } = options || {};

  mantineNotification.show({
    ...getErrorNotificationProps({ title, message }),
    ...others,
  });
};

const notifications = { ...mantineNotificationWrapper, ...mantineNotification };

export { notifications };
