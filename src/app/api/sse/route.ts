import EventEmitter from "events";

export const dynamic = "force-dynamic";

const eventEmitter = new EventEmitter();

export async function GET() {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  eventEmitter.on("message", (message) => {
    writer.write(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`));
  });

  return new Response(responseStream.readable, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Content-Encoding": "none",
    },
  });
}

export async function POST(req: Request) {
  const { event } = await req.json();

  eventEmitter.emit("message", event);

  return new Response("event sent");
}
