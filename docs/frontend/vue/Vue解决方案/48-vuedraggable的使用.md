## vuedraggable使用

禁用拖拽

disabled属性

```vue
<Draggable
          v-model="internalSelectedApps"
          class="selected-apps-list"
          item-key="agentId"
          :animation="200"
          :move="() => draggable"
          ghost-class="ghost"
          :disabled="!props.draggable"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <RecommendAppItemRect
              :agent-item="element"
              mode="delete"
              @delete-recommend-agent="handleRemoveApp"
            />
          </template>
        </Draggable>
```

