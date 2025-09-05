## useWebSocket

```ts
const { send, data } = useWebSocket(wsUrl.value, {
  onConnected(ws) {
    send(JSON.stringify(message))
  },
  onMessage(ws, event) {
    const receiveData = JSON.parse(data.value)
    if (receiveData?.payload?.output?.payload?.text) {
      optimizePrompt.value += receiveData.payload.output.payload.text
      versionSelectorRef.value?.debouncedSetSessionStorage(
        selectedVersion.value,
        optimizePrompt.value
      )
    }
    if (optimizePrompt.value.length > 0) {
      optimizingLoading.value = false
    }
  },
  onError(ws, event) {
    console.log('onError: ', event)
    optimizingLoading.value = false
  }
})
```

