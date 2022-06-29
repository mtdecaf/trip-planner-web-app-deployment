import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middleware = async (request, event) => {
    new Response(request.ua.os.name);
}

export default middleware;