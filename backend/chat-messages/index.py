"""
Чат: получение и отправка сообщений в реальном времени.
GET  /?room_id=&since_id=  — загрузить сообщения комнаты (новее since_id)
POST /                     — отправить сообщение {room_id, sender_id, text}
POST /room                 — создать или получить комнату {user1_id, user2_id}
"""
import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")

    # ── POST /room — создать или получить комнату ──
    action = (event.get("queryStringParameters") or {}).get("action", "")
    if method == "POST" and (path.rstrip("/").endswith("/room") or action == "room"):
        body = json.loads(event.get("body") or "{}")
        u1 = body.get("user1_id", "")
        u2 = body.get("user2_id", "")
        if not u1 or not u2:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "user1_id and user2_id required"})}

        # Normalize order so (A,B) == (B,A)
        uid1, uid2 = sorted([u1, u2])

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO chat_rooms (user1_id, user2_id) VALUES (%s, %s) ON CONFLICT (user1_id, user2_id) DO UPDATE SET user1_id=EXCLUDED.user1_id RETURNING id, created_at",
            (uid1, uid2),
        )
        row = cur.fetchone()
        if not row:
            cur.execute("SELECT id, created_at FROM chat_rooms WHERE user1_id=%s AND user2_id=%s", (uid1, uid2))
            row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"room_id": row[0], "created_at": row[1].isoformat()}),
        }

    # ── POST / — отправить сообщение ──
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        room_id = body.get("room_id")
        sender_id = body.get("sender_id", "")
        text = (body.get("text") or "").strip()
        if not room_id or not sender_id or not text:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "room_id, sender_id and text required"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO chat_messages (room_id, sender_id, text) VALUES (%s, %s, %s) RETURNING id, created_at",
            (room_id, sender_id, text),
        )
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"id": row[0], "created_at": row[1].isoformat()}),
        }

    # ── GET / — получить сообщения ──
    if method == "GET":
        params = event.get("queryStringParameters") or {}
        room_id = params.get("room_id")
        since_id = params.get("since_id", "0") or "0"
        if not room_id:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "room_id required"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, sender_id, text, created_at FROM chat_messages WHERE room_id=%s AND id>%s ORDER BY created_at ASC LIMIT 100",
            (room_id, int(since_id)),
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        msgs = [{"id": r[0], "sender_id": r[1], "text": r[2], "created_at": r[3].isoformat()} for r in rows]
        return {
            "statusCode": 200,
            "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"messages": msgs}),
        }

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "method not allowed"})}