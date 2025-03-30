## 关于DeepSeek模型输出内容

### R1模型

第一条message

```json
{
    "choices": [
        {
            "index": 0,
            "delta": {
                "content": "",
                "type": "text"
            }
        }
    ],
    "model": "",
    "prompt_token_usage": 24,
    "chunk_token_usage": 0,
    "created": 1743127731,
    "message_id": 5,
    "parent_id": 4,
    "remaining_thinking_quota": 50
}
```

后续message

```json
{
    "choices": [
        {
            "index": 0,
            "delta": {
                "content": "Okay",
                "type": "thinking"
            }
        }
    ],
    "model": "",
    "chunk_token_usage": 1,
    "created": 1743127731,
    "message_id": 5,
    "parent_id": 4
}
```



### V3模型

第一条message

```json
{
    "choices": [
        {
            "index": 0,
            "delta": {
                "content": "",
                "type": "text"
            }
        }
    ],
    "model": "",
    "prompt_token_usage": 33,
    "chunk_token_usage": 0,
    "created": 1743127690,
    "message_id": 2,
    "parent_id": 1
}
```

后续message

```json
{
    "choices": [
        {
            "index": 0,
            "delta": {
                "content": "1",
                "type": "text"
            }
        }
    ],
    "model": "",
    "chunk_token_usage": 1,
    "created": 1743127690,
    "message_id": 2,
    "parent_id": 1
}
```



## OpenAI

第一条

```json
"v1"
```

第二条message

```json
{
    "p": "",
    "o": "add",
    "v": {
        "message": {
            "id": "8fad8e98-0d8d-4610-9164-ec7cda5a4ffe",
            "author": {
                "role": "assistant",
                "name": null,
                "metadata": {}
            },
            "create_time": 1743130409.124806,
            "update_time": null,
            "content": {
                "content_type": "text",
                "parts": [
                    ""
                ]
            },
            "status": "in_progress",
            "end_turn": null,
            "weight": 1,
            "metadata": {
                "citations": [],
                "content_references": [],
                "message_type": "next",
                "model_slug": "gpt-4o",
                "default_model_slug": "auto",
                "parent_id": "53d49645-c38a-4897-9393-3ce648cc9665",
                "model_switcher_deny": []
            },
            "recipient": "all",
            "channel": null
        },
        "conversation_id": "67db7dda-1f48-800b-bafb-ba8ee33925dd",
        "error": null
    },
    "c": 0
}
```

第三条message

```json
{"p": "/message/content/parts/0", "o": "append", "v": "Open"}
```

