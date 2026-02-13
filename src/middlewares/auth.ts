import { redis } from "@/config/redis";
import { verifyToken } from "@/utils/jwt";

export const authMiddleware = () => ({
  before: async (request: any) => {
    const auth = request.event.headers.authorization;
    if (!auth) throw new Error("Unauthorized");

    const token = auth.replace("Bearer ", "");

    const blacklisted = await redis.get(`blacklist_${token}`);
    if (blacklisted) throw new Error("Token expired");

    const decoded = verifyToken(token);
    request.event.user = decoded;
  }
});