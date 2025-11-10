import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import {
  SkeletonCard,
  SkeletonHeader,
  SkeletonTitle,
  SkeletonBadge,
  SkeletonBody,
  SkeletonDescription,
  SkeletonDescriptionShort,
  SkeletonFooter,
  SkeletonMeta,
  SkeletonCategory,
  SkeletonPriority,
  SkeletonDate,
  SkeletonAuthor,
  SkeletonAvatar,
  SkeletonAuthorText,
} from './styles';

const TicketCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <SkeletonCard>
        <SkeletonHeader>
          <SkeletonTitle />
          <SkeletonBadge />
        </SkeletonHeader>

        <SkeletonBody>
          <SkeletonDescription />
          <SkeletonDescriptionShort />
        </SkeletonBody>

        <SkeletonFooter>
          <SkeletonMeta>
            <SkeletonCategory />
            <SkeletonPriority />
          </SkeletonMeta>
          <SkeletonDate />
        </SkeletonFooter>

        <SkeletonAuthor>
          <SkeletonAvatar />
          <SkeletonAuthorText />
        </SkeletonAuthor>
      </SkeletonCard>
    </Animated.View>
  );
};

export default TicketCardSkeleton;

