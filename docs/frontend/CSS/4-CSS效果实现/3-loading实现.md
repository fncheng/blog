让一个图标作为loding转起来

```html
<SvgIcon class="loading-spinner" name="loading" width="16" />
```

```css
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  animation: loading-rotate 2s linear infinite;
}
```