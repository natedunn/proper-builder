import type { QueueItemType } from '~/lib/types';

type QueueItemProps = {
  item: QueueItemType;
};

export const QueueItem = (props: QueueItemProps) => {
  // const originImage = () => {
  //   switch (props.item.origin) {
  //     case 'npm':
  //       return '/img/npm.svg';
  //     case 'yarn':
  //       return '/img/yarn.svg';
  //     case 'pnpm':
  //       return '/img/pnpm.svg';
  //     default:
  //       return '/img/npm.svg';
  //   }
  // };
  return (
    <div class='flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-800 p-4'>
      <div>{props.item.name}</div>
      <div>{props.item.version}</div>
      <div>{props.item.origin}</div>
    </div>
  );
};
