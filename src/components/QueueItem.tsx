import type { QueueItemType } from '~/lib/types';

type QueueItemProps = {
  item: QueueItemType;
};

export const QueueItem = (props: QueueItemProps) => {
  return (
    <div class='flex items-center justify-between gap-4 rounded-xl border border-zinc-700 bg-zinc-800 p-4'>
      <div class='font-bold'>{props.item.name}</div>
      <div class='ml-auto'>{props.item.version}</div>
      <div class='opacity-25'>|</div>
      <div>{props.item.origin}</div>
    </div>
  );
};
