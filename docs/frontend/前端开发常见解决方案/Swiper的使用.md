## Swiper

### 在React中使用swiper

https://swiperjs.com/react#usage

```sh
yarn add swiper
```

在main.ts中手动注册，该注册是全局的

```tsx
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

export default () => {
  return (
    <Swiper>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      ...
    </Swiper>
  );
};
```



### 自动播放

autoplay