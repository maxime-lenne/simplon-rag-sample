import httpx

from app.config import API_TIMEOUT_SECONDS


def _timeout() -> httpx.Timeout:
    """Generous read timeout (chat endpoint runs the LLM agent graph), short
    connect/write timeouts because those should be fast on a local network."""
    return httpx.Timeout(
        connect=10.0,
        read=API_TIMEOUT_SECONDS,
        write=30.0,
        pool=30.0,
    )


def create_conversation(base_url: str) -> str:
    """Create a new conversation and return its UUID.

    Raises:
        httpx.HTTPStatusError: if the API returns a non-2xx response.
        httpx.ConnectError: if the API is unreachable.
        httpx.ReadTimeout: if the API doesn't respond within the configured read timeout.
    """
    with httpx.Client(timeout=_timeout()) as client:
        response = client.post(f"{base_url}/api/v1/conversations")
        response.raise_for_status()
        return response.json()["conversation_id"]


def send_message(base_url: str, conversation_id: str, content: str) -> dict:
    """Send a user message and return the assistant response.

    Returns:
        dict with keys: content (str), sources (list[str]).

    Raises:
        httpx.HTTPStatusError: if the API returns a non-2xx response.
        httpx.ConnectError: if the API is unreachable.
        httpx.ReadTimeout: if the API doesn't respond within the configured read timeout.
    """
    with httpx.Client(timeout=_timeout()) as client:
        response = client.post(
            f"{base_url}/api/v1/conversations/{conversation_id}/messages",
            json={"content": content},
        )
        response.raise_for_status()
        data = response.json()
        return {
            "content": data.get("content", ""),
            "sources": data.get("sources", []),
        }
