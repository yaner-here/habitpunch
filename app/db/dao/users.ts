import { eq } from 'drizzle-orm';
import type { DbClient } from '~/db/db';
import { users } from '~/db/schema';

type NewUser = typeof users.$inferInsert;

/**
 * 创建一个新用户
 * @param db - Drizzle 数据库实例
 * @param newUser - 新用户数据
 */
export async function createUser(db: DbClient, newUser: NewUser) {
    return await db.insert(users).values(newUser).returning();
}

/**
 * 根据 ID 获取用户信息
 * @param db - Drizzle 数据库实例
 * @param id - 用户 ID
 */
export async function getUserById(db: DbClient, id: number) {
    return await db.select().from(users).where(eq(users.id, id)).get();
}

/**
 * 根据用户名获取用户信息
 * @param db - Drizzle 数据库实例
 * @param username - 用户名
 */
export async function getUserByUsername(db: DbClient, username: string) {
    return await db.select().from(users).where(eq(users.username, username)).get();
}

/**
 * 更新用户信息
 * @param db - Drizzle 数据库实例
 * @param id - 用户 ID
 * @param updatedUser - 需要更新的用户数据
 */
export async function updateUser(db: DbClient, id: number, updatedUser: Partial<NewUser>) {
    return await db.update(users).set(updatedUser).where(eq(users.id, id)).returning();
}

/**
 * 删除用户
 * @param db - Drizzle 数据库实例
 * @param id - 用户 ID
 */
export async function deleteUser(db: DbClient, id: number) {
    return await db.delete(users).where(eq(users.id, id)).returning();
}
