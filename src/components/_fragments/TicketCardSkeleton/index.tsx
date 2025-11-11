import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import {
  SkeletonAuthor,
  SkeletonAuthorText,
  SkeletonAvatar,
  SkeletonBadge,
  SkeletonBody,
  SkeletonCard,
  SkeletonCategory,
  SkeletonDate,
  SkeletonDescription,
  SkeletonDescriptionShort,
  SkeletonFooter,
  SkeletonHeader,
  SkeletonMeta,
  SkeletonPriority,
  SkeletonTitle,
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
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    // Exceção: Animated.View requer estilo inline para animações dinâmicas
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
