## Audio音频拖拽播放组件

要开发一个音频可播放可拖拽进度的组件

音频无法拖拽

需要设置HTTP Headers

```http
content-type: audio/mpeg
Content-Length: 12004029
Content-Range: bytes 0-12004028/12004029
Accept-Ranges: bytes
```









audio元素设置了src后，浏览器不会一次性下载整个音频文件，而是会进行流式下载（即按需下载）。这是浏览器的默认行为，用于优化网络带宽和用户体验。

如果你希望强制浏览器预加载更多的音频内容，可以使用 `preload` 属性。`preload` 属性可以设置为以下值：

- `none`：不预加载。
- `metadata`：仅预加载元数据（默认）。
- `auto`：尽可能多地预加载整个文件。

```vue
<audio
       @timeupdate="handleTimeUpdate"
       @play="handleAudioPlay"
       @pause="handleAudioPause"
       controls
       :src="audioSrc"
       preload="auto"
       ></audio>
```

即使你设置了 `preload="auto"`，浏览器仍然可能不会一次性下载整个音频文件，因为最终的下载策略由浏览器决定。