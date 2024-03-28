import React, { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button, TopicsContext } from '../..';

const navigateBack = (router, pathname) => {
  const path = pathname.split('/');
  path.pop();
  router.push(path.join('/'));
};

export const RecommendationsContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentTopic } = useContext(TopicsContext);

  return (
    <div className="flex flex-col w-full">
      {!!currentTopic?.previousParents?.length && (
        <Button
          type="secondary"
          classes="max-w-[50%]"
          onClick={() => navigateBack(router, pathname)}
        >
          Go back
        </Button>
      )}
    </div>
  );
};
