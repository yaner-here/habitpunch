import { eq } from 'drizzle-orm';
import type { DbClient } from '~/db/db'; // 从新的 db.ts 导入类型
import { logs } from '~/db/schema';

type NewLog = typeof logs.$inferInsert;

/**
 * 创建一条新的日志记录
 * @param db - Drizzle 数据库实例
 * @param newLog - 新日志的数据
 */
export async function createLog(db: DbClient, newLog: NewLog) {
    return await db.insert(logs).values(newLog).returning();
}

/**
 * 获取某个用户的所有日志记录
 * @param db - Drizzle 数据库实例
 * @param userId - 用户 ID
 */
export async function getLogsByUserId(db: DbClient, userId: number) {
    return await db.select().from(logs).where(eq(logs.userId, userId)).all();
}
